<template>
  <footer id="game-footer">
    <div class="controls">
      <div class="play-pause">Play/Pause</div>
      <div class="step">
        <div>Back</div>
        <div>Next</div>
      </div>
      <div class="speed">Speed</div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "GameFooter",

});
</script>

<style lang="scss">

#game-footer {
  height: 60px;
  width: 100%;
  background-color: $darkGray;
  
}

</style>