<template>
  <div class="cell" :class="{ live: isLive }">
    <!-- {{i}}<br>{{j}} -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "GridCell",
  props: {
    i: {
      type: Number,
      required: true,
    },
    j: {
      type: Number,
      required: true,
    },
    isLive: {
      type: Boolean,
      required: true,
    }
  },
});
</script>

<style lang="scss">
.cell {
  border: 1px solid $lightGray;
  background-color: $medGray;
  flex: 1;
  font-size: 0.1em;

  &:hover {
    cursor: pointer;
    filter: brightness(1.75);
  }

  &.live {
    background-color: $primary;
  }
}

</style>