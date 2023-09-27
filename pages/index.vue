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
    <BarathonConcept :listeBar="listeBar"/>
  </div>

  <div class="w3-panel background-panel w3-padding-64" id="bars">
    <div class="content" >
      <h1 class="centered"  style="padding-bottom: 24px;"><b>Liste des bars</b></h1>
      <ul class="flatten-list-ul">
        <li v-for="(bar, index) in listeBar" :class="isDesktop ? 'flatten-list-li-desktop' : 'flatten-list-li-mobile'">
          <a :href="bar.link" class="bar-name"> {{ bar.name }} </a> 
          <i v-if="index < listeBar.length-1" :class="isDesktop ? 'flatten-list-li-dot' : 'flatten-list-li-dot-mobile'"> . </i>
        </li>
      </ul>
    </div>
  </div>

  <!-- Billeterie -->
  <div class="w3-panel w3-padding-64" id="billeterie">
    <BarathonBilleterie/>
  </div>

  <div class="w3-panel background-panel w3-padding-64" id="instagram">
    <div class="content">
     <h1 class="centered" style="padding-bottom: 32px;"><b>Notre instagram</b></h1>
       <!-- TODO integrate carousel + 3 last post -->

        <div class="w3-center">
          <img src="~/assets/images/instagram_icon.png" class="w3-round" alt="Lots" style="width:20%">
          <p style="padding-top: 16px;">
            <a href="https://www.instagram.com/mybarathon/" style="font-size: 18px; font-weight: 600; "> Suivez nous sur Instagram ! </a> 
          </p>
        </div>
    </div>
  </div>

  <!-- Contact -->
  
  
  <!-- todo later
    <div class="w3-center w3-padding-64" id="contact">
    <span class="w3-xlarge w3-bottombar w3-border-dark-grey w3-padding-16">Contact Us</span>
  </div>
  <BarathonContact/>
-->

  
</div>

<!-- Footer -->

<footer class="w3-container w3-padding-32 w3-light-grey w3-center">
  <a href="#" class="w3-button w3-black w3-margin"><i class="fa fa-arrow-up w3-margin-right"></i>To the top</a>
  <div class="w3-xxlarge w3-section">
    <a href="https://www.instagram.com/mybarathon" target="_blank"><i class="fa fa-instagram w3-hover-opacity" style="margin-right: 32px;"></i></a>
    <a href="https://www.facebook.com/MyBarathon" target="_blank"><i class="fa fa-facebook-official w3-hover-opacity"></i></a>
  </div>
  <p>MyBarathon 2023 © Tout droits réservés</p>
