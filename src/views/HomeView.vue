<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useAppStore } from '@/stores/app'
import { useCardsStore } from '@/stores/cards'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

const cardsStore = useCardsStore()
const appStore = useAppStore()
const router = useRouter()

const creating = ref(false)
const cards = ref(cardsStore.cards)

const cardImageMap = ref(new Map())

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

onBeforeMount(async () => {
  const calls = []
  for (const [id, card] of cards.value) {
    if (card.full_img) {
      const prom = new Promise((resolve) => {
        supabase.storage
          .from('card-img')
          .download(card.full_img)
          .then(({ data }) => {
            if (data) cardImageMap.value.set(id, URL.createObjectURL(data))
            resolve(data)
          })
      })
      calls.push(prom)
    }
  }
  await Promise.all(calls)
})
</script>

<template>
  <main>
    <h1>Cards</h1>

    <RouterLink
      v-for="[id, card] of cards"
      :key="id"
      class="card-link"
      :to="{ name: 'card', params: { id }}"
    >
      <div>{{ card.title }} ({{ id }})</div>
      <img
        v-if="card.full_img"
        class="card-full-img"
        :src="cardImageMap.get(id)"
      >
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

.card-full-img {
  max-height: 10rem;
}
</style>
