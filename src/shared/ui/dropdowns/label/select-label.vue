<template>
  <SelectLabel v-bind="forwarded" as-child :class="styles.label">
    <Typography variant="text-s-1">
      <slot />
    </Typography>
  </SelectLabel>
</template>

<script lang="ts" setup>
import type { SelectLabelProps } from 'radix-vue';
import { SelectLabel, useForwardPropsEmits } from 'radix-vue';

import { Typography } from 'shared/ui';

import styles from './styles.module.css';

const props = defineProps<SelectLabelProps>();
const forwarded = useForwardPropsEmits(props);
</script>
