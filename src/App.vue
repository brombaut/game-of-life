<template>
  <GameHeader />
  <GameGrid
    :mGameGrid="mGameGrid"
    :approximateCellSize="approximateCellSize"
    @toggleCell="manuallyToggleCell"/>
  <GameFooter
    :playing="playing"
    :generation="mGameGrid.generation"
    @nextGenerationClicked="setNextGeneration"
    @previousGenerationClicked="setPreviousGeneration"
    @playOrPauseButtonClicked="togglePlaying"
    @reset="reset"
    @clear="clear"
    @zoomIn="zoomIn"
    @zoomOut="zoomOut"
    @speedChanged="updateMsBetweenGenerations"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameGrid from './components/GameGrid.vue';
import GameHeader from './components/GameHeader.vue';
import GameFooter from './components/GameFooter.vue';
import { Cell, Grid } from "./types/types";
import * as defaultGrids from "@/types/DefaultGrids";


export default defineComponent({
  name: 'App',
  components: {
    GameGrid,
    GameHeader,
    GameFooter
  },
  data() {
    const mGameGrid: Grid = new defaultGrids.Glider();
    const approximateCellSizeOptions: number[] = [
      4, 6, 10, 20, 30, 50, 75
    ];
    return {
      playing: false,
      msBetweenGenerations: 100,
      mGameGrid,
      nextGenerationInterval: 0,
      approximateCellSizeIndex: 4,
      approximateCellSizeOptions,
    };
  },
  watch: {
    playing(isPlaying) {
      if (isPlaying) {
        this.nextGenerationInterval = setInterval(this.setNextGeneration, this.msBetweenGenerations);
      } else {
        clearInterval(this.nextGenerationInterval);
      }
    },
  },
  computed: {
    approximateCellSize(): number {
      return this.approximateCellSizeOptions[this.approximateCellSizeIndex];
    },
  },
  methods: {
    togglePlaying() {
      this.playing = !this.playing;
    },
    setNextGeneration() {
      this.mGameGrid.nextGeneration();
    },
    setPreviousGeneration() {
      this.mGameGrid.previousGeneration();
    },
    reset() {
      this.mGameGrid.reset();
    },
    clear() {
      this.mGameGrid = new Grid([]);
    },
    zoomIn() {
      this.approximateCellSizeIndex = Math.min(this.approximateCellSizeIndex + 1, this.approximateCellSizeOptions.length - 1);
    },
    zoomOut() {
      this.approximateCellSizeIndex = Math.max(this.approximateCellSizeIndex - 1, 0);
    },
    manuallyToggleCell(c: Cell) {
      this.mGameGrid.resetGenerationHistory();
      if (this.mGameGrid.cellIsLive(c)) {
        this.mGameGrid.removeLiveCell(c);
      } else {
        this.mGameGrid.addLiveCell(c);
      }
    },
    updateMsBetweenGenerations(newVal: number) {
      this.msBetweenGenerations = newVal;
      if (this.playing) {
        // If we are already playing, speed up the current interval
        clearInterval(this.nextGenerationInterval);
        this.nextGenerationInterval = setInterval(this.setNextGeneration, this.msBetweenGenerations);
      }
    }
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
