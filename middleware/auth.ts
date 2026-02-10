export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // Si pas d'utilisateur connecté, rediriger vers login
  if (!user.value) {
    return;
  }

  // Vérifier si l'utilisateur est admin
  const { data: isAdmin } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', user.value.id)
    .single();

  // Si pas admin, rediriger vers l'accueil
  if (!isAdmin) {
    return navigateTo('/');
  }
});
