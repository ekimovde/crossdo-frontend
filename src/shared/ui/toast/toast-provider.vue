<template>
  <ToastProvider v-bind="$props">
    <slot />

    <Toast
      v-if="toasts.activeToast"
      :key="toasts.activeToast.id"
      :open="!!toasts.activeToast.id"
      :title="toasts.activeToast.title"
      :description="toasts.activeToast.description"
      @update:open="toasts.removeFirstFromQueue"
    />

    <ToastViewport :class="styles.viewport" />
  </ToastProvider>
</template>

<script setup lang="ts">
import type { ToastProviderProps } from 'radix-vue';
import { ToastProvider, ToastViewport } from 'radix-vue';

import { useToastStore } from './model';
import styles from './styles.module.css';
import Toast from './toast.vue';

const toasts = useToastStore();

withDefaults(defineProps<ToastProviderProps>(), {
  duration: 3000,
});
</script>
