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
  if (error) throw error
  avatarUrl.value = URL.createObjectURL(data)
})
</script>

<template>
  <main>
    <h1>Profile Settings</h1>

    <ImageUpload
      v-model:src="avatarUrl"
      :max-width="100"
      :max-height="100"
      @upload="updateAvatar"
    />
  </main>
</template>

<style scoped>
</style>
