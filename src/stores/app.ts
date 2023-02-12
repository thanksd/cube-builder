import { defineStore } from 'pinia'
import { useCardStore } from './card'
import cards from '../data/cards'

export const useAppStore = defineStore('app', () => {
  const cardStore = useCardStore()

  async function initApp() {
    cardStore.setCard(cards[0])
  }

  return {
    initApp
  }
})
