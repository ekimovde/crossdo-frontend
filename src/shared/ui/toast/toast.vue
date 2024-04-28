<template>
  <ToastRoot v-bind="forwarded" :class="styles.toast">
    <div :class="styles.texts">
      <ToastTitle as-child>
        <Typography variant="text-m-1">
          {{ title }}
        </Typography>
      </ToastTitle>

      <ToastDescription v-if="description">
        <Typography variant="text-s-0">
          {{ description }}
        </Typography>
      </ToastDescription>
    </div>

    <ToastClose :class="styles.close">
      <CloseIcon />
    </ToastClose>
  </ToastRoot>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { ToastRootProps, ToastRootEmits } from 'radix-vue';
import {
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  useForwardPropsEmits,
} from 'radix-vue';

import CloseIcon from 'shared/icons/close.svg';
import { Typography } from 'shared/ui';

import type { ToastProps } from './model';
import styles from './styles.module.css';

const props = defineProps<ToastProps & ToastRootProps>();
const toastRootProps = reactiveOmit(props, 'title', 'description');
const emits = defineEmits<ToastRootEmits>();

const forwarded = useForwardPropsEmits(toastRootProps, emits);
</script>
