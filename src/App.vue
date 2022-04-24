<template>
  <GameHeader />
  <GameGrid :mGameGrid="mGameGrid"/>
  <GameFooter
    :playing="playing"
    :generation="mGameGrid.generation"
    @nextGenerationClicked="setNextGeneration"
    @previousGenerationClicked="setPreviousGeneration"
    @playOrPauseButtonClicked="togglePlaying" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameGrid from './components/GameGrid.vue';
import GameHeader from './components/GameHeader.vue';
import GameFooter from './components/GameFooter.vue';
import { Grid } from "./types/types";
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
    return {
      playing: false,
      msBetweenGenerations: 100,
      mGameGrid,
      nextGenerationInterval: 0,
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
