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
  mana_cost: string;
  power: string;
  toughness: string;
}

export const useCardsStore = defineStore('cards', () => {
  const cards: Ref<Map<number, Card>> = ref(new Map())

  /**
   * The card data actively being editted and updated in app memory before saving to the backend
   */
  const activeCard: Ref<Card | null> = ref(null)

  async function loadCards() {
    const { data } = await supabase.from('cards').select()
    if (!Array.isArray(data)) return

    for (const card of data) {
      cards.value.set(card.id, card)
    }
  }

  async function updateCard(params: { id: number, data: Partial<Card> }) {
    const { id, data } = params
    const { data: _card, error } = await supabase
      .from('cards')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    cards.value.set(id, _card)

    if (error) throw error

    return _card
  }

  async function createCard(params: { userId: string }) {
    const { userId } = params
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

  async function deleteCard(params: { id: number }) {
    const { id } = params
    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id)

    cards.value.delete(id)

    if (error) throw error
  }

  return {
    // state
    cards,
    activeCard,

    // methods
    loadCards,
    updateCard,
    createCard,
    deleteCard
  }
})
