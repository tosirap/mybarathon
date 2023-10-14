<template>
    <div class="content" >
      <h1 class="centered"  style="padding-bottom: 24px;"><b>Billeterie</b></h1>
        <div class="billeterie">
          <a 
            title="Vente de billets en ligne" 
            href="https://www.billetweb.fr/shop.php?event=barathon2" 
            class="shop_frame"  
            target="_blank"  
            data-src="https://www.billetweb.fr/shop.php?event=barathon2"  
            data-max-width="100%"  
            data-initial-height="600" 
            data-scrolling="no"  
            data-id="barathon2"  
            data-resize="1"
          >
          Vente de billets en ligne</a>
          <p class="centered">Après 22H les billets non récupérés sont revendus ssur place pour 10€</p>
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