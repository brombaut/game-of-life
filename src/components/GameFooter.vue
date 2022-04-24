<template>
  <footer id="game-footer">
    <div class="controls">
      <div class="control-group">
        <h1>
          <font-awesome-icon
            class="control control-button"
            :icon="['fas', 'chevron-left']"
            @click="$emit('previousGenerationClicked')"/>
        </h1>
        <h1>
          <font-awesome-icon
            v-if="playing"
            class="control control-button"
            :icon="['fas', 'pause']"
            @click="$emit('playOrPauseButtonClicked')"/>
          <font-awesome-icon
            v-else
            class="control control-button"
            :icon="['fas', 'play']"
            @click="$emit('playOrPauseButtonClicked')"/>
        </h1>
        <h1>
          <font-awesome-icon
            class="control control-button"
            :icon="['fas', 'chevron-right']"
            @click="$emit('nextGenerationClicked')"/>
        </h1>
      </div>
      <div class="control-group">
        <div class="control">Speed</div>
      </div>
      <div class="control-group">
        <h1>
          <font-awesome-icon
            class="control control-button"
            :icon="['fas', 'undo']"
            @click="$emit('reset')"/>
        </h1>
      </div>
      <div class="control-group">
        <h1><div class="control">Generation: {{ generation }}</div></h1>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "GameFooter",
  props: {
    playing: {
      type: Boolean,
      required: true,
    },
    generation: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="scss">

#game-footer {
  height: 60px;
  width: 100%;
  background-color: $darkGray;
  display: flex;
  justify-content: center;
  align-items: center;

  .controls {
    display: flex;
    flex-direction: row;

    .control-group {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 0 8px;

      .control {
        color: $primary;

        &:hover {
          cursor: pointer;
          filter: brightness(3);
        }
      }

      .control-button {
        padding: 0 8px;
        text-align: center;
      }
    }
  }
  
}

</style>