<template>
    <div class="content">
      <h1 class="centered w3-padding-16"><b>Règles</b></h1>
      <h4 class="centered"> Les 10 commandements du Beer Pong</h4>
      <ol class="rules">
        <li> Chaque joueur d'une équipe lance 1 balle. Quand tous les joueurs d'une équipe ont joué, on passe à l'équipe suivante. </li>
        <li> Si la balle rentre directement dans 1 gobelet, on retire 1 verre.  </li>
        <li> Si la balle rentre dans un gobelet avec un rebond, on retire 2 verres. </li>
        <li> Si 2 balles rentrent dans le même gobelet, on retire 3 verres (on ajoute +1 pour chaque balle rentrée avec rebond). </li>
        <li> Si 3 balles rentrent dans le même gobelet : game over la partie s'arrête, vous avez gagné. </li>
        <li> On peut défendre ses verres dès que la balle fait un rebond (en cas de défense illégale on retire un verre). </li>
        <li> On peut souffler dans le verre tant que la balle n'a pas touché l'eau. </li>
        <li> Si la balle revient vers nous sur la table, on peut s'en saisir dans notre moitié et la relancé en réalisant une figure. </li>
        <li> Si tous les membres d'une équipe marquent sur leur tour alors l'équipe rejoue. </li>
        <li> Si lors d'un lancer la balle ne touche rien (ni table, ni gobelet) c'est un airball, le tireur retire un verre. </li>
      </ol>
    </div>
</template>

<style>
ol.rules{
        font: italic 20px Georgia, Times, serif;
        padding-bottom: 10px;
        padding-top: 5px;
        line-height: 30px;
}
ol.rules li{
  padding-bottom: 12px;
}
</style>