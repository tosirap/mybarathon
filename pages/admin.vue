<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3">
            <h1 class="text-2xl font-bold text-gray-900">
              🍺 MyBarathon Admin
            </h1>
          </div>

          <!-- Bouton déconnexion si connecté -->
          <button
            v-if="isLoggedIn"
            @click="handleLogout"
            class="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOutIcon class="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Formulaire de connexion si pas connecté -->
      <LoginForm v-if="!isLoggedIn" @login-success="handleLoginSuccess" />

      <!-- Interface admin si connecté et admin -->
      <div v-else-if="isAdmin">
        <!-- Sélecteur d'événement -->
        <EventSelector
          v-model="selectedEventId"
          @create-new="handleCreateNewEvent"
        />

        <!-- Éditeur d'événement -->
        <EventEditor
          v-if="selectedEventId"
          :event-id="selectedEventId"
          :is-new-event="isNewEvent"
          @saved="handleEventSaved"
        />
      </div>

      <!-- Message si connecté mais pas admin -->
      <div
        v-else
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      >
        <p class="text-red-800 font-medium">
          ⛔ Vous n'avez pas les droits d'administrateur
        </p>
        <button
          @click="handleLogout"
          class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Se déconnecter
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { LogOutIcon } from "lucide-vue-next";
import LoginForm from "@/components/admin/LoginForm.vue";
import EventSelector from "@/components/admin/EventSelector.vue";
import EventEditor from "@/components/admin/EventEditor.vue";

const supabase = useSupabaseClient();

// État local (on ne dépend plus de useSupabaseUser())
const isLoggedIn = ref(false);
const isAdmin = ref(false);
const selectedEventId = ref(null);
const isNewEvent = ref(false);

// Vérifier si déjà connecté au chargement
const checkInitialAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    console.log("✅ Session existante:", session.user.id);
    isLoggedIn.value = true;
    
    // Vérifier si admin
    const { data: adminData } = await supabase
      .from("admins")
      .select("*")
      .eq("user_id", session.user.id);
    
    isAdmin.value = adminData && adminData.length > 0;
    console.log("🔍 Est admin:", isAdmin.value);
  } else {
    console.log("❌ Pas de session");
    isLoggedIn.value = false;
    isAdmin.value = false;
  }
};

// Gérer la connexion réussie
const handleLoginSuccess = (loginData) => {
  console.log("🎉 Login success:", loginData);
  isLoggedIn.value = true;
  isAdmin.value = loginData.isAdmin;
};

// Déconnexion
const handleLogout = async () => {
  await supabase.auth.signOut();
  isLoggedIn.value = false;
  isAdmin.value = false;
  selectedEventId.value = null;
};

// Créer un nouvel événement
const handleCreateNewEvent = () => {
  selectedEventId.value = "new";
  isNewEvent.value = true;
};

// Événement sauvegardé
const handleEventSaved = (eventId) => {
  selectedEventId.value = eventId;
  isNewEvent.value = false;
};

// Vérifier l'auth au montage
onMounted(() => {
  checkInitialAuth();
});
</script>
