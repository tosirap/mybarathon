<template>
    <div>
        <div class="w3-top">
          <BeerpongMenu :isDesktop ="isDesktop"/>
        </div>
        <!-- Title -->
        <div >
            <div class="w3-panel background-panel-beerpong centered w3-padding-64">
            <h1 style="padding-top: 24px"><b>MYBARATHON</b></h1>
            <h3>Beer Pong Géant</h3>
            <button class="billeterie-button" style="margin-top: 1%;"
                onclick="location.href='#billeterie'"><b>Billeterie →</b></button>
            </div>
        </div>
        <!-- Concept -->
        <div class="w3-panel w3-padding-32"  id="concept">
            <BeerpongConcept/>
        </div>

        <!-- Billeterie -->
        <div class="w3-panel background-panel-beerpong w3-padding-64" id="billeterie">
          <BeerpongBilleterie/>
        </div>


    </div>

</template>

<script setup>

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