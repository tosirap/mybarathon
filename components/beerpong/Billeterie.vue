<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-center text-2xl font-bold pb-6">Billeterie</h1>

    <div class="flex flex-col items-center">
      <a
        title="Vente de billets en ligne"
        href="https://www.billetweb.fr/shop.php?event=tournois-beerpong-mybarathon"
        class="inline-block px-6 py-3 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-600 transition font-medium"
        target="_blank"
        data-src="https://www.billetweb.fr/shop.php?event=tournois-beerpong-mybarathon"
        data-max-width="100%"
        data-initial-height="600"
        data-scrolling="no"
        data-id="tournois-beerpong-mybarathon"
        data-resize="1"
      >
        Vente de billets en ligne
      </a>

      <p class="text-center text-gray-700 font-semibold mt-4">
        Aucune vente sur place
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://www.billetweb.fr/js/export.js";
  document.body.appendChild(script);
});
</script>
