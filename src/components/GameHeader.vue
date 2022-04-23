<template>
  <header id="game-header">
    <h1>Conway's Game of Life</h1>
    <h1>Rules</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "GameHeader",

});
</script>

<style lang="scss">

#game-header {
  // height: 60px;
  width: 100%;
  background-color: $darkGray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;

  h1 {
    padding: 8px;
    color: $primary;

  }
}

</style>