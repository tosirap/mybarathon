<template>
  <div>
    <div class="flex flex-wrap items-center text-lg bg-gray-100 px-4 py-2">
      <!-- Version Desktop -->
      <div v-if="isDesktop" class="flex w-full items-center">
        <!-- Logo -->
        <div class="flex-1 flex justify-center">
          <a href="#">
            <img src="~/assets/images/logo.png" alt="Logo mybarathon" class="w-8 md:w-12" />
          </a>
        </div>

        <!-- Liens -->
        <div class="flex-1 flex justify-center">
          <a href="#concept" class="px-4 py-2 hover:text-yellow-600 transition">Concept</a>
        </div>
        <div class="flex-1 flex justify-center">
          <a href="#regles" class="px-4 py-2 hover:text-yellow-600 transition">Règles</a>
        </div>
        <div class="flex-1 flex justify-center">
          <a href="#billeterie" class="px-4 py-2 hover:text-yellow-600 transition">Billeterie</a>
        </div>
        <div class="flex-1 flex justify-center">
          <a href="#instagram" class="px-4 py-2 hover:text-yellow-600 transition">Notre Instagram</a>
        </div>
        <div class="flex-1 flex justify-center">
          <a
            href="/"
            class="px-4 py-2 rounded bg-[#ebde2af6] text-black font-medium hover:opacity-90 transition"
          >
            Espace Barathon
          </a>
        </div>
      </div>

      <!-- Version Mobile -->
      <div v-else class="flex w-full">
        <div class="w-1/2 flex justify-center">
          <a href="#billeterie" class="px-4 py-2 hover:text-yellow-600 transition">Billeterie</a>
        </div>
        <div class="w-1/2 flex justify-center">
          <a
            href="/"
            class="px-4 py-2 rounded bg-[#ebde2af6] text-black font-medium hover:opacity-90 transition"
          >
            Barathon →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isDesktop: Boolean,
});
</script>
