<script setup lang="ts">
import { ref, watch, computed, type Ref } from 'vue'
import MagicCard from '../components/MagicCard/MagicCard.vue'
import ConfigPanel from '../components/ConfigPanel/ConfigPanel.vue'
import { useCardsStore } from '@/stores/cards';
import { useRoute } from 'vue-router'

const cardStore = useCardsStore()
const route = useRoute()

const leftPane: Ref<HTMLElement | null> = ref(null)
const cardPositionLocked = ref(true)

const card = computed(() => cardStore.activeCard)

watch(() => route.params.id, (value) => {
  const _card = cardStore.cards.get(+value)
  cardStore.activeCard = Object.assign({}, _card)
}, { immediate: true })

function resizer(e: any) {
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);

  const prevX = e.x;
  const { width = 0 } = leftPane.value?.getBoundingClientRect() || {};

  function mousemove(e: any) {
    if (leftPane.value) {
      const newX = prevX - e.x;
      leftPane.value.style.width = `${width - newX}px`;
    }
  }

  function mouseup() {
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  }
}

function onMouseMove(e: any) {
  const { width = 0, height = 0 } = leftPane.value?.getBoundingClientRect() || {};
  const x = e.clientX / width;
  const y = e.clientY / height;
  document.documentElement.style.setProperty('--mouse-x', String(x));
  document.documentElement.style.setProperty('--mouse-y', String(y));
}

function onMouseEnter() {
  cardPositionLocked.value = false
}

function onMouseLeave() {
  cardPositionLocked.value = true
}
</script>

<template>
  <main
    v-if="card"
    class="card-view"
  >
    <section
      ref="leftPane"
      class="card-section"
      @mousemove="onMouseMove"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <MagicCard
        class="magic-card"
        :position-locked="cardPositionLocked"
        :card="card"
      />
    </section>
    <section class="config-section">
      <ConfigPanel :card="card" />
      <div
        class="gutter"
        @mousedown="resizer"
      />
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
}

.card-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  min-width: 200px;
  background-color: #2e2727;
}

.config-section {
  position: relative;
  color: seashell;
  background-color: #0f0d0c;
  padding: 1rem;
  flex-grow: 1;
}

.magic-card {
  margin: 2rem;
}

.gutter {
  position: absolute;
  width: 1rem;
  height: 100%;
  background-color: #0f0d0c;
  top: 0;
  left: 0;
  cursor: col-resize;
}

@media (max-width: 60rem) {
  main {
    flex-direction: column;
  }

  .gutter {
    pointer-events: none;
  }

  .card-section {
    width: 100%;
    pointer-events: none;
  }
}
</style>
