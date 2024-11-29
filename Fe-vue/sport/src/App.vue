<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header />
  <main class="min-h-screen w-full h-fit">
    <router-view />
  </main>
  <Footer />
</template>

<style scoped></style>
