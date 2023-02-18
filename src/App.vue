<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoginView from './views/LoginView.vue';
import { RouterView } from 'vue-router'
import { useAppStore } from './stores/app'

const { initApp, session } = useAppStore()
const loading = ref(true)

onMounted(async() => {
  await initApp()
  loading.value = false
})
</script>

<template>
  <RouterView v-if="!loading && session" />
  <LoginView v-if="!loading && !session" />
</template>
