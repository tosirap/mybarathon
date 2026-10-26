<script setup lang="ts">
const year = new Date().getFullYear();

const links = [
  { name: "Événements", href: "#evenements" },
  { name: "Billetterie", href: "#billetterie" },
  { name: "FAQ", href: "#faq" },
  { name: "Sécurité", href: "#securite" },
  { name: "Contact", href: "#contact" },
];
</script>

<template>
  <footer class="border-t border-black bg-gray-100 text-ink/75">
    <div class="container-page py-12">
      <div
        class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
      >
        <a
          href="#accueil"
          class="flex items-center gap-3 text-ink"
          aria-label="MyBarathon, retour en haut de page"
        >
          <NuxtImg
            src="/images/logo.png"
            alt=""
            width="34"
            height="40"
            format="webp"
            loading="lazy"
            class="h-10 w-auto"
          />
          <span class="font-display text-lg font-extrabold">MyBarathon</span>
        </a>

        <nav aria-label="Liens du pied de page">
          <ul class="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <li v-for="link in links" :key="link.name">
              <a :href="link.href" class="transition hover:text-black">
                {{ link.name }}
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/mybarathon/"
                target="_blank"
                rel="noopener noreferrer"
                class="transition hover:text-black"
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="mt-8 flex flex-col gap-2 border-t border-gray-300 pt-6 text-sm text-ink/60 sm:flex-row sm:justify-between"
      >
        <p>© {{ year }} MyBarathon, association basée à Strasbourg.</p>
        <p>
          L’abus d’alcool est dangereux pour la santé, à consommer avec
          modération.
        </p>
      </div>
    </div>
  </footer>
</template>
