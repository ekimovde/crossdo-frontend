<template>
  <div :class="styles.page">
    <div :class="styles.header">
      <Typography variant="h3">Курсы</Typography>

      <BaseButton type="primary" size="s" @click="isCourseFormOpen = true">
        <template #left-icon>
          <PlusIcon />
        </template>

        Добавить курс
      </BaseButton>
    </div>

    <Table v-if="courses.length" :columns="tableColumns" :data="courses">
      <template v-slot:description="{ item }">
        <div :class="styles.inner">
          <Typography as="p" variant="text-s-2">
            {{ item.description }}
          </Typography>

          <div :class="styles.actions">
            <BaseButton type="flat" size="s" @click="onEditCourse(item as unknown as Course)">
              <template #left-icon>
                <EditIcon />
              </template>
            </BaseButton>

            <BaseButton type="flat" size="s" @click="onAddReview(item as unknown as Course)">
              <template #left-icon>
                <CommentIcon />
              </template>
            </BaseButton>
          </div>
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

    <EmptyPlaceholder v-else :description="displayedDescription" title="Нет добавленных курсов" />

    <CourseForm
      v-model="isCourseFormOpen"
      :type="displayedType"
      :title="displayedTitle"
      :action-title="displayedActionTitle"
      :course="editedCourse"
      @reloaded="fetchCourses({ currentPage: page, currentPageSize: pageSize })"
    />

    <ReviewForm
      v-model="isReviewFormOpen"
      title="Новая рецензия"
      action-title="Добавить"
      type="add"
      :course-id="courseReviewId"
    />
  </div>
</template>

<script setup lang="ts">
import { useOffsetPagination } from '@vueuse/core';
import { ref, computed, watch } from 'vue';
import { EmptyPlaceholder, CourseForm, ReviewForm } from 'widgets/index';

import { getCourses, type Course } from 'features/courses';
import CommentIcon from 'shared/icons/comment.svg';
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

const isCourseFormOpen = ref(false);
const isReviewFormOpen = ref(false);
const loading = ref(false);

const editedCourse = ref<Course>();
const courseReviewId = ref<number>();
const courses = ref<Course[]>([]);

const page = ref(1);
const pageSize = ref(10);
const total = ref(0);

const tableColumns: TableColumn[] = [
  { title: 'Название курса', key: 'title' },
  { title: 'Описание курса', key: 'description' },
];

const displayedDescription = computed(
  () => 'Чтобы добавить курс, нажмите на кнопку "Добавить курс"',
);
const displayedType = computed(() => (editedCourse.value ? 'edit' : 'add'));
const displayedTitle = computed(() => (editedCourse.value ? 'Редактирование курса' : 'Новый курс'));
const displayedActionTitle = computed(() => (editedCourse.value ? 'Сохранить' : 'Добавить'));

const onEditCourse = (value: Course): void => {
  editedCourse.value = value;
  isCourseFormOpen.value = true;
};

const onAddReview = async (value: Course): Promise<void> => {
  courseReviewId.value = value.id;
  isReviewFormOpen.value = true;
};

const fetchCourses = async (options: PaginationOptions): Promise<void> => {
  const { currentPage, currentPageSize } = options;

  loading.value = true;

  const { success, response } = await getCourses(currentPage, currentPageSize);

  if (success && response) {
    total.value = response.total;
    courses.value = response.items;
  }

  loading.value = false;
};

await fetchCourses({ currentPage: page.value, currentPageSize: pageSize.value });

const { currentPage } = useOffsetPagination({
  total: total.value,
  page: page.value,
  pageSize: pageSize.value,
  onPageChange: fetchCourses,
  onPageSizeChange: fetchCourses,
});

watch(isCourseFormOpen, (newValue: boolean) => {
  if (newValue) return;
  editedCourse.value = undefined;
});

watch(isReviewFormOpen, (newValue: boolean) => {
  if (newValue) return;
  courseReviewId.value = undefined;
});
</script>
