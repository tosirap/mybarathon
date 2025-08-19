<template>
  <div>
    <!-- Menu global -->
    <Menu />

    <!-- Sections -->
    <section id="accueil" class="min-h-screen flex items-center justify-center bg-white border-b border-black">
      <Accueil />
    </section>

    <section id="evenements" class="min-h-screen flex items-center justify-center bg-yellow-100 border-b border-black">
      <Evenements />
    </section>

    <section id="partenaires" class="min-h-screen flex items-center justify-center bg-white border-b border-black">
      <Partenaires />
    </section>

    <section id="billetterie" class="min-h-screen flex items-center justify-center bg-yellow-100 border-b border-black">
      <Billetterie />
    </section>

    <section id="securite" class="min-h-screen flex items-center justify-center bg-white border-b border-black">
      <Securite />
    </section>

    <section id="galerie" class="min-h-screen flex items-center justify-center bg-yellow-100 border-b border-black">
      <Galerie />
    </section>

    <section id="rejoindre" class="min-h-screen flex items-center justify-center bg-white border-b border-black">
      <Rejoindre />
    </section>

    <section id="faq" class="min-h-screen flex items-center justify-center bg-yellow-100 border-b border-black">
      <Faq />
    </section>

    <section id="contact" class="min-h-screen flex items-center justify-center bg-white border-b border-black">
      <Contact />
    </section>
  </div>
</template>

<script setup lang="ts">
import Menu from "~/components/common/Menu.vue"

// Import des composants de chaque section
import Accueil from "~/components/Accueil.vue"
import Evenements from "~/components/Evenements.vue"
import Partenaires from "~/components/Partenaires.vue"
import Billetterie from "~/components/Billetterie.vue"
import Securite from "~/components/Securite.vue"
import Galerie from "~/components/Galerie.vue"
import Rejoindre from "~/components/Rejoindre.vue"
import Faq from "~/components/Faq.vue"
import Contact from "~/components/Contact.vue"
</script>

<style>
/* Smooth scroll pour les ancres */
html {
  scroll-behavior: smooth;
}
</style>
