<template>
  <homePage></homePage>
</template>

<script setup>
import homePage from './components/homePage.vue'

import { provide } from 'vue'

provide('host',window.location.host)
provide('userId',window.location.search.slice(1,window.location.search.length))



console.log(window.location.host);
console.log(window.location.search.slice(1,window.location.search.length));
</script>

<style scoped>

</style>
