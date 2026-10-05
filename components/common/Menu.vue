<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { MenuIcon, XIcon } from "lucide-vue-next";

const isOpen = ref(false);
const scrolled = ref(false);
const activeId = ref("accueil");

const links = [
  { name: "Accueil", href: "#accueil" },
  { name: "Événements", href: "#evenements" },
  { name: "Partenaires", href: "#partenaires" },
  { name: "Billetterie", href: "#billetterie", highlight: true },
  { name: "FAQ", href: "#faq" },
  { name: "Sécurité", href: "#securite" },
  { name: "Rejoindre l'équipe", href: "#rejoindre" },
  { name: "Contact", href: "#contact" },
];

let observer: IntersectionObserver | null = null;

const onScroll = () => {
  scrolled.value = window.scrollY > 8;
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") isOpen.value = false;
};

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKeydown);

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id;
      }
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  for (const link of links) {
    const section = document.getElementById(link.href.slice(1));
    if (section) observer.observe(section);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKeydown);
  observer?.disconnect();
});
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="
      scrolled || isOpen
        ? 'bg-ink/95 shadow-lg shadow-black/20 backdrop-blur'
        : 'bg-transparent'
    "
  >
    <nav
      aria-label="Navigation principale"
      class="container-page flex h-16 items-center justify-between gap-4 sm:h-20"
    >
      <a
        href="#accueil"
        class="flex items-center gap-3 text-white"
        aria-label="MyBarathon, retour à l'accueil"
      >
        <NuxtImg
          src="/images/logo.png"
          alt=""
          width="34"
          height="40"
          format="webp"
          class="h-10 w-auto"
        />
        <span class="font-display text-lg font-extrabold tracking-tight">
          MyBarathon
        </span>
      </a>

      <ul class="hidden items-center gap-1 xl:flex">
        <li v-for="link in links" :key="link.name">
          <a
            :href="link.href"
            :aria-current="activeId === link.href.slice(1) ? 'location' : undefined"
            class="rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-200"
            :class="
              link.highlight
                ? 'ml-1 bg-amber-400 px-4 text-ink hover:bg-amber-300'
                : activeId === link.href.slice(1)
                  ? 'bg-white/15 text-white'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
            "
          >
            {{ link.name }}
          </a>
        </li>
      </ul>

      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 text-white transition hover:bg-white/10 xl:hidden"
        :aria-label="
          isOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'
        "
        :aria-expanded="isOpen"
        aria-controls="mobile-navigation"
        @click="isOpen = !isOpen"
      >
        <XIcon v-if="isOpen" class="h-5 w-5" aria-hidden="true" />
        <MenuIcon v-else class="h-5 w-5" aria-hidden="true" />
      </button>
    </nav>

    <div
      v-if="isOpen"
      id="mobile-navigation"
      class="border-t border-white/10 xl:hidden"
    >
      <ul class="container-page grid gap-1 py-4">
        <li v-for="link in links" :key="link.name">
          <a
            :href="link.href"
            class="block rounded-xl px-4 py-3 text-base font-semibold transition-colors"
            :class="
              link.highlight
                ? 'bg-amber-400 text-ink hover:bg-amber-300'
                : activeId === link.href.slice(1)
                  ? 'bg-white/15 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
            "
            @click="isOpen = false"
          >
            {{ link.name }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>
