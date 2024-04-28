<template>
  <SliderRoot v-bind="forwarded" :class="styles.slider">
    <SliderTrack :class="styles.track">
      <SliderRange :class="styles.range" />
    </SliderTrack>
    <SliderThumb :class="styles.thumb" />
    <SliderThumb v-if="isRange" :class="styles.thumb" />
  </SliderRoot>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'radix-vue';
import type { SliderRootProps, SliderRootEmits } from 'radix-vue';

import styles from './styles.module.css';

export interface SliderProps extends SliderRootProps {
  /** If true, renders two thumbs and returns two numbers [num1, num2] */
  isRange?: boolean;
}

const props = defineProps<SliderProps>();
const emits = defineEmits<SliderRootEmits>();

const sliderRootProps = reactiveOmit(props, 'isRange');
const forwarded = useForwardPropsEmits(sliderRootProps, emits);
</script>
