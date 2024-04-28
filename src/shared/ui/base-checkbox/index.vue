<template>
  <label :class="[styles.checkbox, styles[size]]">
    <CheckboxRoot v-bind="forwarded" :class="[styles.root, styles[size]]">
      <CheckboxIndicator :class="[styles.indicator, styles[size]]">
        <IconCheck />
      </CheckboxIndicator>
    </CheckboxRoot>

    <Typography
      v-if="$slots.default"
      :variant="checkboxVariants.label"
      :class="[styles.label, { [styles.disabled]: disabled }]"
    >
      <slot />
    </Typography>
  </label>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue';
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue';
import { computed } from 'vue';

import IconCheck from 'shared/icons/check.svg';
import { Typography } from 'shared/ui';

import styles from './styles.module.css';
import type { TypographyVariant } from '..';

export interface BaseCheckboxProps extends CheckboxRootProps {
  label?: string;
  size?: 'sm' | 's' | 'm';
}

defineSlots<{ default(props: object): never }>();

const props = withDefaults(defineProps<BaseCheckboxProps>(), { size: 'sm' });
const emits = defineEmits<CheckboxRootEmits>();

const checkboxRootProps = reactiveOmit(props, 'label');
const forwarded = useForwardPropsEmits(checkboxRootProps, emits);

const sizeToCheckboxVariants: Record<
  Required<BaseCheckboxProps>['size'],
  { label: TypographyVariant }
> = {
  sm: { label: 'text-m-0' },
  s: { label: 'text-s-1' },
  m: { label: 'text-m-0' },
};

const checkboxVariants = computed(() => sizeToCheckboxVariants[props.size]);
</script>
