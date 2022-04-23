<template>
  <div id="game-grid">
    <div
      v-for="i in numberOfCellRows"
      :key="`row-${i}`"
      class="grid-row">
      <GridCell
        v-for="j in numberOfCellCols"
        :key="`cell-${i}-${j}`"
        :i="i - Math.floor(numberOfCellRows / 2)"
        :j="j - Math.floor(numberOfCellCols / 2)"
        :isLive="cellIsLive(i - Math.floor(numberOfCellRows / 2), j - Math.floor(numberOfCellCols / 2))"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GridCell from "./GridCell.vue";
import { Grid, Cell } from "@/types/types";
import * as defaultGrids from "@/types/DefaultGrids";


export default defineComponent({
  name: "GameGrid",
  components: {
    GridCell,
  },
  data() {
    const mGrid: Grid = new defaultGrids.Glider();
    return {
      approximateCellSize: 20,
      gameGridHeight: null,
      gameGridWidth: null,
      mGrid,
    };
  },
  computed: {
    numberOfCellRows(): number {
      if (!this.gameGridHeight) return 0;
      const result = Math.floor(this.gameGridHeight / this.approximateCellSize);
      return result;
    },
    numberOfCellCols(): number {
      if (!this.gameGridWidth) return 0;
      const result = Math.floor(this.gameGridWidth / this.approximateCellSize);
      return result;
    },
  },
  methods: {
    setGameGridDimensions(): void {
      const rect = this.$el.getBoundingClientRect();
      this.gameGridHeight = rect.height;
      this.gameGridWidth = rect.width;
    },
    cellIsLive(i: number, j: number) {
      const cToCheck: Cell = new Cell(i, j);
      return this.mGrid.cellIsLive(cToCheck);
    },
  },
  mounted(): void {
    this.setGameGridDimensions();
  },
  created() {
    window.addEventListener("resize", this.setGameGridDimensions);
  },
  unmounted() {
    window.removeEventListener("resize", this.setGameGridDimensions);
  },
});
</script>

<style lang="scss">
#game-grid {
  flex: 1;
  display: flex;
  flex-direction: column;

  .grid-row {
    flex: 1;
    display: flex;
    flex-direction: row;
  }
}

</style>