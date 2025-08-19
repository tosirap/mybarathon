<template>
  <div class="max-w-5xl mx-auto p-8">
    <h1 class="text-center text-2xl font-bold pb-6">Concept</h1>

    <!-- Texte -->
    <p class="text-base text-justify mb-4">
      Le Barathon est une liste de bars dans lesquels Mybarathon vous a négocié un tarif préférentiel. <br>
      Ceci vous permet de bénéficier d'Happy Hours ainsi que d'autres avantages jusqu'à la fermeture des établissements.
    </p>
    <p class="text-base text-justify mb-4">
      Pendant le Barathon déplacez-vous librement entre les bars de votre choix avec votre ecocup.
      Vous choisissez vous-même votre itinéraire !
    </p>

    <p class="font-semibold mb-2">Comment participer ?</p>
    <ul class="list-disc list-inside text-base text-justify mb-8">
      <li>Précommandez votre Ecocup sur notre billetterie</li>
      <li>Récupérez votre Ecocup le jeudi 20 mars, à partir de 19H au Wawa.</li>
      <li>Profitez de vos avantages le jour de l'événement !</li>
    </ul>

    <!-- Première ligne de panneaux -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-col items-center justify-center p-6 bg-[#f9e6ba] rounded-lg flex-1">
        <img src="~/assets/images/bars.png" alt="Bars" class="rounded w-1/3 mb-3">
        <p class="font-bold">{{ props.nbBar }} bars participants</p>
      </div>

      <div class="flex flex-col items-center justify-center p-6 bg-[#f2cd75] rounded-lg flex-1">
        <img src="~/assets/images/secours.png" alt="Secours" class="rounded w-1/3 mb-3">
        <p class="font-bold">Secours</p>
      </div>
    </div>

    <!-- Deuxième ligne de panneaux -->
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-col items-center justify-center p-6 bg-[#efc050] rounded-lg flex-1">
        <img src="~/assets/images/ecocup.png" alt="Ecocup" class="rounded w-1/3 mb-3">
        <p class="font-bold">Ecocup = pass</p>
      </div>

      <div class="flex flex-col items-center justify-center p-6 bg-[#f5d997] rounded-lg flex-1">
        <img src="~/assets/images/wawaBar.png" alt="Bar" class="rounded w-1/3 mb-3">
        <p class="font-bold">Départ au Wawa</p>
      </div>

      <!-- Variante goodies (décommenter si besoin) -->
      <!--
      <div class="flex flex-col items-center justify-center p-6 bg-[#f5d997] rounded-lg flex-1">
        <img src="~/assets/images/cadeau.png" alt="Lots" class="rounded w-1/3 mb-3">
        <p class="font-bold">1000€ de lots à gagner !</p>
      </div>
      -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  nbBar: Number
});
</script>
