<script setup lang="ts">
import 'assets/main.scss'
import variables from 'assets/variables.module.scss';

const website = useWebsiteStore()

await callOnce(website.fetch)
</script>

<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: variables.colorPrimary,
      fontFamily: variables.fontFamily
    },
  }">
    <div class="container">
      <div class="header">
        <a-row>
          <a-col>
            <div class="logo">
              Жилфонд
            </div>
          </a-col>
        </a-row>
      </div>
      <main>
        <a-typography-title :level="1">
          {{ website.name }}
        </a-typography-title>
        <a-typography>
          {{ website.description }}
        </a-typography>
      </main>
    </div>
  </a-config-provider>
</template>