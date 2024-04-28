<template>
  <TabsList :class="styles.list" :aria-label="label" :loop="loop">
    <slot />
  </TabsList>
</template>

<script setup lang="ts">
import { TabsList, type TabsListProps } from 'radix-vue';

import styles from './styles.module.css';

defineProps<TabsListProps & { label?: string }>();
</script>
