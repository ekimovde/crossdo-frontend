<template>
  <SelectSeparator v-bind="forwarded" :class="styles.separator" />
</template>

<script lang="ts" setup>
import type { SelectSeparatorProps } from 'radix-vue';
import { SelectSeparator, useForwardPropsEmits } from 'radix-vue';

import styles from './styles.module.css';

const props = defineProps<SelectSeparatorProps>();
const forwarded = useForwardPropsEmits(props);
</script>
