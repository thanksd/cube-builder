<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { supabase } from '../lib/supabaseClient'

const prop = defineProps({
  path: { type: String, default: '' }
})
const { path } = toRefs(prop)

const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path.value)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error: any) {
    console.error('Error downloading image: ', error.message)
  }
}

const uploadAvatar = async (e: any) => {
  files.value = e.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

    if (uploadError) throw uploadError
    emit('update:path', filePath)
    emit('upload')
  } catch (error: any) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}

watch(path, () => {
  if (path.value) downloadImage()
})
</script>

<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
    >

    <button>
      <label for="single">
        {{ uploading ? 'Uploading ...' : 'Choose File' }}
      </label>
      <input
        id="single"
        style="visibility: hidden; position: absolute"
        type="file"
        accept="image/*"
        :disabled="uploading"
        @change="uploadAvatar"
      >
    </button>
  </div>
</template>
