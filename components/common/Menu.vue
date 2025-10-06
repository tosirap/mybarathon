<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);

const links = [
  { name: "Accueil", href: "#accueil" },
  { name: "Événements", href: "#evenements" },
  { name: "Partenaires", href: "#partenaires" },
  { name: "Billetterie 🎟️", href: "#billetterie", highlight: true },
  { name: "FAQ", href: "#faq" },
  { name: "Sécurité", href: "#securite" },
  // { name: "Galerie photo", href: "#galerie" },
  { name: "Rejoindre l’équipe", href: "#rejoindre" },
  { name: "Contact", href: "#contact" },
];
</script>

<template>
  <nav class="bg-gray-100 shadow-md fixed w-full z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between w-full h-16">
        <!-- Logo and Mobile title -->
        <div class="flex items-center space-x-2 md:space-x-0">
          <img
            src="~/assets/images/logo.png"
            alt="Logo mybarathon"
            class="w-8 md:w-10"
          />
          <span class="md:hidden text-black font-medium">MyBarathon</span>
        </div>

        <!-- Desktop menu -->
        <div class="hidden md:flex space-x-6">
          <template v-for="link in links" :key="link.name">
            <a
              :href="link.href"
              class="text-black hover:text-gray-600 font-medium"
              :class="
                link.highlight ? 'bg-yellow-300 px-3 py-1 rounded-lg' : ''
              "
            >
              {{ link.name }}
            </a>
          </template>
        </div>

        <!-- Mobile burger -->
        <div class="md:hidden ml-auto pr-2">
          <button
            @click="isOpen = !isOpen"
            class="hamburger text-black focus:outline-none relative w-6 h-6"
            :class="{ active: isOpen }"
          >
            <span class="line top"></span>
            <span class="line middle"></span>
            <span class="line bottom"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <div v-if="isOpen" class="md:hidden bg-gray-100 shadow-lg">
      <div class="px-4 py-4 space-y-3">
        <template v-for="link in links" :key="link.name">
          <a
            :href="link.href"
            class="block text-black hover:text-gray-600 font-medium"
            :class="
              link.highlight
                ? 'bg-yellow-300 px-3 py-2 rounded-lg inline-block'
                : ''
            "
            @click="isOpen = false"
          >
            {{ link.name }}
          </a>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
}

.line {
  width: 24px;
  height: 3px;
  background-color: currentColor;
  margin: 2px 0;
  transition: 0.3s;
  transform-origin: center;
}

.hamburger.active .top {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active .middle {
  opacity: 0;
}

.hamburger.active .bottom {
  transform: rotate(-45deg) translate(5px, -5px);
}
</style>
