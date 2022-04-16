<template>
  <GameGrid />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameGrid from './components/GameGrid.vue';

export default defineComponent({
  name: 'App',
  components: {
    GameGrid,
  },
});
</script>

<style lang="scss">

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  height: 100vh;
}
h1,h2,h3,h4,h5,h6 {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
}
</style>
