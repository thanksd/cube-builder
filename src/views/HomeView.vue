<script setup lang="ts">
import { ref, type Ref } from 'vue'
import MagicCard from '../components/MagicCard.vue'
import cards from '../data/cards'

const card = ref(cards[0])
const leftPane: Ref<HTMLElement | null> = ref(null)
const gutter: Ref<HTMLElement | null> = ref(null)

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

gutter.value?.addEventListener('mousedown', resizer);
</script>

<template>
  <main>
    <section class="card-section" ref="leftPane">
      <MagicCard
        :title="card.title"
        :img="card.img"
        :type="card.type"
        :rules="card.rules"
        :author="card.author"
      />
    </section>
    <section class="config-section">
      Here goes the config
      <div class="gutter" @mousedown="resizer"></div>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  min-height: 100vh;
  min-width: 100vh;
}

.card-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  min-width: 200px;
}

.config-section {
  position: relative;
  background-color: cornflowerblue;
  min-width: 200px;
  padding: 1rem;
  flex-grow: 1;
}

.gutter {
  position: absolute;
  width: 1rem;
  height: 100%;
  background-color: cornflowerblue;
  top: 0;
  left: 0;
  cursor: col-resize;
}
</style>
