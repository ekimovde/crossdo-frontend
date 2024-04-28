<template>
  <Confirm />

  <ToastProvider>
    <TooltipProvider>
      <slot />
    </TooltipProvider>
  </ToastProvider>
</template>

<script setup lang="ts">
import './variables.css';

import { Confirm } from '../confirm';
import { ToastProvider } from '../toast';
import { TooltipProvider } from '../tooltip';
</script>
