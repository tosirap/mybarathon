<template>
  <div class="space-y-4">
    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
      <div
        @dragover.prevent
        @drop.prevent="handleDrop"
        class="space-y-3"
      >
        <div class="flex justify-center">
          <div class="w-12 h-12 text-gray-400">📷</div>
        </div>
        
        <div>
          <label
            for="file-upload"
            class="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            :class="{ 'opacity-50 cursor-not-allowed': uploading }"
          >
            <span>{{ uploading ? '⏳ Upload...' : '⬆️ Choisir une image' }}</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            :disabled="uploading"
            class="hidden"
          />
        </div>
        
        <p class="text-sm text-gray-500">
          ou glisser-déposer une image ici
        </p>
        <p class="text-xs text-gray-400">
          PNG, JPG, WEBP jusqu'à 1MB
        </p>
      </div>
    </div>

    <!-- Prévisualisation -->
    <div v-if="previewUrl" class="relative">
      <img
        :src="previewUrl"
        alt="Preview"
        class="w-full h-48 object-cover rounded-lg border border-gray-200"
      />
      <button
        v-if="!uploading"
        @click="removeImage"
        type="button"
        class="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
      >
        ✕
      </button>
    </div>

    <!-- Progress -->
    <div v-if="uploading" class="space-y-2">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600">Upload en cours...</span>
        <span class="text-gray-600">{{ uploadProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-orange-500 h-2 rounded-full transition-all duration-300"
          :style="{ width: uploadProgress + '%' }"
        ></div>
      </div>
    </div>

    <!-- Erreur -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
      <p class="text-sm text-red-800">❌ {{ error }}</p>
    </div>

    <!-- Succès -->
    <div v-if="uploadedUrl && !uploading" class="bg-green-50 border border-green-200 rounded-lg p-3">
      <p class="text-sm text-green-800 font-medium">✓ Image uploadée avec succès !</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  folder: {
    type: String,
    default: 'mybarathon/bars'
  }
});

const emit = defineEmits(['uploaded']);

const previewUrl = ref(null);
const uploadedUrl = ref(null);
const uploading = ref(false);
const uploadProgress = ref(0);
const error = ref(null);

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    processFile(file);
  }
};

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    processFile(file);
  }
};

const processFile = async (file) => {
  // Reset états
  error.value = null;
  uploadedUrl.value = null;

  // Validation type
  if (!file.type.startsWith('image/')) {
    error.value = 'Le fichier doit être une image (PNG, JPG, WEBP)';
    return;
  }

  if (file.size > 1 * 1024 * 1024) {
    error.value = 'L\'image ne doit pas dépasser 1MB';
    return;
  }

  // Prévisualisation locale
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);

  // Upload vers Cloudinary
  await uploadToCloudinary(file);
};

const uploadToCloudinary = async (file) => {
  uploading.value = true;
  uploadProgress.value = 0;
  error.value = null;

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mybarathon_unsigned');
    formData.append('folder', props.folder);

    const response = await fetch('https://api.cloudinary.com/v1_1/dthjuhj2g/image/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur Cloudinary:', errorData);
      throw new Error(errorData.error?.message || 'Erreur upload');
    }

    const data = await response.json();
    
    uploadedUrl.value = data.secure_url;
    uploadProgress.value = 100;
    
    console.log('✅ Image uploadée:', data.secure_url);
    
    // Émettre l'URL vers le parent
    emit('uploaded', data.secure_url);

  } catch (err) {
    console.error('❌ Erreur upload:', err);
    error.value = err.message || 'Erreur lors de l\'upload de l\'image';
    previewUrl.value = null;
  } finally {
    uploading.value = false;
  }
};

const removeImage = () => {
  previewUrl.value = null;
  uploadedUrl.value = null;
  uploadProgress.value = 0;
  error.value = null;
  emit('uploaded', null);
};
</script>
