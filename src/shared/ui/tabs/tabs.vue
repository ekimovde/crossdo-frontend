<template>
  <TabsRoot :class="styles.tabs" v-bind="forwarded">
    <slot />
  </TabsRoot>
</template>

<script setup lang="ts">
import { TabsRoot, useForwardPropsEmits } from 'radix-vue';
import type { TabsRootProps, TabsRootEmits } from 'radix-vue';

import styles from './styles.module.css';

export type TabsProps = TabsRootProps;

const props = defineProps<TabsProps>();
const emits = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
