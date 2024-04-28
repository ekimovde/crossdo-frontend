<template>
  <DropdownMenuRoot v-bind="forwarded">
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal :disabled="disablePortal">
      <DropdownContent :side-offset="20">
        <slot />
      </DropdownContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import {
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  useForwardPropsEmits,
} from 'radix-vue';
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from 'radix-vue';

import { DropdownContent } from '../content';

export interface DropdownProps extends DropdownMenuRootProps {
  /** By default, Dropdown renders inside the <body>, but this property can disable
   * the behaviour and render the Dropdown right where it is called. */
  disablePortal?: boolean;
}

const props = defineProps<DropdownProps>();
const emits = defineEmits<DropdownMenuRootEmits>();

const dropdownRootProps = reactiveOmit(props, 'disablePortal');
const forwarded = useForwardPropsEmits(dropdownRootProps, emits);
</script>
