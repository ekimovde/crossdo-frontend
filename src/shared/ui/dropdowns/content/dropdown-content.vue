<template>
  <DropdownMenuContent v-bind="forwarded" :class="styles.content">
    <slot />
  </DropdownMenuContent>
</template>

<script lang="ts" setup>
import {
  DropdownMenuContent,
  type DropdownMenuContentEmits,
  type DropdownMenuContentProps,
  useForwardPropsEmits,
} from 'radix-vue';

import styles from './styles.module.css';

const props = defineProps<DropdownMenuContentProps>();
const emit = defineEmits<DropdownMenuContentEmits>();
const forwarded = useForwardPropsEmits(props, emit);
</script>
