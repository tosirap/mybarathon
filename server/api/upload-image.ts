import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dthjuhj2g',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default defineEventHandler(async (event) => {
  // Vérifier que c'est bien une requête POST
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
    });
  }
  
  try {
    // Lire le fichier depuis le FormData
    const formData = await readFormData(event);
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'mybarathon/bars';

    console.log('📁 Folder:', folder);
    console.log('📄 File:', file ? `${file.name} (${file.size} bytes)` : 'null');

    if (!file) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Aucun fichier fourni',
      });
    }

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Le fichier doit être une image',
      });
    }

    // Vérifier la taille (4.5MB max pour Vercel)
    if (file.size > 4.5 * 1024 * 1024) {
      throw createError({
        statusCode: 400,
        statusMessage: 'L\'image ne doit pas dépasser 4.5MB',
      });
    }

    // Convertir le File en Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload vers Cloudinary via un stream
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'image',
          transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary error:', error);
            reject(error);
          } else {
            console.log('✅ Cloudinary success:', result?.secure_url);
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

    // Retourner l'URL
    return {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (error: any) {
    console.error('❌ Erreur complète:', error);
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Erreur lors de l\'upload',
    });
  }
});
