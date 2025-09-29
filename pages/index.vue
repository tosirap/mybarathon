<template>
  <div>
    <!-- Menu global -->
    <Menu />

    <!-- Sections -->
    <section id="accueil" class="py-12 bg-white border-b border-black">
      <div class="max-w-4xl mx-auto px-2 pt-4">
        <Accueil />
      </div>
    </section>

    <section id="evenements" class="py-12 bg-yellow-100 border-b border-black">
      <div class="max-w-4xl mx-auto px-2">
        <Evenements />
      </div>
    </section>

    <section id="partenaires" class="py-12 bg-white border-b border-black">
      <div class="max-w-4xl mx-auto px-2">
        <Partenaires />
      </div>
    </section>

    <section id="billetterie" class="py-12 bg-yellow-100 border-b border-black">
      <div class="max-w-4xl mx-auto px-2">
        <Billetterie />
      </div>
    </section>

    <section id="faq" class="py-12 bg-yellow-100 border-b border-black">
      <div class="max-w-4xl mx-auto px-2">
        <Faq />
      </div>
    </section>

    <section id="securite" class="py-12 bg-white border-b border-black">
      <div class="max-w-4xl mx-auto px-2">
        <Securite />
      </div>
    </section>

    <!-- <section id="galerie" class="py-12 bg-yellow-100 border-b border-black">
      <div class="max-w-4xl mx-auto px-2">
        <Galerie />
      </div>
    </section> -->

    <section id="rejoindre" class="py-12 bg-white border-b border-black">
      <div class="max-w-4xl mx-auto px-2">
        <Rejoindre />
      </div>
    </section>

    <section id="contact" class="py-12 bg-white border-b border-black">
      <div class="max-w-4xl mx-auto px-2">
        <Contact />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Menu from "~/components/common/Menu.vue";

// Import des composants de chaque section
import Accueil from "~/components/Accueil.vue";
import Evenements from "~/components/Evenements.vue";
import Partenaires from "~/components/Partenaires.vue";
import Billetterie from "~/components/Billetterie.vue";
import Securite from "~/components/Securite.vue";
import Galerie from "~/components/Galerie.vue";
import Rejoindre from "~/components/Rejoindre.vue";
import Faq from "~/components/Faq.vue";
import Contact from "~/components/Contact.vue";
</script>

<style>
/* Smooth scroll pour les ancres */
html {
  scroll-behavior: smooth;
}
</style>
