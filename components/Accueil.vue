<script setup lang="ts">
import {
  MapPinIcon,
  TicketIcon,
  ArrowRightIcon,
  LeafIcon,
  UsersIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-vue-next";

const values = [
  {
    title: "Authenticité",
    text: "On célèbre l’Alsace dans ce qu’elle a de plus vrai et savoureux.",
    icon: LeafIcon,
  },
  {
    title: "Convivialité",
    text: "Nos événements sont faits pour créer du lien et des souvenirs dans la bonne humeur.",
    icon: UsersIcon,
  },
  {
    title: "Sécurité et respect",
    text: "On encourage une consommation raisonnée et respectueuse, dans un cadre sécurisé.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Créativité",
    text: "Chaque édition est unique, avec des surprises à chaque virage.",
    icon: SparklesIcon,
  },
];
</script>

<template>
  <section id="accueil" aria-labelledby="accueil-title">
    <div class="relative overflow-hidden border-b border-black bg-white">
      <div
        class="container-page grid items-center gap-12 pb-20 pt-32 sm:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28"
      >
        <div>
          <p class="eyebrow">
            <MapPinIcon class="h-4 w-4" aria-hidden="true" />
            Strasbourg · Alsace
          </p>
          <h1
            id="accueil-title"
            class="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            MyBarathon —
            <span class="rounded-lg bg-yellow-300 px-2">L’Alsace en fête</span>, un bar à la
            fois
          </h1>
          <p class="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
            MyBarathon, c’est bien plus qu’une association : c’est une aventure
            festive et locale qui fait vibrer Strasbourg et ses alentours. Notre
            mission ? Mettre en lumière la richesse de la culture alsacienne à
            travers des événements conviviaux, originaux et accessibles à tous.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a href="#billetterie" class="btn btn-primary">
              <TicketIcon class="h-4 w-4" aria-hidden="true" />
              Réserver ma place
            </a>
            <a href="#evenements" class="btn btn-outline-dark">
              Voir les événements
              <ArrowRightIcon class="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-xs sm:max-w-sm">
          <div
            class="absolute inset-4 rounded-full border-2 border-black bg-yellow-200"
            aria-hidden="true"
          ></div>
          <NuxtImg
            src="/images/logo.png"
            alt="Pieuvre violette tenant quatre chopes de bière, mascotte de MyBarathon"
            width="520"
            height="610"
            format="webp"
            sizes="xs:70vw lg:380px"
            loading="eager"
            fetchpriority="high"
            class="relative mx-auto h-auto w-full drop-shadow-2xl"
          />
        </div>
      </div>
    </div>

    <div class="section-y bg-cream">
      <div class="container-page">
        <div class="max-w-3xl">
          <p class="eyebrow">Ce qu’on fait</p>
          <h2 class="section-title">Des parcours libres, des bars locaux</h2>
          <p class="section-lead">
            Nous organisons des barathons thématiques et d’autres événements
            festifs qui invitent les participants à (re)découvrir les bars,
            brasseries et commerces de la région. Chaque soirée est pensée
            comme un parcours libre, ponctué de partenariats avec des
            établissements locaux, pour faire connaître les produits du terroir
            et soutenir l’économie régionale.
          </p>
        </div>

        <h2 class="section-title mt-16">Nos valeurs</h2>
        <ul class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="value in values" :key="value.title" class="card">
            <span class="icon-chip">
              <component :is="value.icon" class="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 class="mt-4 font-display text-lg font-extrabold">
              {{ value.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-ink/70">
              {{ value.text }}
            </p>
          </li>
        </ul>

        <p
          class="mt-10 flex items-start gap-3 rounded-xl border border-gray-300 bg-white p-5 text-ink/80"
        >
          <MapPinIcon
            class="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
            aria-hidden="true"
          />
          <span>
            Basés à Strasbourg, nous collaborons avec des commerçants passionnés
            pour offrir des expériences uniques, où la découverte rime avec
            plaisir.
          </span>
        </p>
      </div>
    </div>
  </section>
</template>
