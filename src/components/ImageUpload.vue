<script setup lang="ts">
import { ref, toRefs } from 'vue'

const prop = defineProps({
  src: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  circleBorder: { type: Boolean, default: false },
  imgWidth: { type: Number, default: 0 },
  imgHeight: { type: Number, default: 0 }
})
const { src, disabled, imgWidth, imgHeight } = toRefs(prop)

const emit = defineEmits(['update:file', 'update:src'])
const resizedFile = ref()

const onFileInputChange = async (e: any) => {
  const file = e.target.files[0]
  const img = new Image()
  img.src = URL.createObjectURL(file)
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const maxW = imgWidth.value
    const maxH = imgHeight.value
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

      emit('update:src', URL.createObjectURL(resizedFile.value))
      emit('update:file', resizedFile.value)
    }, 'image/jpeg', 0.9)
  }
}
</script>

<template>
  <div
    class="image-upload"
    :class="{ 'has-circle-border': circleBorder }"
  >
    <div
      class="image-container"
      :style="{
        width: imgWidth ? `${imgWidth}px` : 'initial',
        height: imgHeight ? `${imgHeight}px` : 'initial'
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
      :disabled="disabled"
      @change="onFileInputChange"
    >
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
  background-color: white;
}

.has-circle-border > .image-container::after {
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
