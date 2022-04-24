<template>
  <div
    class="cell"
    :class="{ live: isLive }"
    @click="handleCellClick">
    <!-- {{i}}<br>{{j}} -->
  </div>
</template>

<script lang="ts">
import { Cell } from "@/types/types";
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
  methods: {
    handleCellClick() {
      this.$emit("toggleCell", new Cell(this.i, this.j));
    },
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