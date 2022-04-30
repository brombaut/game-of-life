<template>
  <div id="rules-pane">
    <button class="dropbtn" @click="toggleShow">
      Rules
      <font-awesome-icon
        class="caret"
        :class="{'rotate-180': show}"
        :icon="['fas', 'caret-down']" />
    </button>
    <div class="dropdown-content" :class="{show: show}">
      <p>The <b>Game of Life</b> is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.</p>
      <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square <i>cells</i>, each of which is in one of two possible states, <i>live</i> or <i>dead</i> (or populated and unpopulated, respectively). Every cell interacts with its eight <i>neighbours</i>, which are the cells that are horizontally, vertically, or diagonally adjacent.</p>
      <p>At each step in time, the following transitions occur:</p>
      <ol>
        <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
        <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
        <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
      </ol>
      <p>Read more <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">here</a>.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "RulesPane",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
  },
});
</script>

<style lang="scss">
#rules-pane {
  position: relative;
  display: inline-block;

  .dropbtn {
    background-color: inherit;
    color: $primary;
    height: 100%;
    padding: 0px 16px;
    font-size: 2em;
    font-weight: bold;
    border: none;
    cursor: pointer;

    .caret {
      transition: all 0.5s;
      transform: rotate(0deg);

      &.rotate-180 {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown-content {
    font-size: 0.8em;
    display: none;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    padding: 4px 8px;
    right: 0;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;

    p, ol {
      margin-top: 4px;
      margin-bottom: 4px;
    }

    &.show {
      display: flex;
    }
  }
}
</style>