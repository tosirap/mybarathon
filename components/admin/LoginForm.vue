<template>
  <div class="max-w-md mx-auto">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold text-center mb-6">Connexion Admin</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="admin@mybarathon.fr"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <!-- Mot de passe -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <!-- Message d'erreur persistant -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-sm text-red-800 font-medium">❌ {{ error }}</p>
        </div>

        <!-- Bouton de connexion -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          {{ loading ? "Connexion..." : "Se connecter" }}
        </button>
      </form>

      <!-- Debug info (à retirer en prod) -->
      <div v-if="debugInfo" class="mt-4 p-3 bg-gray-100 rounded text-xs font-mono">
        <p><strong>User ID:</strong> {{ debugInfo.userId }}</p>
        <p><strong>Admin check:</strong> {{ debugInfo.adminCheck }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const supabase = useSupabaseClient();
const emit = defineEmits(["login-success"]);

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);
const debugInfo = ref(null);

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = null;
    debugInfo.value = null;

    console.log("🔐 Tentative de connexion avec:", email.value);

    // 1. Connexion
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (loginError) {
      console.error("❌ Erreur de connexion:", loginError);
      throw new Error("Email ou mot de passe incorrect");
    }

    console.log("✅ Connexion réussie, user ID:", data.user.id);

    // 2. Vérifier si admin
    const { data: adminData, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("user_id", data.user.id);

    console.log("🔍 Résultat requête admins:", { adminData, adminError });

    // Debug info
    debugInfo.value = {
      userId: data.user.id,
      adminCheck: adminData ? `Trouvé ${adminData.length} entrée(s)` : "Aucune entrée",
    };

    if (adminError) {
      console.error("❌ Erreur lors de la vérification admin:", adminError);
      throw new Error("Erreur lors de la vérification des permissions");
    }

    if (!adminData || adminData.length === 0) {
      console.log("⛔ Utilisateur non admin, déconnexion...");
      await supabase.auth.signOut();
      throw new Error("Vous n'avez pas les droits d'administrateur");
    }

    console.log("✅ Utilisateur admin confirmé !");
    
    // ✨ CHANGEMENT ICI : passer l'user et les adminData
    emit("login-success", { user: data.user, isAdmin: true });

  } catch (err) {
    console.error("💥 Erreur complète:", err);
    error.value = err.message || "Erreur de connexion";
  } finally {
    loading.value = false;
  }
};
</script>
