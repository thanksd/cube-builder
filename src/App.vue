<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppNavbar from './components/Navbar/AppNavbar.vue';
import { useAppStore } from './stores/app'

const app = useAppStore()
const loading = ref(true)

onMounted(async() => {
  await app.initApp()
  loading.value = false
})
</script>

<template>
  <div id="app">
    <AppNavbar />
    <RouterView
      v-if="!loading"
      id="view"
    />
  </div>
</template>

<style scoped>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: monospace;
}

#view {
  flex: 1;
}

main {
  padding: 0 1rem;
}

h1 {
  font-size: 1.4rem;
}
</style>
