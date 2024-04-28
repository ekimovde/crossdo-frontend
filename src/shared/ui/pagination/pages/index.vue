<template>
  <PaginationListItem
    v-bind="forwarded"
    :value="value"
    :class="[styles.button, { [styles.active]: isActive }]"
  >
    <Typography as="span" variant="text-s-3">
      {{ value }}
    </Typography>
  </PaginationListItem>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { PaginationListItem, useForwardPropsEmits, type PaginationListItemProps } from 'radix-vue';
import { computed } from 'vue';

import { Typography } from 'shared/ui';

import styles from './styles.module.css';

interface PaginationPagesProps extends PaginationListItemProps {
  currentPage: number;
}

const props = defineProps<PaginationPagesProps>();

const comboboxRootProps = reactiveOmit(props, 'value', 'currentPage');
const forwarded = useForwardPropsEmits(comboboxRootProps);

const isActive = computed(() => props.value === props.currentPage);
</script>
