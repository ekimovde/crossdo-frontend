<template>
  <SelectContent v-bind="forwarded" :class="styles.content">
    <SelectViewport>
      <slot />
    </SelectViewport>
  </SelectContent>
</template>

<script lang="ts" setup>
import {
  SelectContent,
  type SelectContentProps,
  type SelectContentEmits,
  useForwardPropsEmits,
  SelectViewport,
} from 'radix-vue';

import styles from './styles.module.css';

const props = defineProps<SelectContentProps>();
const emit = defineEmits<SelectContentEmits>();
const forwarded = useForwardPropsEmits(props, emit);
</script>
