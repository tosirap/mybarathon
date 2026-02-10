<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">Sélectionner un événement</h2>
      <button
        @click="$emit('create-new')"
        class="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
      >
        <PlusIcon class="w-4 h-4" />
        <span>Nouvel événement</span>
      </button>
    </div>

    <!-- Liste des événements -->
    <div v-if="loading" class="text-center py-4">
      <p class="text-gray-600">Chargement...</p>
    </div>

    <div v-else-if="events.length === 0" class="text-center py-4">
      <p class="text-gray-600">Aucun événement trouvé</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="event in events"
        :key="event.id"
        @click="selectEvent(event.id)"
        :class="[
          'p-4 border-2 rounded-lg text-left transition-all',
          modelValue === event.id
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-200 hover:border-gray-300',
        ]"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">{{ event.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">
              {{ formatDate(event.event_date) }}
            </p>
          </div>
          <span
            v-if="event.is_active"
            class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
          >
            Actif
          </span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { PlusIcon } from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "create-new"]);

const supabase = useSupabaseClient();
const events = ref([]);
const loading = ref(true);

const fetchEvents = async () => {
  loading.value = true;
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });

  events.value = data || [];
  loading.value = false;
};

const selectEvent = (eventId) => {
  emit("update:modelValue", eventId);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

onMounted(() => {
  fetchEvents();
});
</script>
