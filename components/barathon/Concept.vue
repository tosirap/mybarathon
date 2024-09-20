<template>
    <div class="content">
      <h1 class="centered w3-padding-16"><b>Concept</b></h1>
      <p class="concept-text">Le Barathon est une liste de bars dans lesquels Mybarathon vous a négocié un tarif préférentiel. <br>
        Ceci vous permet de bénéficier d'Happy Hours ainsi que d'autres avantages jusqu'à la fermeture des établissements. </p>
        <p class="concept-text">
          Pendant le Barathon déplacez-vous librement entre les bars de votre choix avec votre ecocup. Vous choisissez vous-même votre itinéraire !
        </p>
        <p> 
          Comment participer ?      
        </p>
        <ul class="concept-text">
          <li>Précommandez votre Ecocup sur notre billetterie</li>
          <li>Récupérez votre Ecocup le jeudi 10 octobre, à partir de 19H au Barco Latino, ou au Delirium Café.</li>
          <li>Profitez de vos avantages le jour de l'événement !</li>
        </ul>
      <div class="w3-row w3-container w3-padding-16" style="display: flex;">
        <div class="w3-col s5 w3-center w3-padding-16 concept-panel" style="background-color: #f9e6ba;">
          <img src="~/assets/images/bars.png" class="w3-round" alt="Bars" style="width:30%">
          <p><b>{{ props.nbBar }} bars participants</b></p>
        </div>
        <div class="w3-col s1 w3-center w3-padding-16"></div>
        <div class="w3-col s5 w3-center w3-padding-16 concept-panel" style="background-color: #f2cd75;">
          <img src="~/assets/images/secours.png" class="w3-round" alt="Secours" style="width:30%">
          <p><b>Secours</b></p>
        </div>
      </div>
      <div class="w3-row w3-container w3-padding-16" style="display: flex;">
        <div class="w3-col s5 w3-center w3-padding-16 concept-panel" style="background-color: #efc050;">
          <img src="~/assets/images/ecocup.png" class="w3-round" alt="Ecocup" style="width:30%">
          <p><b>Ecocup = pass</b></p>
        </div>
        <div class="w3-col s1 w3-center w3-padding-16"></div>
        <div class="w3-col s5 w3-center w3-padding-16 concept-panel" style="background-color: #f5d997;">
          <div style="display: flex; justify-content: space-around;">
            <img src="~/assets/images/barco-latino.svg" class="w3-round" alt="Barco Latino" style="width:35%">
            <img src="~/assets/images/delirium-cafe.svg" class="w3-round" alt="Delirium Café" style="width:35%">
          </div>
          <p><b>Départ au Barco Latino</b></p>
          <p><b>ou au Delirium Café !</b></p>
        </div>
        <!-- GOODIES A GAGNER
        <div class="w3-col s5 w3-center w3-padding-16 concept-panel" style="background-color: #f5d997;">
          <img src="~/assets/images/cadeau.png" class="w3-round" alt="Lots" style="width:30%">
          <p><b>1000€ de lots à gagner !</b></p>
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

<style>
.concept-text{
    font-size: 16px;
    text-align: justify;
}

.concept-panel{
    border-radius: 10px;
}

</style>