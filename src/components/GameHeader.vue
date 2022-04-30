<template>
  <header id="game-header">
    <h1 class="title">Conway's Game of Life</h1>
    <RulesPane />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RulesPane from "@/components/RulesPane.vue"

export default defineComponent({
  name: "GameHeader",
  components: {
    RulesPane,
  },
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
  // padding: 0 16px;

  .title {
    padding: 8px 12px;
    color: $primary;
  }
}

</style>