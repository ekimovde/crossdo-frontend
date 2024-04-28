<template>
  <div :style="`height: ${height}px`" :class="styles.wrapper" />
</template>

<script lang="ts" setup>
import styles from './styles.module.css';

export interface SkeletonProps {
  height: number | string;
}

defineProps<SkeletonProps>();
</script>
