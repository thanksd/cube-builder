import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCardStore } from './card'
import { supabase } from '../lib/supabaseClient'

export const useAppStore = defineStore('app', () => {
  const cardStore = useCardStore()
  const session = ref()

  async function initApp() {
    const { data } = await supabase.auth.getSession();
    session.value = data.session

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })

    const { data: cards } = await supabase.from('cards').select()
    cardStore.setCard(cards?.[0])
  }

  return {
    session,
    initApp
  }
})
