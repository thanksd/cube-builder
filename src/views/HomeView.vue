<script setup lang="ts">
import MagicCard from '../components/MagicCard.vue'
</script>

<template>
  <main>
    <section>
      <MagicCard></MagicCard>
    </section>
    <section>Here goes the config</section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
}
</style>
