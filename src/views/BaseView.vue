<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import MagicCard from '../components/MagicCard.vue'
import ConfigPanel from '../components/ConfigPanel.vue'
import cards from '../data/cards'
import { useAppStore } from '../stores/app';

const card = ref(cards[0])
const leftPane: Ref<HTMLElement | null> = ref(null)
const cardPositionLocked = ref(true)

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
  <main>
    <section
      ref="leftPane"
      class="card-section"
      @mousemove="onMouseMove"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <MagicCard
        :position-locked="cardPositionLocked"
        :title="card.title"
        :img="card.img"
        :type="card.type"
        :rules="card.rules"
        :author="card.author"
      />
    </section>
    <section class="config-section">
      <ConfigPanel />
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
  min-height: 100vh;
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
  /* min-width: 200px; */
  padding: 1rem;
  flex-grow: 1;
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
</style>
