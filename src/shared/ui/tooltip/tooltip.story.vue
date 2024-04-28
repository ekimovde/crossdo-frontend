<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="Top">
      <div style="padding: 80px">
        <TooltipProvider>
          <Tooltip>
            <template #trigger>
              <BaseButton>Hover over me</BaseButton>
            </template>
            Hello!
          </Tooltip>
        </TooltipProvider>
      </div>
    </Variant>

    <Variant title="Right">
      <div style="padding: 80px">
        <TooltipProvider>
          <Tooltip side="right">
            <template #trigger>
              <BaseButton>Hover over me</BaseButton>
            </template>
            Hello!
          </Tooltip>
        </TooltipProvider>
      </div>
    </Variant>

    <Variant title="Left">
      <div style="padding: 80px">
        <TooltipProvider>
          <Tooltip side="left">
            <template #trigger>
              <BaseButton>Hover over me</BaseButton>
            </template>
            Hello!
          </Tooltip>
        </TooltipProvider>
      </div>
    </Variant>

    <Variant title="Bottom">
      <div style="padding: 80px">
        <TooltipProvider>
          <Tooltip side="bottom">
            <template #trigger>
              <BaseButton>Hover over me</BaseButton>
            </template>
            Hello!
          </Tooltip>
        </TooltipProvider>
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { Tooltip, TooltipProvider } from './index';
import { BaseButton } from '../base-button';
</script>
