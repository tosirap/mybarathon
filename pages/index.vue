<template>
  <div>
    <Head>
      <Title>MyBarathon</Title>
    </Head>
        <!-- Links (sit on top) -->
    <div class="w3-top">
      <BarathonMenu :isDesktop ="isDesktop"/>
    </div>

  <!-- Title -->
  <div >
    <div class="w3-panel background-panel centered w3-padding-64">
      <h1 style="padding-top: 24px"><b>MYBARATHON</b></h1>
      <h3>Toute ta ville en happy hours</h3>
      <button class="billeterie-button" style="margin-top: 1%;"
        onclick="location.href='#billeterie'"><b>Billeterie →</b></button>
    </div>

  <!-- Concept -->
  <div class="w3-panel w3-padding-32"  id="concept">
    <BarathonConcept :nbBar="barList.length"/>
  </div>

  <div class="w3-panel background-panel w3-padding-64" id="bars">
    <div class="content" >
      <h1 class="centered"  style="padding-bottom: 24px;"><b>Liste des bars</b></h1>
      <ul class="flatten-list-ul">
        <li v-for="(bar, index) in barList" :key="index" :class="isDesktop ? 'flatten-list-li-desktop' : 'flatten-list-li-mobile'">
          <a :href="(bar != null && bar.link != null) ? bar.link : ''" class="bar-name"> {{ (bar != null && bar.name != null) ? bar.name : "" }} </a> 
          <i v-if="index < barList.length-1" :class="isDesktop ? 'flatten-list-li-dot' : 'flatten-list-li-dot-mobile'"> &#x2022 </i>
        </li>
      </ul>
    </div>
  </div>

  <!-- Billeterie -->
  <div class="w3-panel w3-padding-64" id="billeterie">
    <BarathonBilleterie/>
  </div>
  <!-- Instagram -->
  <div class="w3-panel background-panel w3-padding-64" id="instagram">
    <Instagram/>
  </div>
</div>

<!-- Footer -->
<footer class="w3-container w3-padding-32 w3-light-grey w3-center">
  <Footer/>
</footer>

    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import barList from '../components/barathon/BarList';

  useSeoMeta({
    title: 'MyBarathon',
    ogTitle: 'MyBarathon',
    description: 'Organisateur de barathons et de bière pong géants sur Strasbourg.',
    ogDescription: 'Organisateur de barathons et de bière pong géants sur Strasbourg. MyBarathon. My barathon. Barathon Strasbourg. Grand Barathon. Evènement. Event Strasbourg. Alsace',
    ogImage: '/public/favicon.ico',
  })


const isDesktop = ref(false); // Initialize as false

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768;
};

onMounted(() => {
  if (process.client) {
    isDesktop.value = window.innerWidth >= 768;
    window.addEventListener('resize', handleResize);
  }
});

</script>

<style>
  @import url("~/assets/css/common.css");
</style>