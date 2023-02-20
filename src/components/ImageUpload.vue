<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { supabase } from '../lib/supabaseClient'

const prop = defineProps({
  src: { type: String, default: '' },
  maxWidth: { type: Number, default: 0 },
  maxHeight: { type: Number, default: 0 }
})
const { src, maxWidth, maxHeight } = toRefs(prop)

const emit = defineEmits(['upload', 'update:src'])
const uploading = ref(false)
const showUpload = ref(false)
const resizedFile = ref()

const onFileInputChange = async (e: any) => {
  const file = e.target.files[0]
  const img = new Image()
  img.src = URL.createObjectURL(file)
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const maxW = maxWidth.value
    const maxH = maxHeight.value
    let { width, height } = img
    if (width > height) {
      if (maxW && width > maxW) {
        height *= maxW / width
        width = maxW
      }
    } else {
      if (maxH && height > maxH) {
        width *= maxH / height
        height = maxH
      }
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d')
    ctx?.drawImage(img, 0, 0, width, height)

    canvas.toBlob((blob) => {
      if (!blob) return
      resizedFile.value = new File([blob], file.name, {
        type: 'image/jpeg',
        lastModified: Date.now()
      })

      showUpload.value = true
      emit('update:src', URL.createObjectURL(resizedFile.value))
    }, 'image/jpeg', 0.9)
  }
}

const uploadAvatar = async () => {
  try {
    uploading.value = true

    const file = resizedFile.value
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

    if (uploadError) throw uploadError

    emit('upload', { filePath, file })
  } catch (error: any) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div>
    <div
      class="image-container"
      :style="{
        width: maxWidth ? `${maxWidth}px` : 'initial',
        height: maxHeight ? `${maxHeight}px` : 'initial'
      }"
    >
      <img
        v-if="src"
        :src="src"
        alt="Image preview"
      >
    </div>

    <input
      type="file"
      accept="image/*"
      :disabled="uploading"
      @change="onFileInputChange"
    >
    <button
      v-if="showUpload"
      @click="uploadAvatar"
    >
      Upload
    </button>
  </div>
</template>

<style scoped>
.image-container {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid rgba(0, 0, 0, 0.75);
  border-radius: 4px;
}

.image-container::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border: 100vh solid rgba(0, 0, 0, 0.75);
  border-radius: 100%;
}

img {
  position: relative;
}
</style>
