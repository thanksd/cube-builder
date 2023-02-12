<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from './stores/app'

const loading = ref(true)
const { initApp } = useAppStore()

onMounted(async() => {
  await initApp()
  loading.value = false
})
</script>

<template>
  <RouterView v-show="!loading" />
</template>
