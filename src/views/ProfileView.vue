<script setup lang="ts">
import ImageUpload from '@/components/ImageUpload.vue'
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { supabase } from '@/lib/supabaseClient';

const app = useAppStore()
const avatarUrl = ref('')

function updateAvatar() {
  app.updateProfileAvatar(avatarUrl.value)
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
    <img
      :src="avatarUrl"
      alt="profile avatar"
    >

    <ImageUpload
      v-model:path="avatarUrl"
      @upload="updateAvatar"
    />
  </main>
</template>
