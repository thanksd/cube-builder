<script setup lang="ts">
import ImageUpload from '@/components/ImageUpload.vue'
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { supabase } from '@/lib/supabaseClient'

const app = useAppStore()
const username = ref('')
const avatarUrl = ref('')
const avatarImg = ref()
const saving = ref(false)
const saved = ref(false)

function onUpdateFile(file: any) {
  avatarImg.value = file
}

async function onSave() {
  try {
    saving.value = true;
    await app.updateProfile({ username: username.value })
    const file = avatarImg.value
    if (file) await updateAvatar({ file })
  } catch (e) {
    if (e instanceof Error) alert(e.message)
  } finally {
    saved.value = true;
    saving.value = false;
  }
}

async function updateAvatar(params: { file: any }) {
  const { file } = params
  const fileExt = file.name.split('.').pop()
  const filePath = `${Math.random()}.${fileExt}`

  let { error: uploadError } = await supabase
    .storage
    .from('avatars')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  await app.updateProfileAvatar(filePath)
  avatarUrl.value = URL.createObjectURL(file)
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
    </label>

    <label>
      Profile Avatar
      <ImageUpload
        v-model:src="avatarUrl"
        class="image-upload"
        :disabled="saving"
        :img-width="100"
        :img-height="100"
        :circle-border="true"
        @update:file="onUpdateFile"
      />
    </label>

    <button
      :disabled="saving || saved"
      @click="onSave"
    >
      <template v-if="saved">
        Saved!
      </template>
      <template v-else-if="saving">
        Saving...
      </template>
      <template v-else>
        Save
      </template>
    </button>
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
