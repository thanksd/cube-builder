import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useCardStore } from './card'
import { supabase } from '../lib/supabaseClient'

type User = {
  id: string;
}

type Session = {
  user: User;
}

const profile = ref()
const session: Ref<Session | null> = ref(null)

async function setupSession(_session: Session | null) {
  if (!_session) return

  const { user } = _session
  const { data: _profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user.id)

  profile.value = _profile?.[0]
  session.value = _session
}

export const useAppStore = defineStore('app', () => {
  const cardStore = useCardStore()

  async function initApp() {
    const { data } = await supabase.auth.getSession();
    await setupSession(data.session)

    supabase.auth.onAuthStateChange((_, _session) => {
      setupSession(_session)
    })

    const { data: cards } = await supabase.from('cards').select()
    cardStore.setCard(cards?.[0])
  }

  async function updateProfile(params: any) {
    const { error } = await supabase
      .from('profiles')
      .update(params)
      .eq('id', profile.value.id)

    if (error) throw error
  }

  async function updateProfileAvatar(avatarUrl: string) {
    await updateProfile({ avatar_url: avatarUrl })

    profile.value.avatar_url = avatarUrl;

  }

  return {
    session,
    profile,
    initApp,
    updateProfile,
    updateProfileAvatar
  }
})
