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
          <img :src="props.img">
          {{ props.img }}
        </div>
        <div class="type-line">
          {{ props.type }}
        </div>
        <div class="rules-container">
          <div class="rules-text">
            {{ props.rules }}
          </div>
        </div>
        <div class="footer">
          Illus. {{ props.author }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

.card {
  --deg: 25deg;
  --dist-x: (var(--mouse-x) - 0.5 * 1deg);
  /* --dist-y: abs(calc(var(--mouse-x) - 0.5));
  --rotation: calc((var(--dist-x) + var(--dist-y)) * var(--deg)); */

  font-family: 'Libre Baskerville', serif;
  position: relative;
  font-size: .79rem;
  width: 25em;
  height: 35em;
  background-color: black;
  border-radius: 1em;
  user-select: none;
  /* transform: rotate3d(1, 1, 1, var(--rotation)deg); */
  transform: rotate3d(1, 1, 1, calc(var(--dist-x)));
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
  font-size: 0.85rem;
  height: 1.4rem;
  line-height: 1.4rem;;
}

.art {
  background: yellow;
  height: 50%;
  margin: 0 1rem;
  overflow: hidden;
  position: relative;
}

.art img {
  position: relative;
  width: 100%;
}

.rules-container {
  flex-grow: 1;
  margin: 0 1rem;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  line-height: 0.9rem;
}

.rules-text {
  margin: 0 0.4rem;
}

.footer {
  font-size: 0.7rem;
  text-align: center;
}
</style>
