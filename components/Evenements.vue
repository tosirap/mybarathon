<script setup lang="ts">
import { PartyPopperIcon } from "lucide-vue-next";

const steps = [
  "Vous précommandez votre Ecocup personnalisé",
  "Vous récupérez votre pass le jour J",
  "Vous choisissez votre itinéraire parmi les établissements partenaires",
  "Et vous profitez d’animations, de surprises et de la convivialité alsacienne !",
];
</script>

<template>
  <section
    id="evenements"
    aria-labelledby="evenements-title"
    class="section-y bg-white"
  >
    <div class="container-page">
      <div class="max-w-3xl">
        <p class="eyebrow">
          <PartyPopperIcon class="h-4 w-4" aria-hidden="true" />
          Événements
        </p>
        <h2 id="evenements-title" class="section-title">
          Des soirées qui font pétiller l’Alsace
        </h2>
        <p class="section-lead">
          Chez MyBarathon, chaque événement est une invitation à explorer
          Strasbourg autrement. Nos barathons thématiques vous permettent de
          découvrir une sélection de bars partenaires, profiter de tarifs
          préférentiels et vivre une soirée festive en toute liberté.
        </p>
      </div>

      <h3 class="mt-14 font-display text-2xl font-extrabold">
        Comment ça marche ?
      </h3>
      <ol class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(step, index) in steps"
          :key="step"
          class="rounded-2xl bg-brand-50 p-5"
        >
          <span
            class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 font-display font-extrabold text-white"
            aria-hidden="true"
          >
            {{ index + 1 }}
          </span>
          <p class="mt-4 font-semibold leading-snug">{{ step }}</p>
        </li>
      </ol>

      <div class="mt-16">
        <Evenement />
      </div>
    </div>
  </section>
</template>
