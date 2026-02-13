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
          Bars existants ({{ availableBars.length }})
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

          <!-- Loading -->
          <div v-if="loading" class="text-center py-8">
            <p class="text-gray-600">Chargement...</p>
          </div>

          <!-- Aucun bar disponible -->
          <div v-else-if="filteredBars.length === 0" class="text-center py-8">
            <p class="text-gray-600">
              {{ searchQuery ? 'Aucun bar trouvé' : 'Tous les bars sont déjà ajoutés' }}
            </p>
          </div>

          <!-- Liste compacte des bars -->
          <div v-else class="space-y-2">
            <button
              v-for="bar in filteredBars"
              :key="bar.id"
              @click="addExistingBar(bar.id)"
              :disabled="addingBarId === bar.id"
              class="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg text-left hover:border-orange-500 hover:bg-orange-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="font-medium text-gray-900">{{ bar.name }}</span>
              <span class="text-sm text-gray-500">
                {{ addingBarId === bar.id ? 'Ajout...' : 'Ajouter' }}
              </span>
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
  
  const { data, error } = await supabase
    .from("bars")
    .select("id, name")
    .order("name");

  if (error) {
    console.error("❌ Erreur chargement bars:", error);
  } else {
    allBars.value = data || [];
    console.log(`✅ ${data.length} bars chargés`);
  }
  
  loading.value = false;
};

// 🆕 Récupérer le display_order maximum actuel
const getMaxDisplayOrder = async () => {
  const { data, error } = await supabase
    .from("event_bars")
    .select("display_order")
    .eq("event_id", props.eventId)
    .order("display_order", { ascending: false })
    .limit(1);

  if (error) {
    console.error("❌ Erreur récupération display_order:", error);
    return 0;
  }

  // Si aucun bar n'existe encore, retourner 0
  if (!data || data.length === 0) {
    return 0;
  }

  // Sinon retourner le max + 1
  return (data[0].display_order || 0) + 1;
};

// Ajouter un bar existant
const addExistingBar = async (barId) => {
  addingBarId.value = barId;

  try {
    // 🆕 Récupérer le prochain display_order
    const nextOrder = await getMaxDisplayOrder();

    const { error } = await supabase.from("event_bars").insert([
      {
        event_id: props.eventId,
        bar_id: barId,
        is_starting_bar: false,
        is_after_party: false,
        display_order: nextOrder, // 🆕 Utiliser le prochain ordre
      },
    ]);

    if (error) throw error;

    console.log(`✅ Bar ajouté avec display_order: ${nextOrder}`);
    emit("bar-added");
  } catch (err) {
    console.error("❌ Erreur lors de l'ajout:", err);
    alert(`Erreur: ${err.message}`);
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
