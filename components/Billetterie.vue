<script setup lang="ts">
import { TicketIcon, CheckIcon, ExternalLinkIcon } from "lucide-vue-next";

const billetwebUrl = "https://www.billetweb.fr/shop.php?event=barathon22";

const perks = [
  "Ton Ecocup personnalisé",
  "L’accès aux réductions exclusives",
  "Des animations et surprises tout au long de la soirée",
  "Des afters en club avec entrées incluses",
];
</script>

<template>
  <section
    id="billetterie"
    aria-labelledby="billetterie-title"
    class="section-y bg-white"
  >
    <div class="container-page">
      <div class="max-w-3xl">
        <p class="eyebrow">
          <TicketIcon class="h-4 w-4" aria-hidden="true" />
          Billetterie
        </p>
        <h2 id="billetterie-title" class="section-title">
          Réserve ta place pour le prochain barathon !
        </h2>
        <p class="section-lead">
          Nos événements sont très demandés, alors pense à réserver ta place à
          l’avance pour profiter de :
        </p>
      </div>

      <ul class="mt-8 grid gap-4 sm:grid-cols-2">
        <li
          v-for="perk in perks"
          :key="perk"
          class="flex items-start gap-3 rounded-2xl bg-white p-4 font-semibold shadow-soft"
        >
          <span
            class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
          >
            <CheckIcon class="h-4 w-4" aria-hidden="true" />
          </span>
          {{ perk }}
        </li>
      </ul>

      <p class="mt-8 text-lg font-bold">
        Billets disponibles en prévente à tarif réduit sur BilletWeb
      </p>

      <div
        class="mt-5 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft"
      >
        <iframe
          :src="billetwebUrl"
          class="block min-h-[850px] w-full border-0"
          scrolling="auto"
          loading="lazy"
          title="Billetterie MyBarathon sur BilletWeb"
        ></iframe>
      </div>

      <a
        :href="billetwebUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="link mt-4 inline-flex items-center gap-1.5 text-sm"
      >
        Ouvrir la billetterie dans un nouvel onglet
        <ExternalLinkIcon class="h-4 w-4" aria-hidden="true" />
      </a>

      <div class="mt-8 space-y-2 text-sm text-ink/70">
        <p>Après 22H les billets non récupérés sont revendus sur place pour 10 €</p>
        <p>
          Et pour les retardataires, quelques places sont disponibles en caisse
          le soir-même !
        </p>
      </div>
    </div>
  </section>
</template>
