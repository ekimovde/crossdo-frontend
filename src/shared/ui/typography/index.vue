<template>
  <component :is="element" :class="[variant, weight]">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { TypographyProps } from './types';
import { elementMaps, variantsMap, weightMap } from './types';

const props = defineProps<TypographyProps>();

const element = computed(() => props.as || elementMaps[props.variant]);
const variant = computed(() => variantsMap[props.variant]);
const weight = computed(() => props.weight && weightMap[props.weight]);
</script>
