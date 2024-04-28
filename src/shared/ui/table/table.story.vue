<template>
  <Story>
    <Variant title="default">
      <Table :columns="tableColumns" :data="tableData" />
    </Variant>

    <Variant title="custom column">
      <Table :columns="tableColumns" :data="tableData">
        <template v-slot:column1="{ item }">
          <Typography as="span" variant="text-l-3"> {{ item.column1 }} Custom </Typography>
        </template>
      </Table>
    </Variant>

    <Variant title="pagination slot">
      <Table :columns="tableColumns" :data="tableData">
        <template #pagination>
          <Pagination
            v-model:page="currentPage"
            :total="tableData.length"
            :items-per-page="2"
            :sibling-count="1"
            :show-edges="true"
          />
        </template>
      </Table>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Table from './index.vue';
import Pagination from '../pagination/index.vue';
import Typography from '../typography/index.vue';

const currentPage = ref(1);

const tableColumns = [
  { title: 'Колонка #1', key: 'column1' },
  { title: 'Колонка #1', key: 'column2' },
];

const tableData = [
  { id: 0, column1: 'Название организации #1', column2: 'Внутреннее название организации' },
  { id: 1, column1: 'Название организации #2', column2: 'Внутреннее название организации' },
  { id: 2, column1: 'Название организации #3', column2: 'Внутреннее название организации' },
  { id: 3, column1: 'Название организации #4', column2: 'Внутреннее название организации' },
  { id: 4, column1: 'Название организации #5', column2: 'Внутреннее название организации' },
  { id: 5, column1: 'Название организации #6', column2: 'Внутреннее название организации' },
];
</script>
