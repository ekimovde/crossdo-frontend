<template>
  <div :class="styles.wrapper">
    <SwitchRoot v-bind="forwarded" :id="id" :class="styles.switch">
      <SwitchThumb :class="styles.thumb" />
    </SwitchRoot>

    <Typography v-if="label" as="label" :for="id" :class="styles.label" variant="text-s-0">
      {{ label }}
    </Typography>
  </div>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { SwitchRootProps, SwitchRootEmits } from 'radix-vue';
import { SwitchRoot, SwitchThumb, useForwardPropsEmits, useId } from 'radix-vue';

import { Typography } from 'shared/ui/typography';

import styles from './styles.module.css';

export interface BaseSwitchProps extends SwitchRootProps {
  label?: string;
}

const props = defineProps<BaseSwitchProps>();
const emits = defineEmits<SwitchRootEmits>();

const id = useId();

const switchRootProps = reactiveOmit(props, 'label');
const forwarded = useForwardPropsEmits(switchRootProps, emits);
</script>
