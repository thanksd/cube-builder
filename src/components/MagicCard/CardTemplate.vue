<script setup lang="ts">
import { watch, ref, type Ref, nextTick } from 'vue'
import RulesText from './RulesText.vue';
import CardHeader from './CardHeader.vue';
import TypeLine from './TypeLine.vue';

const props = defineProps({
  color: { type: String, default: '' },
  title: { type: String, default: '' },
  type: { type: String, default: '' },
  cost: { type: String, default: '' },
  rules: { type: String, default: '' },
  power: { type: String, default: '' },
  toughness: { type: String, default: '' },
  author: { type: String, default: '' },
  imgUrl: { type: String, default: '' }
})

const card: Ref<HTMLElement | null> = ref(null)
const root = document.querySelector(':root')
const style = root ? getComputedStyle(root) : null;

watch(() => props.color, async (val) => {
  await nextTick()
  const color = style?.getPropertyValue(`--color-${val}`)
  if (color) card.value?.style?.setProperty('--card-color', color)
  const bgColor = style?.getPropertyValue(`--color-${val}-bg`)
  if (bgColor) card.value?.style?.setProperty('--card-color-bg', bgColor)
  const lightColor = style?.getPropertyValue(`--color-${val}-light`)
  if (lightColor) card.value?.style?.setProperty('--card-color-light', lightColor)
}, { immediate: true })
</script>

<template>
  <div
    ref="card"
    class="magic-card-template"
  >
    <CardHeader
      class="header"
      :title="props.title"
      :cost="props.cost"
    />
    <div class="art">
      <img :src="props.imgUrl">
    </div>
    <TypeLine
      class="type-line"
      :type="type"
    />
    <div class="rules-container">
      <RulesText
        :text="rules"
        class="rules-text"
      />
    </div>
    <div
      v-if="power || toughness"
      class="stats-container"
    >
      {{ power }}/{{ toughness }}
    </div>
    <div class="footer">
      Illus. {{ author }}
    </div>
  </div>
</template>

<style scoped>
.magic-card-template {
  width: 25em;
  height: 35em;
  display: flex;
  flex-direction: column;
  border: 1em solid black;
  background-color: black;
  border-radius: 0.8em;
  position: relative;
}

.magic-card-template::before {
  content: '';
  background-color: #74A9F6;
  position: absolute;
  top: 0;
  bottom: 2.1em;
  width: 100%;
  border-radius: 0.4em 0.4em 2em 2em;
  z-index: 0;
}

.header {
  margin: 0.3em 0.2em 0 0.2em;
  height: 2em;
  font-size: 1.2em;
  box-shadow:
    -0.16em 0.1em 0.08em rgba(0,0,0,0.7),
    0em -0.2em 0.1em rgba(255,255,255,0.3),
    0.2em 0em 0.1em rgba(255,255,255,0.3);
}

.type-line {
  margin: 0 0.2em;
  height: 2em;
  font-size: 1.2em;
  box-shadow:
    -0.16em 0.1em 0.08em rgba(0,0,0,0.7),
    0.2em 0.1em 0.1em rgba(255,255,255,0.3);
}

.art {
  height: 49.1%;
  margin: -0.25em 0.5em;
  background-color: rgba(255,255,255,0.5);
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  border: 0.25em solid var(--card-color);
  box-shadow:
    -0.16em 0.1em 0.08em rgba(0,0,0,0.7),
    0.2em 0.1em 0.1em rgba(255,255,255,0.3);
}

.art img {
  max-width: 100%;
  border: 0.1em solid black;
}

.rules-container {
  position: relative;
  flex-grow: 1;
  margin: -0.25em 0.5em 0em 0.5em;
  background-color: var(--card-color-light);
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0.9em;
  border: 0.25em solid var(--card-color);
  box-shadow:
    inset -0.1em 0.1em 0.08em rgba(0,0,0,0.4),
    inset 0.1em -0.1em 0.08em rgba(255,255,255,0.6),
    -0.16em 0.1em 0.08em rgba(0,0,0,0.7),
    0.2em 0.1em 0.1em rgba(255,255,255,0.3);
}

.rules-text {
  margin: 0 0.4em;
  position: relative;
  width: 100%;
  letter-spacing: 0.04em;
}

.stats-container {
  position: absolute;
  bottom: 0.45em;
  right: 0.1em;
  background-color: var(--card-color-bg);
  display: flex;
  padding: 0.2em 0.6em 0em 0.6em;
  border: 0.14em solid var(--card-color-bg);
  box-shadow:
    inset -0.1em 0.12em 0.08em rgba(0,0,0,0.4),
    inset 0.01em -0.01em 0.8em rgba(0,0,0,0.1),
    -2px 8px 8px rgba(0,0,0,0.9);
  font-size: 1.4em;
  border-radius: 0.8em / 2em;
  letter-spacing: 0.06em;
}

.stats-container::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
}

.footer {
  margin-top: 0.5em;
  height: 1.2em;
  color: white;
  font-size: 0.7em;
  text-align: center;
}
</style>
