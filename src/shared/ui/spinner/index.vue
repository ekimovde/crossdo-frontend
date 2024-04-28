<template>
  <i :style="spinnerStyle" :class="styles.spinner" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import styles from './styles.module.css';

export interface SpinnerProps {
  size?: number | string;
  color?: 'primary' | 'white';
}

const props = withDefaults(defineProps<SpinnerProps>(), { size: '20px', color: 'primary' });

const spinnerStyle = computed(() => {
  let colorStyle = {};
  if (props.color === 'primary') {
    colorStyle = {
      '--spinner-color': '#17B26A',
      '--spinner-track-color': '#1ad07b',
    };
  } else if (props.color === 'white') {
    colorStyle = {
      '--spinner-color': '#FFFFFF',
      '--spinner-track-color': '#FFFFFF99',
    };
  }

  return {
    ...colorStyle,
    '--spinner-size': isNaN(props.size as number) ? props.size : `${props.size}px`,
  };
});
</script>
