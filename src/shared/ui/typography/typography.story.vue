<template>
  <Story>
    <Variant title="default">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <Typography v-for="key in keys" :key="key" :variant="key">
          {{ key }}: {{ text }}
        </Typography>
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import Typography from './index.vue';
import { variantsMap, type TypographyVariant } from './types';

const keys = Object.keys(variantsMap) as TypographyVariant[];
const text = 'The quick brown fox jumps over the lazy dog.';
</script>
