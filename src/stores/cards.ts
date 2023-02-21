import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'

export type Card = {
  id: number;
  created_at: string;
  title: string;
  img: string;
  type: string;
  rules: string;
  author: string;
}

export const useCardsStore = defineStore('cards', () => {
  const cards: Ref<Map<number, Card>> = ref(new Map())

  async function loadCards() {
    const { data } = await supabase.from('cards').select()
    if (!Array.isArray(data)) return

    for (const card of data) {
      cards.value.set(card.id, card)
    }
  }

  function updateCard(id: number, data: Partial<Card>) {
    const card = cards.value.get(id)
    cards.value.set(id, Object.assign({}, card, data))
  }

  async function createCard({ userId }: { userId: string }) {
    const payload = {
      title: '(Untitled Card)',
      created_by: userId
    }
    const { data: card, error } = await supabase
      .from('cards')
      .insert(payload)
      .select()
      .single()

    cards.value.set(card.id, card)

    if (error) throw error

    return { id: card.id }
  }

  async function deleteCard({ id }: { id: number }) {
    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id)

    if (error) throw error;
  }

  return {
    cards,
    loadCards,
    updateCard,
    createCard,
    deleteCard
  }
})
