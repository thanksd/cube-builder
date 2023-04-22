<script setup lang="ts">
import RulesSymbolGroup from './RulesSymbolGroup.vue';

const props = defineProps({
  title: { type: String, default: '' },
  cost: { type: String, default: '' }
})
</script>

<template>
  <div class="card-header">
    <div class="back-panel" />
    <div class="front-panel">
      <div class="title">
        {{ props.title }}
      </div>
      <div class="cost">
        <RulesSymbolGroup
          v-if="props.cost"
          :value="props.cost"
          :has-shadow="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  font-family: var(--font-family);
  position: relative;
  max-width: 16em;
  border-radius: 1em / 2em;
  overflow: hidden;
  height: 1.8rem;
  display: flex;
  border: 0.2em solid blue;
}

.back-panel {
  --background-color: rgba(110, 110, 110, 0.25);

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  z-index: 0;
}

.front-panel {
  display: flex;
  padding: 0 0.4em;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  --border-light: rgba(255, 255, 255, 0.3);
  --border-dark: rgba(0, 0, 0, 0.1);
  --border-width: 0.18em;
  border-style: solid;
  border-width: var(--border-width);
  border-color:
    var(--border-light)
    var(--border-light)
    var(--border-dark)
    var(--border-dark);
  border-radius: 1em / 2em;
  z-index: 1;
}

.title {
  color: black;
  font-size: 0.85rem;
  font-weight: bold;
}

.cost {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  height: 1.2rem;
}
</style>
