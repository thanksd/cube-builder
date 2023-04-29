<script setup lang="ts">
import RulesSymbolGroup from './RulesSymbolGroup.vue';
import InfoLinePill from './InfoLinePill.vue';

const props = defineProps({
  title: { type: String, default: '' },
  cost: { type: String, default: '' }
})
</script>

<template>
  <InfoLinePill class="card-header">
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
  </InfoLinePill>
</template>

<style scoped>
.title {
  color: black;
  font-size: 0.85em;
  font-weight: bold;
}

.cost {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}
</style>
