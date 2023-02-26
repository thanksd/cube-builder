<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCardsStore } from '@/stores/cards'
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient'
import ImageUpload from '../ImageUpload.vue';

const cardsStore = useCardsStore()
const router = useRouter()

const card = ref(cardsStore.activeCard)
const saving = ref(false)
const deleting = ref(false)
const imgUrl = ref('')
const cardArtImgFile = ref()

async function onDelete() {
  if (!card.value) return;
  try {
    deleting.value = true
    await cardsStore.deleteCard({ id: card.value.id })
    router.push('/')
  } catch (error) {
    if (error instanceof Error) alert(error.message)
  } finally {
    deleting.value = false
  }
}

async function onUpdateFile(file: Blob) {
  cardArtImgFile.value = file
}

async function onSave() {
  if (!card.value) return;
  try {
    saving.value = true
    const file = cardArtImgFile.value
    if (file) await updateCardArtImage({ file })
    console.log({ id: card.value.id, data: card.value })
    await cardsStore.updateCard({ id: card.value.id, data: card.value })
  } catch (error) {
    if (error instanceof Error) alert(error.message)
  } finally {
    saving.value = false
  }
}

async function updateCardArtImage(params: { file: any }) {
  const { file } = params
  const fileExt = file.name.split('.').pop()
  const filePath = `${Math.random()}.${fileExt}`

  let { error: uploadError } = await supabase
    .storage
    .from('card-art')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  if (card.value) card.value.img = filePath
}

watch(() => card.value, async (value) => {
  if (!value || !value.img) return
  const { data, error } = await supabase.storage.from('card-art').download(value.img)
  if (error) throw error
  imgUrl.value = URL.createObjectURL(data)
}, { immediate: true, deep: true })
</script>

<template>
  <div class="config-panel">
    <h1>Config Panel</h1>
    <hr>

    <div
      v-if="card"
      class="body"
    >
      <label>
        <div>Title</div>
        <input v-model="card.title">
      </label>

      <label>
        <div>Card Art (252x206)</div>
        <ImageUpload
          v-model:src="imgUrl"
          :img-width="252"
          :img-height="206"
          @update:file="onUpdateFile"
        />
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
      <button
        :disabled="saving"
        @click="onSave"
      >
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
