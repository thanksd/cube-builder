<script setup lang="ts">
import { computed } from 'vue';
import RulesSymbolGroup from './RulesSymbolGroup.vue';

const props = defineProps({
  text: { type: String, default: '' }
})

const lines = computed(() => {
  try {
    return props.text.split('\n').map(line => {
      return line.split(' ')
    })
  } catch (e) {
    console.error('Failed to process rules text', e)
    return []
  }
})
</script>

<template>
  <div class="rules-text">
    <div
      v-for="(line, i) in lines"
      :key="`line-${i}`"
      class="rule-line"
    >
      <template
        v-for="(word, j) in line"
        :key="`line-${i}-word-${j}`"
      >
        <RulesSymbolGroup
          v-if="word.startsWith('{') && word.endsWith('}')"
          :value="word"
        />
        <span
          v-else
          class="rule-word"
        >{{ word }}</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.rules-text {
  display: flex;
  flex-direction: column;
  gap: 0.4em;
}

.rule-line {
  display: flex;
  gap: 0.2em;
  flex-wrap: wrap;
}
</style>
