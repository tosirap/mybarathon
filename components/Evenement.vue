<template>
  <div>
    <!-- Chargement -->
    <div v-if="loading" class="space-y-4" aria-busy="true">
      <p class="sr-only" role="status">Chargement des événements…</p>
      <div v-for="n in 2" :key="n" class="h-28 animate-pulse rounded-3xl bg-ink/5"></div>
    </div>

    <!-- Erreur -->
    <div
      v-else-if="error"
      class="rounded-2xl border border-red-200 bg-red-50 p-6 text-center"
      role="alert"
    >
      <p class="font-semibold text-red-700">{{ error }}</p>
      <button type="button" class="btn btn-brand mt-4" @click="fetchEvents">
        Réessayer
      </button>
    </div>

    <!-- Aucun événement -->
    <p
      v-else-if="events.length === 0"
      class="rounded-2xl bg-brand-50 p-8 text-center text-lg text-ink/70"
    >
      Aucun événement actif pour le moment.
    </p>

    <template v-else>
      <div
        class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
      >
        <h3 class="font-display text-2xl font-extrabold sm:text-3xl">
          Nos barathons
        </h3>

        <div
          role="tablist"
          aria-label="Type d'événements"
          class="inline-flex self-start rounded-full bg-ink/5 p-1"
        >
          <button
            v-for="tab in tabs"
            :id="`tab-${tab.id}`"
            :key="tab.id"
            type="button"
            role="tab"
            :aria-selected="activeTab === tab.id"
            :aria-controls="`panel-${tab.id}`"
            class="rounded-full px-5 py-2 text-sm font-bold transition"
            :class="
              activeTab === tab.id
                ? 'bg-ink text-white shadow'
                : 'text-ink/70 hover:text-ink'
            "
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
            <span class="ml-1 opacity-70">({{ tab.count }})</span>
          </button>
        </div>
      </div>

      <div
        :id="`panel-${activeTab}`"
        role="tabpanel"
        :aria-labelledby="`tab-${activeTab}`"
        class="mt-8 space-y-5"
      >
        <p
          v-if="visibleEvents.length === 0"
          class="rounded-2xl bg-brand-50 p-8 text-center text-ink/70"
        >
          {{
            activeTab === "upcoming"
              ? "Aucun événement à venir pour le moment."
              : "Aucun événement passé."
          }}
        </p>

        <article
          v-for="ev in visibleEvents"
          :key="ev.id"
          class="overflow-hidden rounded-3xl border bg-white shadow-soft"
          :class="ev.open ? 'border-brand-300' : 'border-ink/10'"
        >
          <h4>
            <button
              type="button"
              class="flex w-full items-center gap-4 p-5 text-left transition hover:bg-brand-50/60 sm:p-6"
              :aria-expanded="ev.open"
              :aria-controls="`event-${ev.id}`"
              @click="toggleEvent(ev)"
            >
              <span
                class="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl text-white"
                :class="activeTab === 'past' ? 'bg-ink/60' : 'bg-brand-600'"
                aria-hidden="true"
              >
                <span class="font-display text-2xl font-extrabold leading-none">
                  {{ dayOf(ev.event_date) }}
                </span>
                <span class="mt-1 text-[0.7rem] font-bold uppercase tracking-wider">
                  {{ monthShort(ev.event_date) }}
                </span>
              </span>

              <span class="min-w-0 flex-1">
                <span
                  v-if="ev.id === nextEventId && activeTab === 'upcoming'"
                  class="mb-1 inline-flex rounded-full bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-800"
                >
                  Prochain barathon
                </span>
                <span class="block font-display text-lg font-extrabold leading-snug sm:text-xl">
                  {{ ev.name || "Barathon" }}
                </span>
                <span class="mt-0.5 block text-sm text-ink/70">
                  {{ formatDate(ev.event_date) }}
                  <template v-if="startingBarsNames(ev)">
                    · Départs : {{ startingBarsNames(ev) }}
                  </template>
                </span>
              </span>

              <ChevronDownIcon
                class="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200"
                :class="{ 'rotate-180': ev.open }"
                aria-hidden="true"
              />
            </button>
          </h4>

          <transition name="fade">
            <div
              v-if="ev.open"
              :id="`event-${ev.id}`"
              class="border-t border-ink/10 p-5 sm:p-6"
            >
              <p v-if="ev.description" class="mb-4 text-ink/70">
                {{ ev.description }}
              </p>

              <button
                v-if="ev.map_embed_url"
                type="button"
                class="btn btn-brand mb-6"
                @click="mapEvent = ev"
              >
                <MapPinIcon class="h-4 w-4" aria-hidden="true" />
                Voir le plan du barathon
              </button>

              <h5 class="mb-3 font-display text-lg font-extrabold">
                Liste des bars
                <span class="font-semibold text-ink/50">({{ ev.bars.length }})</span>
              </h5>

              <p v-if="ev.bars.length === 0" class="text-ink/60">
                Les bars participants seront bientôt annoncés.
              </p>

              <div class="space-y-3">
                <div
                  v-for="bar in ev.bars"
                  :key="bar.eventBarId"
                  class="overflow-hidden rounded-2xl border border-ink/10"
                >
                  <button
                    type="button"
                    class="flex w-full items-center justify-between gap-3 bg-cream px-4 py-3 text-left transition hover:bg-brand-50"
                    :aria-expanded="ev.activeBarId === bar.eventBarId"
                    :aria-controls="`bar-${ev.id}-${bar.eventBarId}`"
                    @click="toggleBar(ev, bar)"
                  >
                    <span class="flex flex-wrap items-center gap-2">
                      <span class="font-bold">{{ capitalize(bar.name) }}</span>

                      <span
                        v-if="bar.is_starting_bar"
                        class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800"
                      >
                        <FlagIcon class="h-3.5 w-3.5" aria-hidden="true" />
                        Départ
                      </span>

                      <span
                        v-if="bar.is_after_party"
                        class="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-bold text-brand-800"
                      >
                        <MoonIcon class="h-3.5 w-3.5" aria-hidden="true" />
                        After
                      </span>
                    </span>

                    <ChevronDownIcon
                      class="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200"
                      :class="{ 'rotate-180': ev.activeBarId === bar.eventBarId }"
                      aria-hidden="true"
                    />
                  </button>

                  <transition name="fade">
                    <div
                      v-if="ev.activeBarId === bar.eventBarId"
                      :id="`bar-${ev.id}-${bar.eventBarId}`"
                      class="space-y-6 bg-white p-4"
                    >
                      <!-- Image chargée uniquement à l'ouverture du bar -->
                      <div
                        v-if="bar.imageLoaded && bar.image_path"
                        class="flex h-64 items-center justify-center overflow-hidden rounded-xl bg-gray-100"
                      >
                        <img
                          :src="bar.image_path"
                          :alt="bar.name"
                          loading="lazy"
                          class="max-h-full max-w-full object-contain"
                          :class="{ 'max-h-[80%] max-w-[80%]': bar.image_path.endsWith('.svg') }"
                        />
                      </div>

                      <div v-if="bar.google_maps_link">
                        <iframe
                          :src="bar.google_maps_link"
                          width="100%"
                          height="220"
                          style="border: 0"
                          allowfullscreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                          :title="`Carte : ${bar.name}`"
                          class="rounded-xl"
                        ></iframe>
                      </div>

                      <p
                        v-if="ev.detailsLoading"
                        class="text-sm text-ink/60"
                        role="status"
                      >
                        Chargement des détails…
                      </p>

                      <!-- Boissons -->
                      <div v-if="bar.drinks.length > 0">
                        <h6 class="mb-3 flex items-center gap-2 font-display text-lg font-extrabold">
                          <CupSodaIcon class="h-5 w-5 text-brand-600" aria-hidden="true" />
                          Boissons
                        </h6>
                        <ul class="grid gap-2 md:grid-cols-2">
                          <li
                            v-for="drink in bar.drinks"
                            :key="drink.id"
                            class="flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-cream p-3"
                          >
                            <span class="font-medium">{{ capitalize(drink.name) }}</span>
                            <span class="font-bold text-emerald-700">
                              {{ formatPrice(drink.price) }}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <!-- Nourriture -->
                      <div v-if="bar.foods.length > 0">
                        <h6 class="mb-3 flex items-center gap-2 font-display text-lg font-extrabold">
                          <SandwichIcon class="h-5 w-5 text-amber-600" aria-hidden="true" />
                          Nourriture
                        </h6>
                        <ul class="grid gap-2 md:grid-cols-2">
                          <li
                            v-for="food in bar.foods"
                            :key="food.id"
                            class="flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-cream p-3"
                          >
                            <span class="font-medium">{{ capitalize(food.name) }}</span>
                            <span class="font-bold text-emerald-700">
                              {{ formatPrice(food.price) }}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <!-- Avantages -->
                      <div v-if="bar.benefits.length > 0">
                        <h6 class="mb-3 flex items-center gap-2 font-display text-lg font-extrabold">
                          <GiftIcon class="h-5 w-5 text-pink-500" aria-hidden="true" />
                          Avantages
                        </h6>
                        <ul class="flex flex-wrap gap-2">
                          <li
                            v-for="benefit in bar.benefits"
                            :key="benefit.id"
                            class="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900"
                          >
                            {{ capitalize(benefit.value) }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </transition>
        </article>
      </div>
    </template>

    <!-- Modal : plan du barathon -->
    <transition name="fade">
      <div
        v-if="mapEvent"
        class="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
        @click="mapEvent = null"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="map-dialog-title"
          class="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-ink/10 p-4">
            <h2 id="map-dialog-title" class="font-display text-xl font-extrabold">
              Plan du Barathon
            </h2>
            <button
              type="button"
              class="rounded-full p-2 text-ink/60 transition hover:bg-ink/5 hover:text-ink"
              aria-label="Fermer le plan"
              @click="mapEvent = null"
            >
              <XIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div class="p-4">
            <iframe
              v-if="mapEvent.map_embed_url"
              :src="mapEvent.map_embed_url"
              width="100%"
              height="480"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              title="Plan du barathon"
              class="rounded-xl"
            ></iframe>
            <p v-else class="text-center text-ink/60">Aucune carte disponible.</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import {
  ChevronDownIcon,
  FlagIcon,
  MoonIcon,
  CupSodaIcon,
  SandwichIcon,
  GiftIcon,
  MapPinIcon,
  XIcon,
} from "lucide-vue-next";

const supabase = useSupabaseClient();

const siteUrl = "https://www.mybarathon.fr";

// État
const events = ref([]);
const loading = ref(true);
const error = ref(null);
const activeTab = ref("upcoming");
const mapEvent = ref(null);
const today = ref("");

// Dates au format AAAA-MM-JJ pour comparer sans effet de fuseau horaire
const dateKey = (value) => String(value ?? "").slice(0, 10);
const parseDate = (value) => new Date(`${dateKey(value)}T12:00:00`);

const upcomingEvents = computed(() =>
  events.value
    .filter((ev) => dateKey(ev.event_date) >= today.value)
    .sort((a, b) => dateKey(a.event_date).localeCompare(dateKey(b.event_date)))
);

const pastEvents = computed(() =>
  events.value
    .filter((ev) => dateKey(ev.event_date) < today.value)
    .sort((a, b) => dateKey(b.event_date).localeCompare(dateKey(a.event_date)))
);

const tabs = computed(() => [
  { id: "upcoming", label: "À venir", count: upcomingEvents.value.length },
  { id: "past", label: "Passés", count: pastEvents.value.length },
]);

const visibleEvents = computed(() =>
  activeTab.value === "upcoming" ? upcomingEvents.value : pastEvents.value
);

const nextEventId = computed(() => upcomingEvents.value[0]?.id ?? null);

const startingBarsNames = (ev) =>
  ev.bars
    .filter((bar) => bar.is_starting_bar)
    .map((bar) => bar.name)
    .join(" / ");

// Récupère tous les événements actifs et leurs bars en deux requêtes
const fetchEvents = async () => {
  try {
    loading.value = true;
    error.value = null;
    today.value = new Date().toLocaleDateString("sv-SE", {
      timeZone: "Europe/Paris",
    });

    const { data: eventsData, error: eventsError } = await supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .order("event_date", { ascending: false });

    if (eventsError) throw eventsError;

    const list = eventsData || [];
    const barsByEvent = {};

    if (list.length > 0) {
      const { data: eventBars, error: barsError } = await supabase
        .from("event_bars")
        .select(
          `
          id,
          event_id,
          is_starting_bar,
          is_after_party,
          display_order,
          bars (
            id,
            name,
            google_maps_link,
            image_path
          )
        `
        )
        .in(
          "event_id",
          list.map((ev) => ev.id)
        )
        .order("display_order", { ascending: true });

      if (barsError) throw barsError;

      for (const eventBar of eventBars || []) {
        (barsByEvent[eventBar.event_id] ||= []).push({
          ...eventBar.bars,
          eventBarId: eventBar.id,
          is_starting_bar: eventBar.is_starting_bar,
          is_after_party: eventBar.is_after_party,
          display_order: eventBar.display_order,
          drinks: [],
          foods: [],
          benefits: [],
          imageLoaded: false, // lazy loading de l'image
        });
      }
    }

    events.value = list.map((ev) => ({
      ...ev,
      bars: barsByEvent[ev.id] || [],
      open: false,
      detailsLoaded: false,
      detailsLoading: false,
      activeBarId: null,
    }));

    if (upcomingEvents.value.length === 0 && pastEvents.value.length > 0) {
      activeTab.value = "past";
    }

    // Le prochain événement est ouvert par défaut
    if (upcomingEvents.value[0]) {
      await toggleEvent(upcomingEvents.value[0], true);
    }
  } catch (err) {
    console.error("Erreur lors du chargement des événements:", err);
    error.value = "Erreur lors du chargement des événements";
  } finally {
    loading.value = false;
  }
};

// Boissons, nourriture et avantages d'un événement, chargés à l'ouverture
const loadDetails = async (ev) => {
  if (ev.detailsLoaded || ev.detailsLoading) return;
  if (ev.bars.length === 0) {
    ev.detailsLoaded = true;
    return;
  }

  ev.detailsLoading = true;
  try {
    const ids = ev.bars.map((bar) => bar.eventBarId);
    const [drinks, foods, benefits] = await Promise.all([
      supabase.from("drinks").select("*").in("event_bar_id", ids).order("name"),
      supabase.from("foods").select("*").in("event_bar_id", ids).order("name"),
      supabase.from("benefits").select("*").in("event_bar_id", ids),
    ]);

    for (const bar of ev.bars) {
      bar.drinks = (drinks.data || []).filter((d) => d.event_bar_id === bar.eventBarId);
      bar.foods = (foods.data || []).filter((f) => f.event_bar_id === bar.eventBarId);
      bar.benefits = (benefits.data || []).filter((b) => b.event_bar_id === bar.eventBarId);
    }
    ev.detailsLoaded = true;
  } catch (err) {
    console.error("Erreur lors du chargement des détails:", err);
  } finally {
    ev.detailsLoading = false;
  }
};

const toggleEvent = async (ev, forceOpen = false) => {
  ev.open = forceOpen ? true : !ev.open;
  if (ev.open) await loadDetails(ev);
};

// Ouvre un bar et charge son image uniquement à ce moment
const toggleBar = (ev, bar) => {
  const wasActive = ev.activeBarId === bar.eventBarId;
  ev.activeBarId = wasActive ? null : bar.eventBarId;
  if (!wasActive) bar.imageLoaded = true;
};

// Fonctions utilitaires
const formatPrice = (price) => {
  if (typeof price === "number") {
    return `${price}€`;
  }
  if (typeof price === "string") {
    return price.includes("€") || price.includes("même prix")
      ? price
      : `${price}€`;
  }
  return price;
};

const capitalize = (s) => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const formatDate = (value) =>
  parseDate(value).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const dayOf = (value) => parseDate(value).getDate();

const monthShort = (value) =>
  parseDate(value)
    .toLocaleDateString("fr-FR", { month: "short" })
    .replace(".", "");

// SEO : données structurées pour les événements à venir
const eventSchema = (ev) => ({
  "@type": "Event",
  name: ev.name || "Barathon MyBarathon",
  startDate: dateKey(ev.event_date),
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  ...(ev.description ? { description: ev.description } : {}),
  location: {
    "@type": "Place",
    name: startingBarsNames(ev) || "Bars partenaires",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Strasbourg",
      addressCountry: "FR",
    },
  },
  organizer: { "@type": "Organization", name: "MyBarathon", url: `${siteUrl}/` },
  image: [`${siteUrl}/images/og-image.png`],
  url: `${siteUrl}/#evenements`,
});

useHead(() => ({
  script:
    upcomingEvents.value.length > 0
      ? [
          {
            key: "events-jsonld",
            type: "application/ld+json",
            innerHTML: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": upcomingEvents.value.map(eventSchema),
            }),
          },
        ]
      : [],
}));

// Modal : Échap pour fermer, et pas de défilement de la page derrière
const onKeydown = (event) => {
  if (event.key === "Escape") mapEvent.value = null;
};

watch(mapEvent, (value) => {
  document.body.style.overflow = value ? "hidden" : "";
});

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  fetchEvents();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>
