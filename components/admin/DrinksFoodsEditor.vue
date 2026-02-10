<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    @click="$emit('close')"
  >
    <div
      @click.stop
      class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b bg-gray-50">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            {{ eventBar.bars.name }}
          </h2>
          <p class="text-sm text-gray-600 mt-1">
            Gérer les boissons, nourriture et avantages
          </p>
        </div>
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
          @click="activeTab = 'drinks'"
          :class="[
            'flex-1 px-6 py-3 font-medium transition-colors',
            activeTab === 'drinks'
              ? 'border-b-2 border-orange-500 text-orange-600'
              : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          🍺 Boissons ({{ drinks.length }})
        </button>
        <button
          @click="activeTab = 'foods'"
          :class="[
            'flex-1 px-6 py-3 font-medium transition-colors',
            activeTab === 'foods'
              ? 'border-b-2 border-orange-500 text-orange-600'
              : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          🍔 Nourriture ({{ foods.length }})
        </button>
        <button
          @click="activeTab = 'benefits'"
          :class="[
            'flex-1 px-6 py-3 font-medium transition-colors',
            activeTab === 'benefits'
              ? 'border-b-2 border-orange-500 text-orange-600'
              : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          🎁 Avantages ({{ benefits.length }})
        </button>
      </div>

      <!-- Contenu -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Tab Drinks -->
        <div v-if="activeTab === 'drinks'" class="space-y-6">
          <!-- Formulaire d'ajout -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3">
              Ajouter une boisson
            </h3>
            <form @submit.prevent="addDrink" class="flex items-end space-x-3">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  v-model="newDrink.name"
                  type="text"
                  required
                  placeholder="Blonde"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div class="w-40">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Prix
                </label>
                <input
                  v-model="newDrink.price"
                  type="text"
                  required
                  placeholder="5 ou -1€"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="submit"
                class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
              >
                Ajouter
              </button>
            </form>
          </div>

          <!-- Liste des drinks -->
          <div class="space-y-2">
            <div
              v-for="drink in drinks"
              :key="drink.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div class="flex items-center space-x-4 flex-1">
                <input
                  v-model="drink.name"
                  @blur="updateDrink(drink)"
                  type="text"
                  class="flex-1 px-3 py-1.5 border border-gray-300 rounded bg-white"
                />
                <input
                  v-model="drink.price"
                  @blur="updateDrink(drink)"
                  type="text"
                  class="w-32 px-3 py-1.5 border border-gray-300 rounded bg-white"
                />
              </div>
              <button
                @click="deleteDrink(drink.id)"
                class="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>

            <p
              v-if="drinks.length === 0"
              class="text-center py-8 text-gray-500"
            >
              Aucune boisson ajoutée
            </p>
          </div>
        </div>

        <!-- Tab Foods -->
        <div v-if="activeTab === 'foods'" class="space-y-6">
          <!-- Formulaire d'ajout -->
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3">
              Ajouter de la nourriture
            </h3>
            <form @submit.prevent="addFood" class="flex items-end space-x-3">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  v-model="newFood.name"
                  type="text"
                  required
                  placeholder="Naan cheese"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div class="w-40">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Prix
                </label>
                <input
                  v-model="newFood.price"
                  type="text"
                  required
                  placeholder="5"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="submit"
                class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              >
                Ajouter
              </button>
            </form>
          </div>

          <!-- Liste des foods -->
          <div class="space-y-2">
            <div
              v-for="food in foods"
              :key="food.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div class="flex items-center space-x-4 flex-1">
                <input
                  v-model="food.name"
                  @blur="updateFood(food)"
                  type="text"
                  class="flex-1 px-3 py-1.5 border border-gray-300 rounded bg-white"
                />
                <input
                  v-model="food.price"
                  @blur="updateFood(food)"
                  type="text"
                  class="w-32 px-3 py-1.5 border border-gray-300 rounded bg-white"
                />
              </div>
              <button
                @click="deleteFood(food.id)"
                class="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>

            <p
              v-if="foods.length === 0"
              class="text-center py-8 text-gray-500"
            >
              Aucune nourriture ajoutée
            </p>
          </div>
        </div>

        <!-- Tab Benefits -->
        <div v-if="activeTab === 'benefits'" class="space-y-6">
          <!-- Formulaire d'ajout -->
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3">
              Ajouter un avantage
            </h3>
            <form @submit.prevent="addBenefit" class="flex items-end space-x-3">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  v-model="newBenefit.value"
                  type="text"
                  required
                  placeholder="Entrée gratuite"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="submit"
                class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
              >
                Ajouter
              </button>
            </form>
          </div>

          <!-- Liste des benefits -->
          <div class="space-y-2">
            <div
              v-for="benefit in benefits"
              :key="benefit.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <input
                v-model="benefit.value"
                @blur="updateBenefit(benefit)"
                type="text"
                class="flex-1 px-3 py-1.5 border border-gray-300 rounded bg-white mr-3"
              />
              <button
                @click="deleteBenefit(benefit.id)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>

            <p
              v-if="benefits.length === 0"
              class="text-center py-8 text-gray-500"
            >
              Aucun avantage ajouté
            </p>
          </div>
        </div>

        <!-- Message d'édition -->
        <div
          v-if="editBarData"
          class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <h3 class="font-semibold text-gray-900 mb-3">
            Modifier les informations du bar
          </h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nom du bar
              </label>
              <input
                v-model="editBarData.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Lien Google Maps
              </label>
              <textarea
                v-model="editBarData.google_maps_link"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Chemin de l'image
              </label>
              <input
                v-model="editBarData.image_path"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              @click="saveBarInfo"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Sauvegarder les modifications du bar
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between p-6 border-t bg-gray-50">
        <button
          @click="toggleBarEdit"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {{ editBarData ? "Masquer" : "Modifier les infos du bar" }}
        </button>
        <button
          @click="handleClose"
          class="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { XIcon, TrashIcon } from "lucide-vue-next";

