<script setup lang="ts">
import { UsersIcon, CheckIcon, MailIcon } from "lucide-vue-next";

const seeking = [
  "Des bénévoles motivés",
  "Des créatifs pour la com’ et les réseaux sociaux",
  "Des partenaires pour développer de nouveaux projets",
];

const gains = [
  "Une expérience enrichissante dans l’événementiel",
  "Des rencontres et des souvenirs mémorables",
  "Des avantages lors des événements",
];
</script>

<template>
  <section
    id="rejoindre"
    aria-labelledby="rejoindre-title"
    class="section-y bg-cream"
  >
    <div class="container-page">
      <div class="max-w-3xl">
        <p class="eyebrow">
          <UsersIcon class="h-4 w-4" aria-hidden="true" />
          Rejoindre l'équipe
        </p>
        <h2 id="rejoindre-title" class="section-title">
          Deviens acteur de la fête !
        </h2>
        <p class="section-lead">
          Tu veux participer à l’organisation d’événements festifs et locaux ?
          Rejoins l’équipe MyBarathon et découvre les coulisses d’une asso
          dynamique et créative !
        </p>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <div class="rounded-xl border border-gray-300 bg-white p-6">
          <h3 class="font-display text-xl font-extrabold">Ce qu’on recherche :</h3>
          <ul class="mt-4 space-y-3">
            <li v-for="item in seeking" :key="item" class="flex items-start gap-3">
              <CheckIcon class="mt-1 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
              <span class="text-ink/80">{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="rounded-xl border border-gray-300 bg-white p-6">
          <h3 class="font-display text-xl font-extrabold">Ce que tu gagnes :</h3>
          <ul class="mt-4 space-y-3">
            <li v-for="item in gains" :key="item" class="flex items-start gap-3">
              <CheckIcon class="mt-1 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
              <span class="text-ink/80">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <p class="font-semibold">Écris-nous via Instagram ou par mail :</p>
        <div class="flex flex-wrap gap-3">
          <a
            href="https://www.instagram.com/mybarathon/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            Instagram
          </a>
          <a href="mailto:mybarathon@gmail.com" class="btn btn-outline-dark">
            <MailIcon class="h-4 w-4" aria-hidden="true" />
            mybarathon@gmail.com
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
