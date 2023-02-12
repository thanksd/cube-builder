<script setup lang="ts">
import { useCardStore } from '../stores/card'

const { card } = useCardStore();
</script>

<template>
  <div class="config-panel">
    <h1>Config Panel</h1>
    <hr>

    <div class="config-panel__body">
      <label>
        <div>Title</div>
        <input v-model="card.title">
      </label>

      <label>
        <div>Image Url</div>
        <input v-model="card.img">
      </label>

      <label>
        <div>Type</div>
        <input v-model="card.type">
      </label>

      <label>
        <div>Rules Text</div>
        <textarea
          v-model="card.rules"
          rows="6"
        />
      </label>

      <label>
        <div>Author</div>
        <input v-model="card.author">
      </label>
    </div>
  </div>
</template>

<style scoped>
.config-panel {
  position: relative;
  height: 100%;
  font-size: 1rem;
  font-family: monospace;
}

.config-panel__body {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 1em;
}

h1 {
  font-size: 1.8em;
}

label {
  display: flex;
  flex-direction: column;
}
</style>
