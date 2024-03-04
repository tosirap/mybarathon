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
    <BarathonConcept :nbBar="listBar.length"/>
  </div>

  <div class="w3-panel background-panel w3-padding-64" id="bars">
    <div class="content" >
      <h1 class="centered"  style="padding-bottom: 24px;"><b>Liste des bars</b></h1>
      <ul class="flatten-list-ul">
        <li v-for="(bar, index) in listBar" :class="isDesktop ? 'flatten-list-li-desktop' : 'flatten-list-li-mobile'">
          <a :href="(bar != null && bar.link != null) ? bar.link : ''" class="bar-name"> {{ (bar != null && bar.name != null) ? bar.name : "" }} </a> 
          <i v-if="index < listBar.length-1" :class="isDesktop ? 'flatten-list-li-dot' : 'flatten-list-li-dot-mobile'"> &#x2022 </i>
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

  let listBar = [
    {
      name: "Barberousse",
      link: "https://www.google.com/maps/place/Bar+Barberousse+Strasbourg/@48.5833789,7.7485925,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c853f85e36d5:0x81e07432a30c96a7!8m2!3d48.5833755!4d7.7534634!16s%2Fg%2F11c6_n44y4?entry=ttu"
    },
    {
      name: "WAWA",
      link: "https://www.google.com/maps/place/Wawa+Music+%26+Food/@48.5811945,7.7621825,15z/data=!4m6!3m5!1s0x4796c8ff02a99a57:0x67cef509666e2072!8m2!3d48.5811945!4d7.7621825!16s%2Fg%2F1ptxg2z3q?entry=ttu"
    },
    {
      name: "Jimmy's",
      link: "https://www.google.com/maps/place/Jimmy's+Bar/@48.5809347,7.7495472,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c854f35d0057:0x6df65a0cc849055!8m2!3d48.5809313!4d7.7544181!16s%2Fg%2F1th27bgr?entry=ttu"
    },
    {
      name: "Happy Hours",
      link: "https://www.google.com/maps/place/Happy+Hours+-+Bar+Krutenau+Strasbourg/@48.5791832,7.7602776,15z/data=!4m2!3m1!1s0x0:0xb9ea22c77b00c0e?sa=X&ved=2ahUKEwiUj87E-M2BAxW0U6QEHaAxDO0Q_BJ6BAhhEAA&ved=2ahUKEwiUj87E-M2BAxW0U6QEHaAxDO0Q_BJ6BAh-EAg"
    },
    {
      name: "Algorythme",
      link: "https://www.google.com/maps/place/BAR+ALGORYTHME/@48.5787635,7.7562891,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c8ffe3a73db3:0xd1025e9238635ff7!8m2!3d48.57876!4d7.758864!16s%2Fg%2F11c5zyl72z?entry=ttu"
    },
    {
      name: "Kooma",
      link: "https://www.google.com/maps/place/Brasserie+Kooma/@48.5812831,7.7556259,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c9c021b3be0d:0xcbad4294ff252740!8m2!3d48.5812796!4d7.7582008!16s%2Fg%2F11vjrrn3xj?entry=ttu"
    },
    {
      name: "21 shooter bar",
      link: "https://www.google.com/maps/place/Le+21+ShooterBar/@48.5804462,7.755008,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c85572bd96ed:0xed05be5911efbfad!8m2!3d48.5804427!4d7.7575829!16s%2Fg%2F11b781b451?entry=ttu"
    },
    {
      name: "Tamil",
      link: "https://www.google.com/maps/place/Restaurant+Tamil/@48.5789279,7.7520696,16z/data=!3m1!5s0x4796c84d57e20c77:0x3fa08421bf3a6579!4m6!3m5!1s0x4796c931101717cd:0xa4c4b7ed54df5182!8m2!3d48.5799053!4d7.7463184!16s%2Fg%2F11fq9knwxp?entry=ttu"
    },
    {
      name: "Starling Burgers",
      link: "https://www.google.com/maps/place/Starling+Burgers/@48.5831214,7.7404499,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c97c3dfe855b:0x627b045436e9af38!8m2!3d48.5831179!4d7.7430248!16s%2Fg%2F11sdbfx9f1?entry=ttu"
    },
    {
      name: "Blue Moon",
      link: "https://www.google.com/maps/place/Blue+Moon+Bar/@48.580644,7.7596661,15z/data=!4m2!3m1!1s0x0:0xb93338379b5ab11?sa=X&ved=2ahUKEwjG3t-DvruBAxVZV6QEHQFSBawQ_BJ6BAhUEAA&ved=2ahUKEwjG3t-DvruBAxVZV6QEHQFSBawQ_BJ6BAhsEAg"
    },
  ];


const isDesktop = ref(false); // Initialize as false

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768;
};

onMounted(() => {
  if (process.client) {
    isDesktop.value = window.innerWidth >= 768;
    window.addEventListener('resize', handleResize);
  }
  //listBar = barList;
  //console.log(listBar)
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', handleResize);
  }
});
</script>

<style>
  @import url("~/assets/css/common.css");
</style>