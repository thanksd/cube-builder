<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient';

const loading = ref(false)
const email = ref('')

const onLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form
    class="login-view"
    @submit.prevent="onLogin"
  >
    <p>Sign in via magic link with your email below</p>

    <input
      v-model="email"
      type="email"
      placeholder="Your email"
    >
    <input
      type="submit"
      :value="loading ? 'Loading' : 'Send magic link'"
      :disabled="loading"
    >
  </form>
</template>
