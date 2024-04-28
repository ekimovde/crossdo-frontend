<template>
  <ComboboxItem v-bind="forwarded" :class="styles.item">
    <Typography as="span" variant="text-s-1">
      {{ textValue || value }}
    </Typography>

    <ComboboxItemIndicator :class="styles.indicator">
      <CheckBigIcon />
    </ComboboxItemIndicator>
  </ComboboxItem>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import {
  ComboboxItem,
  ComboboxItemIndicator,
  useForwardPropsEmits,
  type ComboboxItemProps as RadixComboboxItemProps,
  type ComboboxItemEmits,
} from 'radix-vue';

import CheckBigIcon from 'shared/icons/check-big.svg';
import { Typography } from 'shared/ui';

import styles from './styles.module.css';

interface ComboboxItemProps extends RadixComboboxItemProps {
  icon?: object | string;
}

const props = defineProps<ComboboxItemProps>();
const emit = defineEmits<ComboboxItemEmits>();

const comboboxItemProps = reactiveOmit(props, 'icon');
const forwarded = useForwardPropsEmits(comboboxItemProps, emit);
</script>
