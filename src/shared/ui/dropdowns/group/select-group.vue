<template>
  <SelectGroup v-bind="forwarded" :class="styles.group">
    <slot />
  </SelectGroup>
</template>

<script lang="ts" setup>
import type { SelectGroupProps } from 'radix-vue';
import { SelectGroup, useForwardPropsEmits } from 'radix-vue';

import styles from './styles.module.css';

const props = defineProps<SelectGroupProps>();
const forwarded = useForwardPropsEmits(props);
</script>
