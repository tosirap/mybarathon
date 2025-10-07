<template>
  <div class="container mx-auto py-6">
    <!-- Intro -->
    <div class="my-8 text-center">
      <p class="text-lg font-medium">Prochain barathon : 9 octobre 2025</p>
      <p class="text-md">
        Départs : <span class="font-bold">Le Créchoir / Les Berthom</span>
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
      :key="index"
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
            v-if="bar.starting"
            class="flex items-center text-green-600 font-bold text-sm px-2 py-0.5 border border-green-600 rounded space-x-1"
          >
            <FlagIcon class="h-4 w-4" />
            <span>Départ</span>
          </span>

          <span
            v-if="bar.after"
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
          <!-- Image -->
          <div
            v-if="!(bar.image || defaultBarImage).endsWith('.svg')"
            class="bar-image-wrapper"
            :style="{
              backgroundImage: `url('${bar.image || defaultBarImage}')`,
            }"
          >
            <img
              :src="bar.image || defaultBarImage"
              :alt="bar.name"
              class="bar-image-main"
            />
          </div>
          <div
            v-else
            class="bar-image-wrapper flex items-center justify-center"
            style="
              width: 100%;
              height: 16rem;
              border-radius: 0.5rem;
              margin-bottom: 0.75rem;
              overflow: hidden;
            "
          >
            <img
              :src="bar.image || defaultBarImage"
              :alt="bar.name"
              style="
                max-width: 80%;
                max-height: 80%;
                object-fit: contain;
                display: block;
                margin: auto;
              "
            />
          </div>

          <!-- Carte Google Maps -->
          <div class="mb-3" v-if="bar.link">
            <iframe
              :src="bar.link"
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
                v-for="(drink, i) in bar.drinks"
                :key="i"
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
                v-for="(food, i) in bar.foods"
                :key="i"
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
                v-for="(benefit, i) in bar.benefits"
                :key="i"
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
</template>

<script setup>
import { ref } from "vue";
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
import barList from "@/components/barathon/BarList";
import defaultBarImage from "@/assets/images/defaultBarImage.png";

const activeIndex = ref(null);
const showMapModal = ref(false);

const toggleBar = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

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

.bar-image-wrapper {
  position: relative;
  width: 100%;
  height: 16rem; /* h-64 */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
.bar-image-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: inherit;
  filter: blur(24px) brightness(0.7);
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

/* Responsive */
@media (min-width: 1024px) {
  .container {
    max-width: 900px;
  }
}
</style>
