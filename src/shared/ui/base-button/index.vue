<template>
  <button
    :type="submit ? 'submit' : 'button'"
    :disabled="isDisabled"
    :class="[
      styles.button,
      styles[size],
      styles[type],
      {
        [styles['full']]: full,
        [styles.iconOnly]: $slots['left-icon'] && !$slots['default'] && !$slots['right-icon'],
      },
    ]"
  >
    <Spinner v-if="loading" :size="spinnerSize" :color="spinnerColor" />

    <template v-else-if="empty">
      <slot />
    </template>

    <template v-else>
      <span v-if="$slots['left-icon']" :class="iconStyles">
        <slot name="left-icon" />
      </span>

      <Typography v-if="$slots['default']" :variant="typographyVariant" :class="styles.text">
        <slot />
      </Typography>

      <span v-if="$slots['right-icon']" :class="iconStyles">
        <slot name="right-icon" />
      </span>
    </template>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { TypographyVariant } from 'shared/ui';
import { Spinner } from 'shared/ui/spinner';
import { Typography } from 'shared/ui/typography';

import styles from './styles.module.css';

export interface BaseButtonProps {
  submit?: boolean;
  type?: 'primary' | 'secondary' | 'outline' | 'flat' | 'default' | 'tertiary' | 'dark';
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
  empty?: boolean;
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'primary',
  size: 'm',
  disabled: false,
  loading: false,
  full: false,
  empty: false,
});

defineSlots<{
  default(props: object): never;
  'left-icon'(props: object): never;
  'right-icon'(props: object): never;
}>();

const isDisabled = computed(() => props.disabled || props.loading);

const sizeToTypographyMap: Record<Required<BaseButtonProps>['size'], TypographyVariant> = {
  s: 'text-m-1',
  m: 'text-m-1',
  l: 'text-m-1',
};
const typographyVariant = computed<TypographyVariant>(() => sizeToTypographyMap[props.size]);

const sizeToSpinnerSizeMap: Record<Required<BaseButtonProps>['size'], number> = {
  s: 12,
  m: 16,
  l: 16,
};
const spinnerSize = computed<number>(() => sizeToSpinnerSizeMap[props.size]);

const spinnerColor = computed((): 'primary' | 'white' => {
  return props.type === 'primary' ? 'white' : 'primary';
});

const iconStyles = computed<string[]>(() => {
  const classes = [styles.icon, styles[props.type]];

  if (isDisabled.value) {
    classes.push(styles.disabled);
  }

  return classes;
});
</script>
