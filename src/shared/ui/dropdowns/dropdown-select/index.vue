<template>
  <SelectRoot v-bind="forwarded">
    <SelectTrigger :class="styles.trigger" :aria-label="placeholder">
      <Typography :class="[styles.label, { [styles.filled]: props.modelValue }]" variant="text-s-1">
        <SelectValue :placeholder="placeholder" />
      </Typography>

      <ChevronDownIcon />
    </SelectTrigger>

    <SelectPortal :disabled="disablePortal">
      <DropdownSelectContent>
        <slot />
      </DropdownSelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { SelectRootProps, SelectRootEmits } from 'radix-vue';
import {
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  useForwardPropsEmits,
} from 'radix-vue';

import ChevronDownIcon from 'shared/icons/chevron-down.svg';
import { Typography } from 'shared/ui';

import styles from './styles.module.css';
import { DropdownSelectContent } from '../content';

export interface DropdownSelectProps extends SelectRootProps {
  /** By default, DropdownSelect renders inside the <body>, but this property can disable
   * the behaviour and render the DropdownSelect right where it is called. */
  disablePortal?: boolean;
  placeholder?: string;
}

const props = defineProps<DropdownSelectProps>();
const emits = defineEmits<SelectRootEmits>();

const selectRootProps = reactiveOmit(props, 'disablePortal', 'placeholder');
const forwarded = useForwardPropsEmits(selectRootProps, emits);
</script>
