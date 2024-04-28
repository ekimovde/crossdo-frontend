<template>
  <TabsContent :class="styles.content" :value="value">
    <slot />
  </TabsContent>
</template>

<script setup lang="ts">
import { TabsContent, type TabsContentProps } from 'radix-vue';

import styles from './styles.module.css';

defineProps<TabsContentProps>();
</script>
