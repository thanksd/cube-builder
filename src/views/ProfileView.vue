<script setup lang="ts">
import ImageUpload from '@/components/ImageUpload.vue'
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { supabase } from '@/lib/supabaseClient'

const app = useAppStore()
const avatarUrl = ref('')
const username = ref('')
const saving = ref(false)
const saved = ref(false)

function updateAvatar({ filePath, file }: { filePath: string, file: Blob }) {
  app.updateProfileAvatar(filePath)
  avatarUrl.value = URL.createObjectURL(file)
}

async function onUsernameSave() {
  try {
    saving.value = true;
    await app.updateProfile({ username: username.value })
  } catch (e) {
    if (e instanceof Error) alert(e.message)
  } finally {
    saved.value = true;
    saving.value = false;
  }
}

onMounted(async () => {
  const { profile } = app;
  const { data, error } = await supabase.storage.from('avatars').download(profile['avatar_url'])
  if (error) throw error
  avatarUrl.value = URL.createObjectURL(data)
  username.value = profile.username
})
</script>

<template>
  <main>
    <h1>Profile Settings</h1>

    <label>
      Username <br>
      <input
        v-model="username"
        :disabled="saving || saved"
      >
      <button
        :disabled="saving || saved"
        @click="onUsernameSave"
      >
        <template v-if="saved">Saved!</template>
        <template v-else-if="saving">Saving...</template>
        <template v-else>Save</template>
      </button>
    </label>

    <label>
      Profile Avatar
      <ImageUpload
        v-model:src="avatarUrl"
        :max-width="100"
        :max-height="100"
        @upload="updateAvatar"
      />
    </label>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: monospace;
}
</style>
