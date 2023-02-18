import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCardStore } from './card'
import { supabase } from '../lib/supabaseClient'

const session = ref()

export const useAppStore = defineStore('app', () => {
  const cardStore = useCardStore()

  async function initApp() {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
    });

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })

    const { data } = await supabase.from('cards').select()
    cardStore.setCard(data?.[0])
  }

  return {
    session,
    initApp
  }
})
