<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);
const buttonRef = ref<HTMLButtonElement | null>(null);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (buttonRef.value) {
    buttonRef.value.setAttribute("aria-expanded", isOpen.value.toString());
  }
};

const links = [
  { name: "Accueil", href: "#accueil" },
  { name: "Événements", href: "#evenements" },
  { name: "Partenaires", href: "#partenaires" },
  { name: "Billetterie 🎟️", href: "#billetterie", highlight: true },
  { name: "FAQ", href: "#faq" },
  { name: "Sécurité", href: "#securite" },
  { name: "Rejoindre l'équipe", href: "#rejoindre" },
  { name: "Contact", href: "#contact" },
];
</script>

<template>
  <nav class="bg-gray-100 shadow-md fixed w-full z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center w-full h-16">
        <div class="flex items-center space-x-2 md:space-x-0 flex-shrink-0">
          <NuxtImg
            src="/images/logo.png"
            alt="Logo mybarathon"
            width="40"
            height="40"
            sizes="sm:32 md:40"
            format="webp"
            loading="lazy"
            class="w-8 md:w-10"
          />
          <span class="md:hidden text-gray-900 font-medium text-base"
            >MyBarathon</span
          >
        </div>

        <div class="hidden md:flex space-x-6 flex-1 justify-center">
          <template v-for="link in links" :key="link.name">
            <a
              :href="link.href"
              class="text-gray-900 hover:text-gray-600 font-medium transition-colors duration-200"
              :class="
                link.highlight ? 'bg-yellow-300 px-3 py-1 rounded-lg' : ''
              "
            >
              {{ link.name }}
            </a>
          </template>
        </div>

        <div class="md:hidden ml-auto pr-2">
          <button
            ref="buttonRef"
            name="open_menu_burger"
            @click="toggleMenu"
            class="hamburger flex flex-col justify-center items-center w-6 h-6 text-gray-900 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none transition-transform duration-300 relative"
            :class="{ active: isOpen }"
            aria-label="Ouvrir le menu de navigation"
            :aria-expanded="isOpen"
          >
            <span
              class="line top w-full h-0.5 bg-current mx-0.5 transition-all duration-300 ease-in-out transform origin-center"
            ></span>
            <span
              class="line middle w-full h-0.5 bg-current mx-0.5 transition-all duration-300 ease-in-out transform origin-center"
            ></span>
            <span
              class="line bottom w-full h-0.5 bg-current mx-0.5 transition-all duration-300 ease-in-out transform origin-center"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="md:hidden bg-gray-100 shadow-lg">
      <div class="px-4 py-4 space-y-3">
        <template v-for="link in links" :key="link.name">
          <a
            :href="link.href"
            class="block text-gray-900 hover:text-gray-600 font-medium transition-colors duration-200"
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

.hamburger:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
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
