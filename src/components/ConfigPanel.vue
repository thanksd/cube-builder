<script setup lang="ts">
import { ref } from 'vue'
import type { Card } from '@/stores/cards'
import { useCardsStore } from '@/stores/cards'

const cardsStore = useCardsStore()

const props = defineProps({
  card: { type: Object as () => Card, required: true }
})

const card = ref(Object.assign({}, props.card))

async function onDelete() {
  cardsStore.deleteCard({ id: card.value.id })
}

async function onSave() {

}

</script>

<template>
  <div class="config-panel">
    <h1>Config Panel</h1>
    <hr>

    <div class="body">
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

    <footer>
      <button @click="onDelete">
        Delete
      </button>
      <button @click="onSave">
        Save
      </button>
    </footer>
  </div>
</template>

<style scoped>
.config-panel {
  position: relative;
  height: 100%;
  font-size: 1rem;
  font-family: monospace;
}

.body {
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
