<template>
  <div id="game-grid">
    <div
      v-for="i in numberOfCellRows"
      :key="i"
      class="grid-row">
      <div
        v-for="j in numberOfCellCols"
        :key="j"
        class="cell">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "GameGrid",
  data() {
    return {
      cellHeight: null,
    };
  },
  computed: {
    numberOfCellRows() {
      return 10;
    },
    numberOfCellCols() {
      return 20;
    }
  }
});
</script>

<style lang="scss">
#game-grid {
  flex: 1;

  .cell {
    border: 1px solid black;
  }
}

</style>