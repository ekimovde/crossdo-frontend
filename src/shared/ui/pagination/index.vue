<template>
  <PaginationRoot v-bind="forwarded" @update:page="onChangePage">
    <PaginationList :class="styles.pagination" v-slot="{ items }">
      <PaginationPrevButton />

      <div :class="styles.pages">
        <template v-for="(page, index) in items">
          <PaginationPage
            v-if="page.type === 'page'"
            :key="index"
            :value="page.value"
            :current-page="props.page"
          />
        </template>
      </div>

      <PaginationNextButton />
    </PaginationList>
  </PaginationRoot>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import {
  PaginationList,
  PaginationRoot,
  useForwardPropsEmits,
  type PaginationRootEmits,
  type PaginationRootProps,
} from 'radix-vue';

import { PaginationPrevButton, PaginationNextButton } from './button';
import { PaginationPage } from './pages';
import styles from './styles.module.css';

export type PaginationOptions = { currentPage: number; currentPageSize: number };

type PaginationEmits = PaginationRootEmits & {
  'update-page': [value: number];
};

const props = withDefaults(defineProps<PaginationRootProps>(), { page: 1 });
const emit = defineEmits<PaginationEmits>();

const comboboxRootProps = reactiveOmit(props);
const forwarded = useForwardPropsEmits(comboboxRootProps, emit);

const onChangePage = (newPage: number): void => {
  if (newPage === props.page) return;

  emit('update-page', newPage);
};
</script>
