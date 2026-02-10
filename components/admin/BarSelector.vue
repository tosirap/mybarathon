<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    @click="$emit('close')"
  >
    <div
      @click.stop
      class="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-900">Ajouter un bar</h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          <XIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex border-b">
        <button
          @click="activeTab = 'existing'"
          :class="[
            'flex-1 px-6 py-3 font-medium transition-colors',
            activeTab === 'existing'
              ? 'border-b-2 border-orange-500 text-orange-600'
              : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          Bars existants
        </button>
        <button
          @click="activeTab = 'new'"
          :class="[
            'flex-1 px-6 py-3 font-medium transition-colors',
            activeTab === 'new'
              ? 'border-b-2 border-orange-500 text-orange-600'
              : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          Créer un nouveau bar
        </button>
      </div>

      <!-- Contenu -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Tab: Bars existants -->
        <div v-if="activeTab === 'existing'">
          <!-- Recherche -->
          <div class="mb-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un bar..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <!-- Liste des bars disponibles -->
          <div v-if="loading" class="text-center py-8">
            <p class="text-gray-600">Chargement...</p>
          </div>

          <div v-else-if="filteredBars.length === 0" class="text-center py-8">
            <p class="text-gray-600">Aucun bar disponible</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              v-for="bar in filteredBars"
              :key="bar.id"
              @click="addExistingBar(bar.id)"
              :disabled="addingBarId === bar.id"
              class="p-4 border-2 border-gray-200 rounded-lg text-left hover:border-orange-500 hover:bg-orange-50 transition-all disabled:opacity-50"
            >
              <h3 class="font-semibold text-gray-900">{{ bar.name }}</h3>
              <p class="text-sm text-gray-600 mt-1 truncate">
                {{ bar.google_maps_link.substring(0, 50) }}...
              </p>
            </button>
          </div>
        </div>

        <!-- Tab: Nouveau bar -->
        <div v-if="activeTab === 'new'">
          <BarForm @bar-created="handleBarCreated" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { XIcon } from "lucide-vue-next";
import BarForm from "./BarForm.vue";

const props = defineProps({
  eventId: {
    type: Number,
    required: true,
  },
  existingBarIds: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close", "bar-added"]);

const supabase = useSupabaseClient();

const activeTab = ref("existing");
const loading = ref(true);
const allBars = ref([]);
const searchQuery = ref("");
const addingBarId = ref(null);

// Bars filtrés (excluant ceux déjà dans l'événement)
const availableBars = computed(() => {
  return allBars.value.filter(
    (bar) => !props.existingBarIds.includes(bar.id)
  );
});

// Recherche
const filteredBars = computed(() => {
  if (!searchQuery.value) return availableBars.value;

  const query = searchQuery.value.toLowerCase();
  return availableBars.value.filter((bar) =>
    bar.name.toLowerCase().includes(query)
  );
});

// Charger tous les bars
const loadBars = async () => {
  loading.value = true;
  const { data } = await supabase
    .from("bars")
    .select("*")
    .order("name");

  allBars.value = data || [];
  loading.value = false;
};

// Ajouter un bar existant
const addExistingBar = async (barId) => {
  addingBarId.value = barId;

  try {
    const { error } = await supabase.from("event_bars").insert([
      {
        event_id: props.eventId,
        bar_id: barId,
        is_starting_bar: false,
        is_after_party: false,
        display_order: props.existingBarIds.length,
      },
    ]);

    if (error) throw error;

    emit("bar-added");
  } catch (err) {
    console.error("Erreur lors de l'ajout:", err);
  } finally {
    addingBarId.value = null;
  }
};

// Bar créé
const handleBarCreated = async (barId) => {
  await addExistingBar(barId);
};

onMounted(() => {
  loadBars();
});
</script>
