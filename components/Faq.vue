<script setup lang="ts">
import { ChevronDownIcon, MessageCircleIcon } from "lucide-vue-next";

const faqs = [
  {
    question: "Comment participer à un barathon ?",
    answer:
      "Réserve ta place en ligne, récupère ton Ecocup et profite librement du parcours.",
  },
  {
    question: "Âge minimum ?",
    answer: "18 ans, pièce d’identité demandée.",
  },
  {
    question: "Itinéraire obligatoire ?",
    answer: "Non, c’est libre !",
  },
  {
    question: "Réductions ?",
    answer: "Oui, avec ton Ecocup dans les bars partenaires.",
  },
  {
    question: "Imprévus ?",
    answer: "Billets revendables sur TicketSwap.",
  },
  {
    question: "Où récupérer mon Ecocup ?",
    answer: "Dans les bars de départ le jour J.",
  },
  {
    question: "Puis-je récupérer des places pour mes amis ?",
    answer: "Oui, avec leur pièce d’identité.",
  },
  {
    question: "Pas reçu ma place ?",
    answer:
      "Vérifie tes spams, ton paiement, ou contacte-nous sur Instagram.",
  },
];

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }),
    },
  ],
});
</script>

<template>
  <section id="faq" aria-labelledby="faq-title" class="section-y bg-white">
    <div class="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p class="eyebrow">
          <MessageCircleIcon class="h-4 w-4" aria-hidden="true" />
          Questions fréquentes
        </p>
        <h2 id="faq-title" class="section-title">FAQ</h2>
        <p class="section-lead">
          Tout ce qu’il faut savoir avant de rejoindre un barathon.
        </p>
      </div>

      <div class="space-y-3">
        <details
          v-for="faq in faqs"
          :key="faq.question"
          class="group rounded-2xl border border-ink/10 bg-cream transition open:bg-white open:shadow-soft"
        >
          <summary
            class="flex cursor-pointer items-center justify-between gap-4 rounded-2xl p-5 font-bold"
          >
            <span>{{ faq.question }}</span>
            <ChevronDownIcon
              class="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p class="px-5 pb-5 text-ink/70">{{ faq.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
