<template>
  <div class="magic-card">
    <div class="card">
      <div class="content">
        <div class="title">
          Plains
        </div>
        <div class="art">
          (img goes here)
        </div>
        <div class="type-line">
          Basic Land --- Plains
        </div>
        <div class="rules-text">
        </div>
        <div class="footer">
          Illus. John Avon
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
