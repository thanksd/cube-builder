<script setup lang="ts">
import { useAppStore } from '@/stores/app';

const app = useAppStore()
</script>

<template>
  <nav>
    <RouterLink to="/">
      <h1>Cube Builder</h1>
    </RouterLink>

    <RouterLink
      class="router-link"
      :to="app.session ? 'profile' : 'login'"
    >
      {{ app.session ? 'profile' : 'login' }}
    </RouterLink>
  </nav>
</template>

<style scoped>
nav {
  font-size: 1rem;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 1.4em;
}

a {
  text-decoration: none;
  color: black;
}

.router-link {
  background-color: white;
  border: 1px solid black;
  padding: 0.4em 1em;
}
</style>
