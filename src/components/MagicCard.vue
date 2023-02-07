<script setup lang="ts">
const props = defineProps({
  title: String,
  img: String,
  type: String,
  rules: String,
  author: String
})
</script>

<template>
  <div class="magic-card">
    <div class="card">
      <div class="content">
        <div class="title">
          {{ props.title }}
        </div>
        <div class="art">
          {{ props.img }}
        </div>
        <div class="type-line">
          {{ props.type }}
        </div>
        <div class="rules-text">
          {{ props.rules }}
        </div>
        <div class="footer">
          Illus. {{ props.author }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  font-size: .79rem;
  width: 25em;
  height: 35em;
  background-color: black;
  border-radius: 1em;
  user-select: none;
}

.content {
  position: absolute;
  top: 1rem;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background-color: rgb(89, 46, 38);
  display: flex;
  flex-direction: column;
}

.title, .type-line, .footer {
  height: 1.2rem;
  color: white;
  line-height: 1.2rem;
  margin: 0 1rem;
}

.title {
  font-size: 1rem;
  height: 1.4rem;
  line-height: 1.4rem;;
}

.art {
  background: yellow;
  height: 50%;
  margin: 0 1rem;
}

.rules-text {
  flex-grow: 1;
  margin: 0 1rem;
  background-color: antiquewhite
}

.footer {
  text-align: center;
}
</style>
