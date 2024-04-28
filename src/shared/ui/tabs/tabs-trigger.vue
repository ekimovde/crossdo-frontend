<template>
  <TabsTrigger as-child :class="styles.tab" :value="value" :disabled="disabled">
    <Typography variant="text-s-1">
      <slot />
    </Typography>
  </TabsTrigger>
</template>

<script setup lang="ts">
import { TabsTrigger, type TabsTriggerProps } from 'radix-vue';

import { Typography } from 'shared/ui';

import styles from './styles.module.css';

defineProps<TabsTriggerProps>();
</script>
