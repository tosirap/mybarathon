<template>
  <div>
    <ClientOnly>
      <Analytics />
    </ClientOnly>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import Analytics from "@vercel/analytics";
</script>
