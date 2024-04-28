<template>
  <Story>
    <Variant title="Horizontal">
      <div style="width: 500px; padding: 16px">
        <Slider v-model="sliderValue" orientation="horizontal" :min="0" :max="100" />
      </div>
    </Variant>

    <Variant title="Vertical">
      <div style="width: 500px; height: 200px; padding: 16px">
        <Slider v-model="sliderValue" orientation="vertical" :min="0" :max="100" />
      </div>
    </Variant>

    <Variant title="Horizontal range">
      <div style="width: 500px; height: 200px; padding: 16px">
        <Slider is-range :min="0" :max="100" :min-steps-between-thumbs="5" v-model="sliderRange" />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Slider from './index.vue';

const sliderValue = ref([50]);
const sliderRange = ref([10, 90]);
</script>
