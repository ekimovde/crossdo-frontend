<template>
  <TooltipRoot v-bind="forward">
    <TooltipTrigger as-child>
      <slot name="trigger" />
    </TooltipTrigger>

    <TooltipPortal :disabled="disablePortal">
      <TooltipContent avoid-collisions :side="side" :side-offset="offset" :class="styles.tooltip">
        <TooltipArrow :class="styles.arrow" />
        <slot />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
  useForwardPropsEmits,
} from 'radix-vue';
import type { TooltipRootEmits, TooltipRootProps, TooltipContentProps } from 'radix-vue';

import styles from './styles.module.css';

export interface TooltipProps extends TooltipRootProps {
  /** By default, Tooltip renders inside the <body>, but this property can disable
   * the behaviour and render the Tooltip right where it is called. */
  disablePortal?: boolean;
  /** How far in pixels should the tooltip be from the trigger */
  offset?: number;
  /** Where to position the tooltip: left, right, bottom or top */
  side?: TooltipContentProps['side'];
}

const props = withDefaults(defineProps<TooltipProps>(), { delayDuration: 100 });
const emit = defineEmits<TooltipRootEmits>();

const tooltipRootProps = reactiveOmit(props, 'disablePortal', 'offset', 'side');
const forward = useForwardPropsEmits(tooltipRootProps, emit);
</script>
