<template>
    <div class="content" >
      <h1 class="centered"  style="padding-bottom: 24px;"><b>Billeterie</b></h1>
        <div class="billeterie" style="background-color: white;">
            <a
                title="Vente de billets en ligne"
                href="https://www.billetweb.fr/shop.php?event=tournois-beerpong-mybarathon"
                class="shop_frame"
                target="_blank"
                data-src="https://www.billetweb.fr/shop.php?event=tournois-beerpong-mybarathon"
                data-max-width="100%"
                data-initial-height="600"
                data-scrolling="no"
                data-id="tournois-beerpong-mybarathon"
                data-resize="1"
            >
            Vente de billets en ligne</a>
          <p class="centered"><strong>Aucune vente sur place</strong></p>
        </div>
    </div>
</template>


<script setup>

import { onMounted } from 'vue';


onMounted(() => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://www.billetweb.fr/js/export.js";
      document.body.appendChild(script);
});


</script>