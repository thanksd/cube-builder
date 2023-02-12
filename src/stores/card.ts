import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

type Card = {
  id: number;
  title: string;
  img: string;
  type: string;
  rules: string;
  author: string;
}

export const useCardStore = defineStore('card', () => {
  const card: Ref<Card> = ref({
    id: 0,
    title: '',
    img: '',
    type: '',
    rules: '',
    author: ''
  })

  function setCard(value: Card) {
    card.value = value
  }

  function updateCard(data: Partial<Card>) {
    card.value = Object.assign({}, card.value, data)
  }

  return {
    card,
    setCard,
    updateCard
  }
})
