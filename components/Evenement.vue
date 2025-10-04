<template>
  <div class="container mx-auto py-6">
    <!-- Intro -->
    <div class="my-8 text-center">
      <p class="text-lg font-medium">Prochain barathon : 9 octobre 2025</p>
      <p class="text-md">
        Départs : <span class="font-bold">Le Créchoir</span>
      </p>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 3v16l7-5 7 5V3H5z"
              />
            </svg>
            <span>Départ</span>
          </span>

          <span
            v-if="bar.after"
            class="flex items-center text-purple-600 font-bold text-sm px-2 py-0.5 border border-purple-600 rounded space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 0112.21 3a7 7 0 109.45 9.45z" />
            </svg>
            <span>After</span>
          </span>
        </div>

        <svg
          :class="[
            'w-5 h-5 transition-transform',
            { 'rotate-180': activeIndex === index },
          ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
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
              background: #111;
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
          <div v-if="bar.drinks && bar.drinks.length > 0">
            <h3 class="text-lg font-bold mb-2">Boissons</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li v-for="(drink, i) in bar.drinks" :key="i">
                {{ capitalize(drink.name) }} — {{ formatPrice(drink.price) }}
              </li>
            </ul>
          </div>

          <!-- Liste des aliments -->
          <div v-if="bar.foods && bar.foods.length > 0">
            <h3 class="text-lg font-bold mb-2">Nourriture</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li v-for="(food, i) in bar.foods" :key="i">
                {{ capitalize(food.name) }} — {{ formatPrice(food.price) }}
              </li>
            </ul>
          </div>

          <!-- Avantages -->
          <div v-if="bar.benefits && bar.benefits.length > 0">
            <h3 class="text-lg font-bold mb-2">Avantages</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li v-for="(benefit, i) in bar.benefits" :key="i">
                {{ capitalize(benefit.value) }}
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import barList from "@/components/barathon/BarList";
import defaultBarImage from "@/assets/images/defaultBarImage.png";

const activeIndex = ref(null);

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
