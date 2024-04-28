<template>
  <div :class="styles.page">
    <div :class="styles.header">
      <Typography variant="h3">Потоки</Typography>

      <BaseButton type="primary" size="s" @click="isStreamFormOpen = true">
        <template #left-icon>
          <PlusIcon />
        </template>

        Добавить поток
      </BaseButton>
    </div>

    <Table v-if="streams.length" :columns="tableColumns" :data="streams">
      <template v-slot:description="{ item }">
        <div :class="styles.inner">
          <Typography as="p" variant="text-s-2">
            {{ item.description }}
          </Typography>

          <BaseButton type="flat" size="s" @click="onEditStream(item as unknown as Stream)">
            <template #left-icon>
              <EditIcon />
            </template>
          </BaseButton>
        </div>
      </template>

      <template #pagination>
        <Pagination
          :page="currentPage"
          :total="total"
          :items-per-page="pageSize"
          :sibling-count="1"
          :show-edges="true"
          :disabled="loading"
          @update-page="currentPage = $event"
        />
      </template>
    </Table>

    <EmptyPlaceholder v-else :description="displayedDescription" title="Нет добавленных потоков" />

    <StreamForm
      v-model="isStreamFormOpen"
      :type="displayedType"
      :title="displayedTitle"
      :action-title="displayedActionTitle"
      :course="editedStream"
      @reloaded="fetchStreams({ currentPage: page, currentPageSize: pageSize })"
    />
  </div>
</template>

<script setup lang="ts">
import { useOffsetPagination } from '@vueuse/core';
import { ref, computed, watch } from 'vue';
import { EmptyPlaceholder, StreamForm } from 'widgets/index';

import { getStreams, type Stream } from 'features/streams';
import EditIcon from 'shared/icons/edit.svg';
import PlusIcon from 'shared/icons/plus.svg';
import {
  Typography,
  BaseButton,
  Table,
  Pagination,
  type PaginationOptions,
  type TableColumn,
} from 'shared/ui';

import styles from './styles.module.css';

const isStreamFormOpen = ref(false);
const loading = ref(false);

const editedStream = ref<Stream>();
const streams = ref<Stream[]>([]);

const page = ref(1);
const pageSize = ref(10);
const total = ref(0);

const tableColumns: TableColumn[] = [
  { title: 'Название потока', key: 'name' },
  { title: 'Описание потока', key: 'description' },
];

const displayedDescription = computed(
  () => 'Чтобы добавить поток, нажмите на кнопку "Добавить поток"',
);
const displayedType = computed(() => (editedStream.value ? 'edit' : 'add'));
const displayedTitle = computed(() =>
  editedStream.value ? 'Редактирование потока' : 'Новый поток',
);
const displayedActionTitle = computed(() => (editedStream.value ? 'Сохранить' : 'Добавить'));

const onEditStream = (value: Stream): void => {
  editedStream.value = value;
  isStreamFormOpen.value = true;
};

const fetchStreams = async (options: PaginationOptions): Promise<void> => {
  const { currentPage, currentPageSize } = options;

  loading.value = true;

  // const { success, response } = await getStreams(currentPage, currentPageSize);

  // if (success && response) {
  //   total.value = response.total;
  //   courses.value = response.items;
  // }

  loading.value = false;
};

await fetchStreams({ currentPage: page.value, currentPageSize: pageSize.value });

const { currentPage } = useOffsetPagination({
  total: total.value,
  page: page.value,
  pageSize: pageSize.value,
  onPageChange: fetchStreams,
  onPageSizeChange: fetchStreams,
});

watch(isStreamFormOpen, (newValue: boolean) => {
  if (newValue) return;
  editedStream.value = undefined;
});
</script>
