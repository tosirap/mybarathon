<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-600">Chargement de l'événement...</p>
    </div>

    <!-- Formulaire d'édition -->
    <div v-else>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">
        {{ isNewEvent ? "Créer un événement" : "Éditer l'événement" }}
      </h2>

      <!-- Informations de base -->
      <div class="space-y-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nom de l'événement -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nom de l'événement *
            </label>
            <input
              v-model="eventData.name"
              type="text"
              required
              placeholder="Barathon Mars 2026"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <!-- Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Date de l'événement *
            </label>
            <input
              v-model="eventData.event_date"
              type="date"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            v-model="eventData.description"
            rows="3"
            placeholder="Description de l'événement..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          ></textarea>
        </div>

        <!-- Événement actif -->
        <div class="flex items-center">
          <input
            id="is_active"
            v-model="eventData.is_active"
            type="checkbox"
            class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
          <label for="is_active" class="ml-2 text-sm font-medium text-gray-700">
            Événement actif (affiché sur le site)
          </label>
        </div>
      </div>

      <!-- Boutons de sauvegarde -->
      <div class="flex items-center justify-between mb-8 pb-6 border-b">
        <button
          @click="saveEventInfo"
          :disabled="saving"
          class="flex items-center space-x-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
        >
          <SaveIcon class="w-4 h-4" />
          <span>{{ saving ? "Enregistrement..." : "Enregistrer les infos" }}</span>
        </button>

        <div v-if="saveMessage" class="text-sm text-green-600 font-medium">
          {{ saveMessage }}
        </div>
      </div>

      <!-- Liste des bars de l'événement -->
      <div v-if="!isNewEvent && currentEventId">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-900">
            Bars participants ({{ eventBars.length }})
          </h3>
          <button
            @click="showBarSelector = true"
            class="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            <PlusIcon class="w-4 h-4" />
            <span>Ajouter un bar</span>
          </button>
        </div>

        <!-- Liste des bars -->
        <div class="space-y-4">
          <div
            v-for="(eventBar, index) in eventBars"
            :key="eventBar.id"
            class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h4 class="text-lg font-semibold text-gray-900">
                    {{ eventBar.bars.name }}
                  </h4>

                  <!-- Badges -->
                  <span
                    v-if="eventBar.is_starting_bar"
                    class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                  >
                    Bar de départ
                  </span>
                  <span
                    v-if="eventBar.is_after_party"
                    class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                  >
                    After
                  </span>
                </div>

                <!-- Options du bar -->
                <div class="flex items-center space-x-4 mb-3">
                  <label class="flex items-center">
                    <input
                      v-model="eventBar.is_starting_bar"
                      type="checkbox"
                      @change="updateEventBar(eventBar)"
                      class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Bar de départ</span>
                  </label>

                  <label class="flex items-center">
                    <input
                      v-model="eventBar.is_after_party"
                      type="checkbox"
                      @change="updateEventBar(eventBar)"
                      class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">After party</span>
                  </label>

                  <div class="flex items-center space-x-2">
                    <label class="text-sm text-gray-700">Ordre:</label>
                    <input
                      v-model.number="eventBar.display_order"
                      type="number"
                      min="0"
                      @change="updateEventBar(eventBar)"
                      class="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                <!-- Résumé drinks/foods/benefits -->
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                  <span>🍺 {{ eventBar.drinks?.length || 0 }} boissons</span>
                  <span>🍔 {{ eventBar.foods?.length || 0 }} foods</span>
                  <span>🎁 {{ eventBar.benefits?.length || 0 }} avantages</span>
                </div>

                <!-- Bouton éditer -->
                <button
                  @click="editBar(eventBar)"
                  class="mt-3 flex items-center space-x-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                >
                  <EditIcon class="w-4 h-4" />
                  <span>Éditer drinks/foods/benefits</span>
                </button>
              </div>

              <!-- Bouton supprimer -->
              <button
                @click="removeBar(eventBar.id)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Message si aucun bar -->
          <div
            v-if="eventBars.length === 0"
            class="text-center py-8 text-gray-600"
          >
            Aucun bar ajouté. Cliquez sur "Ajouter un bar" pour commencer.
          </div>
        </div>
      </div>

      <!-- Message pour nouvel événement -->
      <div
        v-else-if="isNewEvent"
        class="bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <p class="text-blue-800">
          💡 Enregistrez d'abord les informations de l'événement pour pouvoir ajouter des bars.
        </p>
      </div>
    </div>

    <!-- Modal: Sélecteur de bar -->
    <BarSelector
      v-if="showBarSelector"
      :event-id="currentEventId"
      :existing-bar-ids="existingBarIds"
      @close="showBarSelector = false"
      @bar-added="handleBarAdded"
    />

    <!-- Modal: Éditeur drinks/foods/benefits -->
    <DrinksFoodsEditor
      v-if="editingEventBar"
      :event-bar="editingEventBar"
      @close="editingEventBar = null"
      @updated="handleDrinksUpdated"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {
  SaveIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
} from "lucide-vue-next";
import BarSelector from "./BarSelector.vue";
import DrinksFoodsEditor from "./DrinksFoodsEditor.vue";

