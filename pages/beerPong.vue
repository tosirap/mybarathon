<template>
  <div>
    <!-- Menu -->
    <div class="fixed top-0 left-0 w-full z-50">
      <BeerpongMenu :isDesktop="isDesktop" />
    </div>

    <!-- Title -->
    <div class="p-32 flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 class="pt-6 text-4xl font-bold">MYBARATHON</h1>
      <h3 class="text-xl mt-2">Beer Pong Géant</h3>
      <button
        class="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-600 transition"
        @click="() => (location.href='#billeterie')"
      >
        <b>Billeterie →</b>
      </button>
    </div>

    <!-- Concept -->
    <div id="concept" class="p-8">
      <BeerpongConcept />
    </div>

    <!-- Règles -->
    <div id="regles" class="p-16 bg-gray-100">
      <BeerpongRegles />
    </div>

    <!-- Billeterie -->
    <div id="billeterie" class="p-8">
      <BeerpongBilleterie />
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
const isDesktop = ref(false);

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768;
};

onMounted(() => {
  if (process.client) {
    isDesktop.value = window.innerWidth >= 768;
    window.addEventListener("resize", handleResize);
  }
});
</script>
