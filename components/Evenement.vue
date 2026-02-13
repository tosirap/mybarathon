<template>
  <div class="container mx-auto py-6">
    <!-- Loading state -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-lg">Chargement de l'événement...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <!-- Contenu principal -->
    <div v-else-if="event">
      <!-- Intro -->
      <div class="my-8 text-center">
        <p class="text-lg font-medium">
          Prochain barathon : {{ formatDate(event.event_date) }}
        </p>
        <p class="text-md">
          Départs : <span class="font-bold">{{ startingBarsNames }}</span>
        </p>

        <!-- Bouton pour ouvrir la modal -->
        <button
          @click="showMapModal = true"
          class="mt-4 inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors shadow-md"
        >
          <MapPinIcon class="w-5 h-5 mr-2" />
          Voir le plan du barathon
        </button>
      </div>

      <!-- Titre -->
      <h1 class="text-3xl font-bold mb-6 text-center">Liste des Bars</h1>

      <!-- Liste des bars participants -->
      <div
        v-for="(bar, index) in barList"
        :key="bar.id"
        class="mb-4 border rounded-lg shadow-sm"
      >
        <!-- Header cliquable -->
        <button
          @click="toggleBar(index)"
          class="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-left"
        >
          <div class="flex items-center space-x-2">
            <span class="font-semibold text-lg">{{ capitalize(bar.name) }}</span>

            <span
              v-if="bar.is_starting_bar"
              class="flex items-center text-green-600 font-bold text-sm px-2 py-0.5 border border-green-600 rounded space-x-1"
            >
              <FlagIcon class="h-4 w-4" />
              <span>Départ</span>
            </span>

            <span
              v-if="bar.is_after_party"
              class="flex items-center text-purple-600 font-bold text-sm px-2 py-0.5 border border-purple-600 rounded space-x-1"
            >
              <MoonIcon class="h-4 w-4" />
              <span>After</span>
            </span>
          </div>

          <ChevronDownIcon
            :class="[
              'w-5 h-5 transition-transform',
              { 'rotate-180': activeIndex === index },
            ]"
          />
        </button>

        <!-- Détails affichés si actif -->
        <transition name="fade">
          <div v-if="activeIndex === index" class="p-4 bg-white">
            <!-- Image LAZY LOADED : chargée UNIQUEMENT quand le bar est ouvert -->
            <div
              v-if="bar.imageLoaded && !bar.image_path.endsWith('.svg')"
              class="bar-image-wrapper"
            >
              <img
                :src="bar.image_path"
                :alt="bar.name"
                loading="lazy"
                class="bar-image-main"
              />
            </div>
            <div
              v-else-if="bar.imageLoaded && bar.image_path.endsWith('.svg')"
              class="bar-image-wrapper-svg"
            >
              <img
                :src="bar.image_path"
                :alt="bar.name"
                loading="lazy"
                class="bar-image-svg"
              />
            </div>

            <!-- Carte Google Maps LAZY LOADED -->
            <div class="mb-3" v-if="bar.google_maps_link">
              <iframe
                :src="bar.google_maps_link"
                width="100%"
                height="200"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="rounded-md"
              ></iframe>
            </div>

            <!-- Liste des boissons -->
            <div v-if="bar.drinks && bar.drinks.length > 0" class="mb-6">
              <h3 class="text-lg font-bold mb-4 flex items-center">
                <CupSodaIcon class="w-5 h-5 mr-2 text-blue-500" />
                Boissons
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  v-for="drink in bar.drinks"
                  :key="drink.id"
                  class="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <span class="font-medium text-gray-800">{{
                    capitalize(drink.name)
                  }}</span>
                  <span class="font-bold text-green-600">{{
                    formatPrice(drink.price)
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Liste des aliments -->
            <div v-if="bar.foods && bar.foods.length > 0" class="mb-6">
              <h3 class="text-lg font-bold mb-4 flex items-center">
                <SandwichIcon class="w-5 h-5 mr-2 text-orange-500" />
                Nourriture
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  v-for="food in bar.foods"
                  :key="food.id"
                  class="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <span class="font-medium text-gray-800">{{
                    capitalize(food.name)
                  }}</span>
                  <span class="font-bold text-green-600">{{
                    formatPrice(food.price)
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Avantages -->
            <div v-if="bar.benefits && bar.benefits.length > 0">
              <h3 class="text-lg font-bold mb-4 flex items-center">
                <GiftIcon class="w-5 h-5 mr-2 text-purple-500" />
                Avantages
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="benefit in bar.benefits"
                  :key="benefit.id"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200 transition-colors"
                >
                  {{ capitalize(benefit.value) }}
                </span>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Modal pour la carte du barathon -->
      <transition name="modal-fade">
        <div
          v-if="showMapModal"
          @click="showMapModal = false"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            @click.stop
            class="relative bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden"
          >
            <!-- Header de la modal -->
            <div class="flex items-center justify-between p-4 border-b">
              <h2 class="text-xl font-bold">Plan du Barathon</h2>
              <button
                @click="showMapModal = false"
                class="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XIcon class="w-6 h-6" />
              </button>
            </div>

            <!-- Contenu de la modal -->
            <div class="p-4">
              <iframe
                v-if="showMapModal"
                src="https://www.google.com/maps/d/embed?mid=1dRegjolGKeBCUQuG8w6sPMeonDO4Vx8&ehbc=2E312F"
                width="100%"
                height="480"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                class="rounded-md"
              ></iframe>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Aucun événement trouvé -->
    <div v-else class="text-center py-12">
      <p class="text-lg text-gray-600">Aucun événement actif pour le moment.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  ChevronDownIcon,
  FlagIcon,
  MoonIcon,
  CupSodaIcon,
  SandwichIcon,
  GiftIcon,
  MapPinIcon,
  XIcon,
} from "lucide-vue-next";

const supabase = useSupabaseClient();

// État
const event = ref(null);
const barList = ref([]);
const loading = ref(true);
const error = ref(null);
const activeIndex = ref(null);
const showMapModal = ref(false);

// Computed pour les bars de départ
const startingBarsNames = computed(() => {
  const startingBars = barList.value.filter((bar) => bar.is_starting_bar);
  return startingBars.map((bar) => bar.name).join(" / ");
});

// Fonction pour récupérer l'événement actif
const fetchActiveEvent = async () => {
  try {
    loading.value = true;
    error.value = null;

    // 1. Récupérer l'événement actif le plus récent
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .order("event_date", { ascending: false })
      .limit(1)
      .single();

    if (eventError) throw eventError;
    if (!eventData) {
      error.value = "Aucun événement actif trouvé";
      return;
    }

    event.value = eventData;

    // 2. Récupérer tous les bars de cet événement avec leurs relations
    const { data: barsData, error: barsError } = await supabase
      .from("event_bars")
      .select(`
        id,
        is_starting_bar,
        is_after_party,
        display_order,
        bars (
          id,
          name,
          google_maps_link,
          image_path
        )
      `)
      .eq("event_id", eventData.id)
      .order("display_order", { ascending: true });

    if (barsError) throw barsError;

    // 3. Pour chaque bar, récupérer drinks, foods et benefits
    const barsWithDetails = await Promise.all(
      barsData.map(async (eventBar) => {
        // Récupérer les drinks
        const { data: drinks } = await supabase
          .from("drinks")
          .select("*")
          .eq("event_bar_id", eventBar.id)
          .order("name");

        // Récupérer les foods
        const { data: foods } = await supabase
          .from("foods")
          .select("*")
          .eq("event_bar_id", eventBar.id)
          .order("name");

        // Récupérer les benefits
        const { data: benefits } = await supabase
          .from("benefits")
          .select("*")
          .eq("event_bar_id", eventBar.id);

        return {
          ...eventBar.bars,
          is_starting_bar: eventBar.is_starting_bar,
          is_after_party: eventBar.is_after_party,
          display_order: eventBar.display_order,
          drinks: drinks || [],
          foods: foods || [],
          benefits: benefits || [],
          imageLoaded: false, // ← FLAG pour lazy loading
        };
      })
    );

    barList.value = barsWithDetails;
  } catch (err) {
    console.error("Erreur lors du chargement de l'événement:", err);
    error.value = "Erreur lors du chargement de l'événement";
  } finally {
    loading.value = false;
  }
};

// Fonction pour toggle un bar ET charger son image si nécessaire
const toggleBar = (index) => {
  const wasActive = activeIndex.value === index;
  activeIndex.value = wasActive ? null : index;
  
  // Charger l'image UNIQUEMENT si le bar est ouvert et pas déjà chargé
  if (!wasActive && barList.value[index] && !barList.value[index].imageLoaded) {
    barList.value[index].imageLoaded = true;
  }
};

// Fonctions utilitaires
const formatPrice = (price) => {
  if (typeof price === "number") {
    return `${price}€`;
  }
  if (typeof price === "string") {
    return price.includes("€") || price.includes("même prix")
      ? price
      : `${price}€`;
  }
  return price;
};

const capitalize = (s) => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Charger les données au montage
onMounted(() => {
  fetchActiveEvent();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transitions pour la modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Wrapper pour images normales (avec effet blur background) */
.bar-image-wrapper {
  position: relative;
  width: 100%;
  height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  background-color: #f3f4f6;
  overflow: hidden;
}

.bar-image-main {
  position: relative;
  z-index: 2;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

/* Wrapper pour images SVG */
.bar-image-wrapper-svg {
  width: 100%;
  height: 16rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
}

.bar-image-svg {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  display: block;
  margin: auto;
}

/* Responsive */
@media (min-width: 1024px) {
  .container {
    max-width: 900px;
  }
}
</style>
