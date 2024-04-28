<template>
  <PaginationPrev v-bind="forwarded" :class="styles.button">
    <ChevronLeftIcon :class="styles.icon" />

    <Typography as="span" variant="text-s-1">Предыдущая</Typography>
  </PaginationPrev>
</template>

<script setup lang="ts">
import { PaginationPrev, useForwardPropsEmits, type PaginationPrevProps } from 'radix-vue';

import ChevronLeftIcon from 'shared/icons/chevron-left.svg';
import { Typography } from 'shared/ui';

import styles from './styles.module.css';

const props = defineProps<PaginationPrevProps>();
const forwarded = useForwardPropsEmits(props);
</script>
