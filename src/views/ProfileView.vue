<script setup lang="ts">
import ImageUpload from '@/components/ImageUpload.vue'
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { supabase } from '@/lib/supabaseClient'

const app = useAppStore()
const avatarUrl = ref('')

function updateAvatar({ filePath, file }: { filePath: string, file: Blob }) {
  app.updateProfileAvatar(filePath)
  avatarUrl.value = URL.createObjectURL(file)
}

onMounted(async () => {
  const { profile } = app;
  const { data, error } = await supabase.storage.from('avatars').download(profile['avatar_url'])
  console.log({ data })
  if (error) throw error
  avatarUrl.value = URL.createObjectURL(data)
})
</script>

<template>
  <main>
    <img
      :src="avatarUrl"
      alt="profile avatar"
    >

    <ImageUpload
      :show-preview="false"
      @upload="updateAvatar"
    />
  </main>
</template>

<style scoped>
img {
  height: 300px;
}
</style>
