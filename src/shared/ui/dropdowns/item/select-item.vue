<template>
  <SelectItem v-bind="forwarded" :class="styles.item">
    <i v-if="icon" :class="styles.icon">
      <component :is="icon" />
    </i>

    <SelectItemText as-child>
      <Typography :class="styles.label" variant="text-s-1">
        {{ textValue || value }}
      </Typography>
    </SelectItemText>
  </SelectItem>
</template>

<script lang="ts" setup>
import { reactiveOmit } from '@vueuse/core';
import type { SelectItemProps } from 'radix-vue';
import { SelectItem, SelectItemText, useForwardPropsEmits } from 'radix-vue';

import { Typography } from 'shared/ui';

import styles from './styles.module.css';

export interface DropdownSelectItemProps extends SelectItemProps {
  icon?: object | string;
}

const props = defineProps<DropdownSelectItemProps>();
const selectItemProps = reactiveOmit(props, 'icon');
const forwarded = useForwardPropsEmits(selectItemProps);
</script>
