<template>
  <div class="info-line-pill">
    <div class="back-panel" />
    <div class="front-panel">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.info-line-pill {
  font-family: var(--font-family);
  position: relative;
  overflow: hidden;
  height: 1.8em;
  display: flex;
  border: 0.25em solid;
  border-color: var(--card-color);
  background-color: var(--card-color);
  border-radius: 1em / 2em;
}

.back-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--card-color-bg);
  border: 1px solid rgba(0, 0, 0, 0.8);
  z-index: 0;
}

.front-panel {
  display: flex;
  padding: 0 0.2em 0 0.3em;
  margin: 1px;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  --border-light: rgba(255, 255, 255, 0.3);
  --border-dark: rgba(0, 0, 0, 0.25);
  --border-width: 0.14em;
  border-style: solid;
  border-width: var(--border-width);
  border-color:
    var(--border-light)
    var(--border-light)
    var(--border-dark)
    var(--border-dark);
  z-index: 1;
}

.back-panel,
.front-panel {
  border-radius: 1.2em / 2.4em;

}
</style>
