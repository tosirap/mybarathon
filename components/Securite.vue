<script setup lang="ts">
import { ShieldCheckIcon, HeartPulseIcon, DropletsIcon } from "lucide-vue-next";

const measures = [
  {
    text: "Des kits de prévention sont distribués dans nos bars de départ ou par nos partenaires prévention.",
    icon: HeartPulseIcon,
  },
  {
    text: "Des rappels réguliers sur les réseaux : hydratation, consentement, retour sécurisé",
    icon: DropletsIcon,
  },
];
</script>

<template>
  <section
    id="securite"
    aria-labelledby="securite-title"
    class="section-y bg-white"
  >
    <div class="container-page">
      <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p class="eyebrow">
            <ShieldCheckIcon class="h-4 w-4" aria-hidden="true" />
            Sécurité
          </p>
          <h2 id="securite-title" class="section-title">
            On fait la fête, mais pas n’importe comment !
          </h2>
          <p class="section-lead">Pour que tout le monde passe une bonne soirée :</p>
        </div>

        <ul class="space-y-4">
          <li
            v-for="measure in measures"
            :key="measure.text"
            class="card flex items-start gap-4"
          >
            <span class="icon-chip">
              <component :is="measure.icon" class="h-5 w-5" aria-hidden="true" />
            </span>
            <p class="font-semibold leading-snug">{{ measure.text }}</p>
          </li>
        </ul>
      </div>

      <p
        class="mt-10 rounded-2xl bg-amber-100 p-5 text-center font-bold text-amber-900"
      >
        L’abus d’alcool est dangereux pour la santé, consomme avec modération
      </p>
    </div>
  </section>
</template>
