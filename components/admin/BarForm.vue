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
          v-model="rawMapsInput"
          @input="extractMapsUrl"
          rows="3"
          required
          placeholder="Collez l'iframe complet ou juste l'URL https://www.google.com/maps/embed?pb=..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
        ></textarea>
        
        <!-- Aperçu de l'URL extraite -->
        <p v-if="barData.google_maps_link" class="mt-2 text-xs text-green-600">
          ✓ URL extraite : {{ barData.google_maps_link.substring(0, 60) }}...
        </p>
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
        :disabled="loading || !barData.image_path || !barData.google_maps_link"
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

const rawMapsInput = ref("");
const loading = ref(false);
const error = ref(null);

// Fonction pour extraire l'URL depuis l'iframe ou le texte brut
const extractMapsUrl = () => {
  const input = rawMapsInput.value.trim();
  
  if (!input) {
    barData.value.google_maps_link = "";
    return;
  }

  // Cas 1 : L'utilisateur a collé un iframe complet
  // Exemple : <iframe src="https://www.google.com/maps/embed?pb=..." ...></iframe>
  const iframeMatch = input.match(/src=["']([^"']+)["']/);
  if (iframeMatch && iframeMatch[1]) {
    barData.value.google_maps_link = iframeMatch[1];
    console.log("✅ URL extraite depuis iframe:", iframeMatch[1]);
    return;
  }

  // Cas 2 : L'utilisateur a collé directement l'URL
  // Exemple : https://www.google.com/maps/embed?pb=...
  if (input.startsWith("https://www.google.com/maps/embed")) {
    barData.value.google_maps_link = input;
    console.log("✅ URL détectée directement:", input);
    return;
  }

  // Cas 3 : Recherche dans du texte quelconque
  const urlMatch = input.match(/https:\/\/www\.google\.com\/maps\/embed[^\s"'<>]*/);
  if (urlMatch && urlMatch[0]) {
    barData.value.google_maps_link = urlMatch[0];
    console.log("✅ URL extraite depuis texte:", urlMatch[0]);
    return;
  }

  // Si aucun format reconnu
  barData.value.google_maps_link = "";
  console.warn("⚠️ Format non reconnu");
};

const handleImageUploaded = (url) => {
  barData.value.image_path = url;
  console.log("✅ Image uploadée:", url);
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Validation finale
    if (!barData.value.google_maps_link) {
      throw new Error("Le lien Google Maps n'a pas pu être extrait. Vérifiez le format.");
    }

    const { data, error: insertError } = await supabase
      .from("bars")
      .insert([barData.value])
      .select()
      .single();

    if (insertError) throw insertError;

    console.log("✅ Bar créé:", data);
    emit("bar-created", data.id);
  } catch (err) {
    console.error("❌ Erreur lors de la création:", err);
    error.value = err.message || "Erreur lors de la création du bar";
  } finally {
    loading.value = false;
  }
};
</script>