const props = defineProps({
  eventId: {
    type: [Number, String],
    required: true,
  },
  isNewEvent: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["saved"]);

const supabase = useSupabaseClient();

const loading = ref(true);
const saving = ref(false);
const saveMessage = ref("");
const currentEventId = ref(null);

const eventData = ref({
  name: "",
  event_date: "",
  description: "",
  is_active: false,
});

const eventBars = ref([]);
const showBarSelector = ref(false);
const editingEventBar = ref(null);

const existingBarIds = computed(() => {
  return eventBars.value.map((eb) => eb.bars.id);
});

// Charger l'événement
const loadEvent = async () => {
  if (props.isNewEvent) {
    loading.value = false;
    return;
  }

  loading.value = true;

  try {
    // Charger l'événement
    const { data: event } = await supabase
      .from("events")
      .select("*")
      .eq("id", props.eventId)
      .single();

    if (event) {
      eventData.value = { ...event };
      currentEventId.value = event.id;
      await loadEventBars();
    }
  } catch (err) {
    console.error("Erreur lors du chargement:", err);
  } finally {
    loading.value = false;
  }
};

// Charger les bars de l'événement
const loadEventBars = async () => {
  if (!currentEventId.value) return;

  const { data } = await supabase
    .from("event_bars")
    .select(`
      id,
      is_starting_bar,
      is_after_party,
      display_order,
      bars (
        id,
        name,
        google_maps_link,
        image_path
      )
    `)
    .eq("event_id", currentEventId.value)
    .order("display_order");

  // Charger drinks, foods, benefits pour chaque bar
  if (data) {
    const barsWithDetails = await Promise.all(
      data.map(async (eb) => {
        const [{ data: drinks }, { data: foods }, { data: benefits }] =
          await Promise.all([
            supabase.from("drinks").select("*").eq("event_bar_id", eb.id),
            supabase.from("foods").select("*").eq("event_bar_id", eb.id),
            supabase.from("benefits").select("*").eq("event_bar_id", eb.id),
          ]);

        return {
          ...eb,
          drinks: drinks || [],
          foods: foods || [],
          benefits: benefits || [],
        };
      })
    );

    eventBars.value = barsWithDetails;
  }
};

// Sauvegarder les infos de l'événement
const saveEventInfo = async () => {
  saving.value = true;
  saveMessage.value = "";

  try {
    if (props.isNewEvent) {
      // Créer un nouvel événement
      const { data, error } = await supabase
        .from("events")
        .insert([eventData.value])
        .select()
        .single();

      if (error) throw error;

      currentEventId.value = data.id;
      emit("saved", data.id);
      saveMessage.value = "✓ Événement créé avec succès !";
    } else {
      // Mettre à jour l'événement existant
      const { error } = await supabase
        .from("events")
        .update(eventData.value)
        .eq("id", props.eventId);

      if (error) throw error;

      saveMessage.value = "✓ Modifications enregistrées !";
    }

    setTimeout(() => {
      saveMessage.value = "";
    }, 3000);
  } catch (err) {
    console.error("Erreur lors de la sauvegarde:", err);
    saveMessage.value = "❌ Erreur lors de la sauvegarde";
  } finally {
    saving.value = false;
  }
};

// Mettre à jour un event_bar
const updateEventBar = async (eventBar) => {
  const { error } = await supabase
    .from("event_bars")
    .update({
      is_starting_bar: eventBar.is_starting_bar,
      is_after_party: eventBar.is_after_party,
      display_order: eventBar.display_order,
    })
    .eq("id", eventBar.id);

  if (error) {
    console.error("Erreur lors de la mise à jour:", error);
  }
};

// Supprimer un bar de l'événement
const removeBar = async (eventBarId) => {
  if (!confirm("Voulez-vous vraiment retirer ce bar de l'événement ?")) {
    return;
  }

  const { error } = await supabase
    .from("event_bars")
    .delete()
    .eq("id", eventBarId);

  if (!error) {
    await loadEventBars();
  }
};

// Éditer drinks/foods/benefits
const editBar = (eventBar) => {
  editingEventBar.value = eventBar;
};

// Bar ajouté
const handleBarAdded = () => {
  showBarSelector.value = false;
  loadEventBars();
};

// Drinks mis à jour
const handleDrinksUpdated = () => {
  editingEventBar.value = null;
  loadEventBars();
};

// Charger au montage
onMounted(() => {
  loadEvent();
});

// Recharger si l'événement change
watch(
  () => props.eventId,
  () => {
    loadEvent();
  }
);
</script>
