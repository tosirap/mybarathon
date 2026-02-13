import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Configure Cloudinary
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
  });

  // Parse le multipart/form-data
  const form = formidable({ multiples: false });

  return new Promise((resolve, reject) => {
    form.parse(event.node.req, async (err, fields, files) => {
      if (err) {
        reject(createError({
          statusCode: 400,
          message: 'Erreur lors du parsing du formulaire',
        }));
        return;
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      const folder = Array.isArray(fields.folder) ? fields.folder[0] : fields.folder || 'mybarathon/bars';

      try {
        // Upload vers Cloudinary
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: folder,
          transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        });

        // Supprimer le fichier temporaire
        fs.unlinkSync(file.filepath);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        });
      } catch (error) {
        console.error('Erreur Cloudinary:', error);
        reject(createError({
          statusCode: 500,
          message: 'Erreur lors de l\'upload vers Cloudinary',
        }));
      }
    });
  });
});
