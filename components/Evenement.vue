<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Intro -->
    <div class="mb-8 text-center">
      <p class="text-lg font-medium">
        Prochain barathon : <span class="font-bold">ICI LA DATE</span>
      </p>
      <p class="text-md text-gray-600">
        Départ : <span class="font-semibold">BAR DEPART</span>
      </p>
    </div>

    <!-- Titre -->
    <h1 class="text-3xl font-bold mb-6 text-center">Liste des Bars</h1>

    <!-- Liste des bars -->
    <div v-for="(bar, index) in barList" :key="index" class="mb-4 border rounded-lg shadow-sm">
      <!-- Header cliquable -->
      <button
        @click="toggleBar(index)"
        class="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-left"
      >
        <span class="font-semibold text-lg">{{ bar.name }}</span>
        <svg
          :class="['w-5 h-5 transition-transform', { 'rotate-180': activeIndex === index }]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Détails affichés si actif -->
      <transition name="fade">
        <div v-if="activeIndex === index" class="p-4 bg-white">
          <!-- Image -->
          <img :src="bar.image" :alt="bar.name" class="w-full h-48 object-cover rounded-md mb-3" />

          <!-- Carte Google Maps -->
          <div class="mb-3" v-if="bar.link">
            <iframe
              :src="bar.link"
              width="100%"
              height="200"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="rounded-md"
            ></iframe>
          </div>

          <!-- Liste des boissons -->
          <h3 class="text-lg font-bold mb-2">Boissons disponibles</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li v-for="(drink, i) in bar.drinks" :key="i">{{ drink.name }} — {{ drink.price }}</li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import barList from '@/components/barathon/BarList'
const activeIndex = ref(null)

const toggleBar = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
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

/* Responsive */
@media (min-width: 1024px) {
  .container {
    max-width: 900px;
  }
}
</style>
