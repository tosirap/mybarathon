<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 gap-6">
      <!-- Nom du bar -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Nom du bar *
        </label>
        <input
          v-model="barData.name"
          type="text"
          required
          placeholder="Le Créchoir"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <!-- Lien Google Maps -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Lien Google Maps (iframe embed) *
        </label>
        <textarea
          v-model="barData.google_maps_link"
          rows="3"
          required
          placeholder="https://www.google.com/maps/embed?pb=..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
        ></textarea>
      </div>

      <!-- Upload d'image -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Image du bar *
        </label>
        <ImageUploader
          folder="mybarathon/bars"
          @uploaded="handleImageUploaded"
        />
      </div>
    </div>

    <!-- Message d'erreur -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
      <p class="text-sm text-red-800">{{ error }}</p>
    </div>

    <!-- Boutons -->
    <div class="flex items-center justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
      >
        Annuler
      </button>
      <button
        type="submit"
        :disabled="loading || !barData.image_path"
        class="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
      >
        {{ loading ? "Création..." : "Créer le bar" }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import ImageUploader from "./ImageUploader.vue";

const emit = defineEmits(["bar-created", "cancel"]);

const supabase = useSupabaseClient();

const barData = ref({
  name: "",
  google_maps_link: "",
  image_path: "",
});

const loading = ref(false);
const error = ref(null);

const handleImageUploaded = (url) => {
  barData.value.image_path = url;
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;

  try {
    const { data, error: insertError } = await supabase
      .from("bars")
      .insert([barData.value])
      .select()
      .single();

    if (insertError) throw insertError;

    emit("bar-created", data.id);
  } catch (err) {
    console.error("Erreur lors de la création:", err);
    error.value = err.message || "Erreur lors de la création du bar";
  } finally {
    loading.value = false;
  }
};
</script>
