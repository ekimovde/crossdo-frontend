<template>
  <DropdownMenuItem v-bind="forwarded" :class="styles.item">
    <slot />
  </DropdownMenuItem>
</template>

<script lang="ts" setup>
import type { DropdownMenuItemProps, DropdownMenuItemEmits } from 'radix-vue';
import { DropdownMenuItem, useForwardPropsEmits } from 'radix-vue';

import styles from './styles.module.css';

const props = defineProps<DropdownMenuItemProps>();
const emit = defineEmits<DropdownMenuItemEmits>();
const forwarded = useForwardPropsEmits(props, emit);
</script>
