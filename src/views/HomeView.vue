<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useCardsStore } from '@/stores/cards'
import { useRouter } from 'vue-router'

const cardsStore = useCardsStore()
const appStore = useAppStore()
const router = useRouter()

const creating = ref(false)
const cards = ref(cardsStore.cards)

async function onCreateClick() {
  creating.value = true
  try {
    const userId = appStore.profile.id
    const { id } = await cardsStore.createCard({ userId })
    router.push({ name: 'card', params: { id }})
  } catch (e: any) {
    if (e && e?.message) alert(e.message)
  } finally {
    creating.value = false
  }
}
</script>

<template>
  <main>
    <h1>Cards</h1>

    <RouterLink
      v-for="[id, card] of cards"
      :key="id"
      :to="{ name: 'card', params: { id }}"
    >
      {{ card.title }} ({{ id }})
    </RouterLink>

    <button
      v-if="appStore.session"
      :disabled="creating"
      @click="onCreateClick"
    >
      Create Card
    </button>
    <RouterLink
      v-else
      to="/login"
    >
      (login to create new cards)
    </RouterLink>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

button {
  max-width: 10em;
}
</style>
