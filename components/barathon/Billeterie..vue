<template>
    <div class="content" >
      <h1 class="centered"  style="padding-bottom: 24px;"><b>Billeterie</b></h1>
        <div class="billeterie">
          <a
            title="Vente de billets en ligne"
            href="https://www.billetweb.fr/shop.php?event=grand-my-barathon-de-saint-patrick-2023-a-strasbourg-par-mybarathon"
            class="shop_frame"
            target="_blank"
            data-src="https://www.billetweb.fr/shop.php?event=grand-my-barathon-de-saint-patrick-2023-a-strasbourg-par-mybarathon"
            data-max-width="100%"
            data-initial-height="600"
            data-scrolling="no"
            data-id="grand-my-barathon-de-saint-patrick-2023-a-strasbourg-par-mybarathon"
            data-resize="1"
          >
            Vente de billets en ligne
          </a>
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