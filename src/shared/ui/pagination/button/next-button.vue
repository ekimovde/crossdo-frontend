<template>
  <PaginationNext v-bind="forwarded" :class="styles.button">
    <Typography as="span" variant="text-s-1">Следующая</Typography>

    <ChevronRightIcon :class="styles.icon" />
  </PaginationNext>
</template>

<script setup lang="ts">
import { PaginationNext, useForwardPropsEmits, type PaginationNextProps } from 'radix-vue';

import ChevronRightIcon from 'shared/icons/chevron-right.svg';
import { Typography } from 'shared/ui';

import styles from './styles.module.css';

const props = defineProps<PaginationNextProps>();
const forwarded = useForwardPropsEmits(props);
</script>
