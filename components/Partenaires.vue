<script setup lang="ts">
import {
  HandshakeIcon,
  EyeIcon,
  PartyPopperIcon,
  AwardIcon,
} from "lucide-vue-next";

const benefits = [
  {
    text: "Gagner en visibilité auprès d’un public jeune et curieux",
    icon: EyeIcon,
  },
  {
    text: "Participer à des événements dynamiques et bien organisés",
    icon: PartyPopperIcon,
  },
  {
    text: "Valoriser les savoir-faire régionaux dans un cadre festif",
    icon: AwardIcon,
  },
];
</script>

<template>
  <section
    id="partenaires"
    aria-labelledby="partenaires-title"
    class="section-y bg-cream"
  >
    <div class="container-page">
      <div class="max-w-3xl">
        <p class="eyebrow">
          <HandshakeIcon class="h-4 w-4" aria-hidden="true" />
          Partenaires
        </p>
        <h2 id="partenaires-title" class="section-title">
          Ensemble, on fait rayonner l’Alsace
        </h2>
        <p class="section-lead">
          Nous collaborons avec des commerces locaux, bars, brasseries et
          artisans pour mettre en avant leurs produits lors de nos événements.
        </p>
      </div>

      <h3 class="mt-12 font-display text-xl font-extrabold">
        Être partenaire de MyBarathon, c’est :
      </h3>
      <ul class="mt-6 grid gap-5 md:grid-cols-3">
        <li v-for="benefit in benefits" :key="benefit.text" class="card">
          <span class="icon-chip">
            <component :is="benefit.icon" class="h-5 w-5" aria-hidden="true" />
          </span>
          <p class="mt-4 font-semibold leading-snug">{{ benefit.text }}</p>
        </li>
      </ul>

      <div
        class="card mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="font-semibold">
          Vous êtes un établissement alsacien et souhaitez rejoindre l’aventure ?
        </p>
        <a href="#contact" class="btn btn-brand shrink-0">Contactez-nous</a>
      </div>
    </div>
  </section>
</template>
