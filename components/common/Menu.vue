<script setup lang="ts">
import { ref } from "vue"

const isOpen = ref(false)

const links = [
  { name: "Accueil", href: "#accueil" },
  { name: "Événements", href: "#evenements" },
  { name: "Partenaires", href: "#partenaires" },
  { name: "Billetterie 🎟️", href: "#billetterie", highlight: true },
  { name: "Sécurité", href: "#securite" },
  { name: "Galerie photo", href: "#galerie" },
  { name: "Rejoindre l’équipe", href: "#rejoindre" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
]
</script>

<template>
  <nav class="bg-gray-100 shadow-md fixed w-full z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <img
            src="~/assets/images/logo.png"
            alt="Logo mybarathon"
            class="w-8 md:w-10"
          />
        </div>

        <!-- Desktop menu -->
        <div class="hidden md:flex space-x-6">
          <template v-for="link in links" :key="link.name">
            <a
              :href="link.href"
              class="text-black hover:text-gray-600 font-medium"
              :class="link.highlight ? 'bg-yellow-300 px-3 py-1 rounded-lg' : ''"
            >
              {{ link.name }}
            </a>
          </template>
        </div>

        <!-- Mobile burger -->
        <div class="md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="text-black focus:outline-none"
          >
            <!-- Icône burger -->
            <svg
              v-if="!isOpen"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icône croix -->
            <svg
              v-else
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <div
      v-if="isOpen"
      class="md:hidden bg-gray-100 shadow-lg"
    >
      <div class="px-4 py-4 space-y-3">
        <template v-for="link in links" :key="link.name">
          <a
            :href="link.href"
            class="block text-black hover:text-gray-600 font-medium"
            :class="link.highlight ? 'bg-yellow-300 px-3 py-2 rounded-lg inline-block' : ''"
            @click="isOpen = false"
          >
            {{ link.name }}
          </a>
        </template>
      </div>
    </div>
  </nav>
</template>