</footer>

    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

    useSeoMeta({
      title: 'MyBarathon',
      ogTitle: 'MyBarathon',
      description: 'Site proposant des évènement de type barathons pour le compte de MyBarathon. MyBarathon.. My barathon. Barathon Strasbourg.',
      ogDescription: 'Site proposant des évènement de type barathons pour le compte de MyBarathon. MyBarathon.. My barathon. Barathon Strasbourg.'
    })

    const listeBar = [
      {
        name: "Blue Moon",
        link: "https://www.google.com/maps/place/Blue+Moon+Bar/@48.580644,7.7596661,15z/data=!4m2!3m1!1s0x0:0xb93338379b5ab11?sa=X&ved=2ahUKEwjG3t-DvruBAxVZV6QEHQFSBawQ_BJ6BAhUEAA&ved=2ahUKEwjG3t-DvruBAxVZV6QEHQFSBawQ_BJ6BAhsEAg"
      },
      {
        name: "WAWA",
        link: "https://www.google.com/maps/place/Wawa+Music+%26+Food/@48.5811945,7.7621825,15z/data=!4m6!3m5!1s0x4796c8ff02a99a57:0x67cef509666e2072!8m2!3d48.5811945!4d7.7621825!16s%2Fg%2F1ptxg2z3q?entry=ttu"
      },
      {
        name: "Tamil",
        link: "https://www.google.com/maps/place/Restaurant+Tamil/@48.5789279,7.7520696,16z/data=!3m1!5s0x4796c84d57e20c77:0x3fa08421bf3a6579!4m6!3m5!1s0x4796c931101717cd:0xa4c4b7ed54df5182!8m2!3d48.5799053!4d7.7463184!16s%2Fg%2F11fq9knwxp?entry=ttu"
      },
      {
        name: "Jimmy's",
        link: "https://www.google.com/maps/place/Jimmy's+Bar/@48.5809347,7.7495472,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c854f35d0057:0x6df65a0cc849055!8m2!3d48.5809313!4d7.7544181!16s%2Fg%2F1th27bgr?entry=ttu"
      },
      {
        name: "Algorythme",
        link: "https://www.google.com/maps/place/BAR+ALGORYTHME/@48.5787635,7.7562891,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c8ffe3a73db3:0xd1025e9238635ff7!8m2!3d48.57876!4d7.758864!16s%2Fg%2F11c5zyl72z?entry=ttu"
      },
      {
        name: "Télégraphe",
        link: "https://www.google.com/maps/place/Brasserie+Au+T%C3%A9l%C3%A9graphe/@48.5790951,7.7540898,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c8fff75730e7:0xc0b48238e650c2c5!8m2!3d48.5790917!4d7.7589607!16s%2Fg%2F1vm79dj5?entry=ttu"
      },
      {
        name: "The People",
        link: "https://www.google.com/maps/place/The+People+-+Strasbourg/@48.5812647,7.7548254,17z/data=!4m9!3m8!1s0x4796c855a0e90db7:0xd5f66a5234d0c8f8!5m2!4m1!1i2!8m2!3d48.5812612!4d7.7574003!16s%2Fg%2F11lgks7_0c?entry=ttu"
      },
      {
        name: "Sacrilège",
        link: "https://www.google.com/maps/place/Sacril%C3%A8ge/@48.5794181,7.749555,17z/data=!3m2!4b1!5s0x4796c8534fdc2025:0x363d33df285d4bb0!4m6!3m5!1s0x4796c937110e027f:0x494c2dfea05bc71f!8m2!3d48.5794146!4d7.7521299!16s%2Fg%2F11sr7bbyx1?entry=ttu"
      },
      {
        name: "Trolleybus",
        link: "https://www.google.com/maps/place/Le+Trolleybus/@48.581891,7.7428837,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c84d9f94e3d5:0xbbfcefb4df29b8ae!8m2!3d48.5818875!4d7.7454586!16s%2Fg%2F1vqmh99p?entry=ttu"
      },
      {
        name: "Schloss",
        link: "https://www.google.com/maps/place/Brasserie+La+Schloss+-+Schlosserstub/@48.5806816,7.7444899,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c8529900979b:0x1a9e2c127751b72c!8m2!3d48.5806781!4d7.7470648!16s%2Fg%2F1q5blcjwl?entry=ttu"
      },
      {
        name: "Jeannette et les Cycleux",
        link: "https://www.google.com/maps/place/Jeannette+et+les+Cycleux/@48.5806816,7.7444899,17z/data=!4m6!3m5!1s0x4796c852ef2c1af7:0xd29bcea104b08510!8m2!3d48.5806997!4d7.7488189!16s%2Fg%2F1tdkqr87?entry=ttu"
      },
      {
        name: "Berthom",
        link: "https://www.google.com/maps/place/Les+BerThoM+Strasbourg/@48.5801999,7.7466393,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c852de9a82bb:0xf66dad79c0af2985!8m2!3d48.5801964!4d7.7492142!16s%2Fg%2F1v3kl_yv?entry=ttu"
      },
      {
        name: "Le tigre",
        link: "https://www.google.com/maps/place/Le+Petit+Tigre/@48.58236,7.7326598,17z/data=!3m2!4b1!5s0x4796c84baac57f97:0xb72572887a47ee2e!4m6!3m5!1s0x4796c99a318c4915:0x3f98de5997e656b2!8m2!3d48.5823566!4d7.7375307!16s%2Fg%2F11jpkgv4s1?entry=ttu"
      },
      {
        name: "Délirium",
        link: "https://www.google.com/maps/place/Delirium+Caf%C3%A9/@48.5846863,7.7398673,17z/data=!3m2!4b1!5s0x4796c84c1dbcb9b1:0x8cc95e51ca70bb93!4m6!3m5!1s0x4796c84c1d430bf1:0x6d86f9bc1635704d!8m2!3d48.5846828!4d7.7424422!16s%2Fg%2F11g9sx2l3b?entry=ttu"
      },
      {
        name: "Barberousse",
        link: "https://www.google.com/maps/place/Bar+Barberousse+Strasbourg/@48.5833789,7.7485925,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c853f85e36d5:0x81e07432a30c96a7!8m2!3d48.5833755!4d7.7534634!16s%2Fg%2F11c6_n44y4?entry=ttu"
      },
      {
        name: "21 shooter bar",
        link: "https://www.google.com/maps/place/Le+21+ShooterBar/@48.5804462,7.755008,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c85572bd96ed:0xed05be5911efbfad!8m2!3d48.5804427!4d7.7575829!16s%2Fg%2F11b781b451?entry=ttu"
      },
      {
        name: "Starling Burgers",
        link: "https://www.google.com/maps/place/Starling+Burgers/@48.5831214,7.7404499,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c97c3dfe855b:0x627b045436e9af38!8m2!3d48.5831179!4d7.7430248!16s%2Fg%2F11sdbfx9f1?entry=ttu"
      },
    ]


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

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', handleResize);
  }
});
</script>

<style>
  @import url("~/assets/css/common.css");
</style>