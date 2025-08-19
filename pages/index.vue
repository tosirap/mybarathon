<template>
  <div>
    <Head>
      <Title>MyBarathon</Title>
    </Head>

    <!-- Menu -->
    <div class="fixed top-0 left-0 w-full z-50 h-16">
      <BarathonMenu :isDesktop="isDesktop" />
    </div>

    <!-- Title -->
    <div class="pt-20 pb-8 flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 class="pt-6 text-4xl font-bold">MYBARATHON</h1>
      <h3 class="text-xl mt-2">Toute ta ville en happy hours</h3>
      <button
        class="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-600 transition"
        @click="() => (location.href='#billeterie')"
      >
        <b>Billeterie →</b>
      </button>
    </div>

    <!-- Concept -->
    <div id="concept" class="p-8">
      <BarathonConcept :nbBar="barList.length" />
    </div>

    <!-- Liste des bars -->
    <div id="bars" class="p-16 bg-gray-100">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-center text-2xl font-bold pb-6">Liste des bars</h1>
        <ul class="flex flex-wrap justify-center items-center gap-2">
          <li
            v-for="(bar, index) in barList"
            :key="index"
            class="flex items-center"
          >
            <a
              :href="bar?.link ?? ''"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              {{ bar?.name ?? "" }}
            </a>
            <span
              v-if="index < barList.length - 1"
              class="mx-2 text-gray-400"
            >
              •
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Billeterie -->
    <div id="billeterie" class="p-16">
      <BarathonBilleterie />
    </div>

    <!-- Instagram -->
    <div id="instagram" class="p-16 bg-gray-800 text-white">
      <Instagram />
    </div>

    <!-- Footer -->
    <footer class="container mx-auto px-4 py-8 bg-gray-100 text-center">
      <Footer />
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import barList from '../components/barathon/BarList';

useSeoMeta({
  title: 'MyBarathon',
  ogTitle: 'MyBarathon',
  description: 'Organisateur de barathons et de bière pong géants sur Strasbourg.',
  ogDescription: 'Organisateur de barathons et de bière pong géants sur Strasbourg. MyBarathon. My barathon. Barathon Strasbourg. Grand Barathon. Evènement. Event Strasbourg. Alsace',
  ogImage: '/public/favicon.ico',
})

const isDesktop = ref(false);

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768;
};

onMounted(() => {
  if (process.client) {
    isDesktop.value = window.innerWidth >= 768;
    window.addEventListener('resize', handleResize);
  }
});
</script>

<style>
@import url("~/assets/css/common.css");
</style>
