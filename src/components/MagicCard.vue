<script setup lang="ts">
import { watch, ref } from 'vue';

const props = defineProps({
  title: { type: String, default: '' },
  img: { type: String, default: ' '},
  type: { type: String, default: ' '},
  rules: { type: String, default: ' '},
  author: { type: String, default: ' '},
  positionLocked: { type: Boolean, default: true }
})

const card = ref();

let updateDegInterval: number;

function updateDeg() {
  const value = props.positionLocked ? 0 : 50
  const n = parseFloat(getComputedStyle(card.value).getPropertyValue('--n'))
  const delta = (value - n) / 60
  const done = Math.abs(n - value) < 1
  const newValue = done ? value : (n + delta)
  card.value.style.setProperty('--n', newValue)

  if (done) clearInterval(updateDegInterval)
}

watch(() => props.positionLocked, () => {
  if (updateDegInterval) clearInterval(updateDegInterval)
  updateDegInterval = setInterval(updateDeg)
})
</script>

<template>
  <div class="magic-card">
    <div
      ref="card"
      class="card"
    >
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
  --n: 0;
  --deg: calc(var(--n) * 1deg);
  --x: calc(var(--mouse-x, 0.5) - 0.5);
  --y: calc(var(--mouse-y, 0.5) - 0.5);
  --deg-x: calc(-1.2 * var(--deg) * var(--x));
  --deg-y: calc(1.2 * var(--deg) * var(--y));
  --deg-z: calc(var(--deg) * calc(var(--y) / 6 * var(--x) / 2));

  font-family: 'Libre Baskerville', serif;
  position: relative;
  font-size: .79rem;
  width: 25em;
  height: 35em;
  background-color: black;
  border-radius: 1em;
  user-select: none;
  transform:
    rotate3d(-1, 0, 0, var(--deg-y))
    rotate3d(0, -1, 0, var(--deg-x))
    rotate3d(0, 0, 1, var(--deg-z));

  --shadow-blur: 100px;
  --shadow-length: -10px;
  --shadow-color: rgba(0,0,0,0.08);
  box-shadow:
    calc(30px - (var(--x) * var(--n) * 1px))
    calc(30px - (var(--y) * var(--n) * 1px))
    var(--shadow-blur) var(--shadow-length) var(--shadow-color),
    calc(50px - (var(--x) * var(--n) * 5px))
    calc(30px - (var(--y) * var(--n) * 3px))
    var(--shadow-blur) var(--shadow-length) var(--shadow-color),
    calc(30px - (var(--x) * var(--n) * 3px))
    calc(50px - (var(--y) * var(--n) * 5px))
    var(--shadow-blur) var(--shadow-length) var(--shadow-color),
    calc(30px - (var(--x) * var(--n) * 3px))
    calc(-20px - (var(--y) * var(--n) * 2px))
    var(--shadow-blur) var(--shadow-length) var(--shadow-color),
    calc(-20px - (var(--x) * var(--n) * 2px))
    calc(30px - (var(--y) * var(--n) * 3px))
    var(--shadow-blur) var(--shadow-length) var(--shadow-color);
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