const props = defineProps({
  eventBar: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "updated"]);

const supabase = useSupabaseClient();

const activeTab = ref("drinks");
const drinks = ref([]);
const foods = ref([]);
const benefits = ref([]);
const editBarData = ref(null);

const newDrink = ref({ name: "", price: "" });
const newFood = ref({ name: "", price: "" });
const newBenefit = ref({ value: "" });

// Charger les données
const loadData = async () => {
  const [drinksRes, foodsRes, benefitsRes] = await Promise.all([
    supabase
      .from("drinks")
      .select("*")
      .eq("event_bar_id", props.eventBar.id)
      .order("name"),
    supabase
      .from("foods")
      .select("*")
      .eq("event_bar_id", props.eventBar.id)
      .order("name"),
    supabase
      .from("benefits")
      .select("*")
      .eq("event_bar_id", props.eventBar.id),
  ]);

  drinks.value = drinksRes.data || [];
  foods.value = foodsRes.data || [];
  benefits.value = benefitsRes.data || [];
};

// === DRINKS ===
const addDrink = async () => {
  const { data, error } = await supabase
    .from("drinks")
    .insert([
      {
        event_bar_id: props.eventBar.id,
        name: newDrink.value.name,
        price: newDrink.value.price,
      },
    ])
    .select()
    .single();

  if (!error) {
    drinks.value.push(data);
    newDrink.value = { name: "", price: "" };
  }
};

const updateDrink = async (drink) => {
  await supabase
    .from("drinks")
    .update({ name: drink.name, price: drink.price })
    .eq("id", drink.id);
};

const deleteDrink = async (id) => {
  if (!confirm("Supprimer cette boisson ?")) return;

  const { error } = await supabase.from("drinks").delete().eq("id", id);

  if (!error) {
    drinks.value = drinks.value.filter((d) => d.id !== id);
  }
};

// === FOODS ===
const addFood = async () => {
  const { data, error } = await supabase
    .from("foods")
    .insert([
      {
        event_bar_id: props.eventBar.id,
        name: newFood.value.name,
        price: newFood.value.price,
      },
    ])
    .select()
    .single();

  if (!error) {
    foods.value.push(data);
    newFood.value = { name: "", price: "" };
  }
};

const updateFood = async (food) => {
  await supabase
    .from("foods")
    .update({ name: food.name, price: food.price })
    .eq("id", food.id);
};

const deleteFood = async (id) => {
  if (!confirm("Supprimer cette nourriture ?")) return;

  const { error } = await supabase.from("foods").delete().eq("id", id);

  if (!error) {
    foods.value = foods.value.filter((f) => f.id !== id);
  }
};

// === BENEFITS ===
const addBenefit = async () => {
  const { data, error } = await supabase
    .from("benefits")
    .insert([
      {
        event_bar_id: props.eventBar.id,
        value: newBenefit.value.value,
      },
    ])
    .select()
    .single();

  if (!error) {
    benefits.value.push(data);
    newBenefit.value = { value: "" };
  }
};

const updateBenefit = async (benefit) => {
  await supabase
    .from("benefits")
    .update({ value: benefit.value })
    .eq("id", benefit.id);
};

const deleteBenefit = async (id) => {
  if (!confirm("Supprimer cet avantage ?")) return;

  const { error } = await supabase.from("benefits").delete().eq("id", id);

  if (!error) {
    benefits.value = benefits.value.filter((b) => b.id !== id);
  }
};

// === EDIT BAR INFO ===
const toggleBarEdit = () => {
  if (editBarData.value) {
    editBarData.value = null;
  } else {
    editBarData.value = { ...props.eventBar.bars };
  }
};

const saveBarInfo = async () => {
  const { error } = await supabase
    .from("bars")
    .update({
      name: editBarData.value.name,
      google_maps_link: editBarData.value.google_maps_link,
      image_path: editBarData.value.image_path,
    })
    .eq("id", props.eventBar.bars.id);

  if (!error) {
    alert("Informations du bar mises à jour !");
    editBarData.value = null;
  }
};

const handleClose = () => {
  emit("updated");
  emit("close");
};

onMounted(() => {
  loadData();
});
</script>
