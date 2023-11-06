<template>
    <div>
        <div class="w3-row w3-large w3-light-grey w3-padding">
            <div v-if="isDesktop">
                <div class="w3-col s1 centered">
                    <img src="~/assets/images/logo.png" alt="Logo mybarathon" style="width:25%">
                </div>
                <div class="w3-col s2">
                    <a href="#" class="w3-button w3-block">Home</a>
                </div>
                <div class="w3-col s2">
                    <a href="#concept" class="w3-button w3-block">Concept</a>
                </div>
                <div class="w3-col s2">
                    <a href="#billeterie" class="w3-button w3-block">Billeterie</a>
                </div>
                <div class="w3-col s2">
                    <a href="#instagram" class="w3-button w3-block">Notre Instagram</a>
                </div>
                <div class="w3-col s2">
                    <a href="/" class="w3-button w3-block w3-red w3-round">Barathon -></a>
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