<script setup lang="ts">

const website = useWebsiteStore()

await callOnce(website.fetch)
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>