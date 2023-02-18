import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCardStore } from './card'
import { supabase } from '../lib/supabaseClient'

const session = ref()

export const useAppStore = defineStore('app', () => {
  const cardStore = useCardStore()

  async function initApp() {
    const { data } = await supabase.auth.getSession();
    session.value = data
    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  }

  return {
    session,
    initApp
  }
})
