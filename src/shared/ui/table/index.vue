<template>
  <article :class="styles.table">
    <div :class="styles.wrapper">
      <div :class="styles.header" :style="{ gridTemplateColumns: displayedGridTemplateColumns }">
        <div v-for="column in columns" :key="column.key" :class="styles.column">
          <Typography as="span" variant="text-xs-1">{{ column.title }}</Typography>
        </div>
      </div>

      <div :class="styles.content">
        <div
          v-for="(item, rowIndex) in data"
          :key="rowIndex"
          :class="styles.row"
          :style="{ gridTemplateColumns: displayedGridTemplateColumns }"
        >
          <div v-for="(column, colIndex) in columns" :key="colIndex" :class="styles['row-column']">
            <slot :name="column.key" :item="item">
              <Typography as="p" variant="text-s-2">
                {{ item[column.key] }}
              </Typography>
            </slot>
          </div>
        </div>
      </div>
    </div>

    <slot name="pagination" />
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Typography } from 'shared/ui';

import styles from './styles.module.css';

export interface TableColumn {
  title: string;
  key: string;
}

export interface TableItem {
  [key: string]: unknown;
}

interface TableProps {
  columns: TableColumn[];
  data: TableItem[];
}

const props = defineProps<TableProps>();
const displayedGridTemplateColumns = computed(() => `repeat(${props.columns.length}, 1fr)`);
</script>
