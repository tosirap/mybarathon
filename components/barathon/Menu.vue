<template>
    <div>
        <div class="w3-row w3-large w3-light-grey w3-padding">
            <div v-if="isDesktop">
                <div class="w3-col s1 centered">
                    <img src="~/assets/images/logo.png" alt="Logo mybarathon" style="width:25%">
                </div>
                
                <div class="w3-col s2">
                    <a href="#concept" class="w3-button w3-block">Concept</a>
                </div>
                <div class="w3-col s2">
                    <a href="#bars" class="w3-button w3-block">Liste des bars</a>
                </div>
                <div class="w3-col s2">
                    <a href="#billeterie" class="w3-button w3-block">Billeterie</a>
                </div>
                <div class="w3-col s2">
                    <a href="#instagram" class="w3-button w3-block">Notre Instagram</a>
                </div>
                <div class="w3-col s2">
                    <a href="/beerPong" class="w3-button w3-block w3-round" style="background-color: #eb9e2af6;">BeerPong -></a>
                </div>
            </div>
            <div v-else>
                <div class="w3-col s12">
                    <a href="#billeterie" class="w3-button w3-block">Billeterie</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isDesktop: Boolean,
 });
</script>
<style>
.billeterie-button{
    color: white;
    font-size: 20px;
    background-color: #684a8f;
    border-radius: 14px;
    border: none;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-right: 12px;
    padding-left: 12px;
    cursor: pointer;
}
</style>