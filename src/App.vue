<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoginView from './views/LoginView.vue';
import { RouterView } from 'vue-router'
import { useAppStore } from './stores/app'

const app = useAppStore()
const loading = ref(true)

onMounted(async() => {
  await app.initApp()
  loading.value = false
})
</script>

<template>
  <RouterView v-if="!loading && app.session" />
  <LoginView v-if="!loading && !app.session" />
</template>
