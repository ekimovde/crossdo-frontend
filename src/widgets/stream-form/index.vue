<template>
  <Modal
    :open="modelValue"
    :close-on-click-outside="false"
    :header-title="title"
    max-width="780px"
    size="m"
    @update:open="onCloseModal"
  >
    <template #default>
      <form :class="styles.form" @submit.prevent="onSubmit">
        <fieldset :class="styles.fields">
          <BaseInput
            title="Название"
            size="l"
            variant="text"
            :required="true"
            :error="!!errors?.name"
            :error-message="errors?.name?.message"
            v-model:value="values.name"
          />

          <ComboboxSearch
            v-model="values.course"
            v-model:search-term="searchedCourse"
            label="Организация"
            :class="styles.combobox"
            :error="!!errors?.course"
            :error-message="errors?.course?.message"
            :display-value="(val) => (val as Course)?.title"
            :loading="coursePagination.loading"
            :has-next-page="coursePagination.hasNextPage"
            :required="true"
            :has-observer="true"
          >
            <template #default>
              <ComboboxSearchItem
                v-for="course in courses"
                :key="course.id"
                :value="course"
                :text-value="course.title"
              />
            </template>

            <template #empty-info> Не найдено результатов </template>
          </ComboboxSearch>
        </fieldset>

        <div :class="styles.inner">
          <typography variant="text-m-2"> Обшая информация: </typography>

          <fieldset :class="styles.fields">
            <BaseInput
              title="Общая стоимость"
              size="l"
              variant="text"
              :required="true"
              :error="!!errors?.totalCost"
              :error-message="errors?.totalCost?.message"
              v-model:value="values.totalCost"
            />

            <BaseInput
              title="Мин. количество участников"
              size="l"
              variant="text"
              :required="true"
              :error="!!errors?.minParticipants"
              :error-message="errors?.minParticipants?.message"
              v-model:value="values.minParticipants"
            />

            <BaseInput
              title="Макс. количество участников"
              size="l"
              variant="text"
              :required="true"
              :error="!!errors?.maxParticipants"
              :error-message="errors?.maxParticipants?.message"
              v-model:value="values.maxParticipants"
            />

            <BaseInput
              title="Продолжительность потока"
              size="l"
              variant="text"
              :required="true"
              :error="!!errors?.durationWeeks"
              :error-message="errors?.durationWeeks?.message"
              v-model:value="values.durationWeeks"
            />

            <BaseInput
              title="График"
              size="l"
              variant="text"
              :required="true"
              :error="!!errors?.schedule"
              :error-message="errors?.schedule?.message"
              v-model:value="values.schedule"
            />
          </fieldset>
        </div>

        <fieldset>
          <BaseTextarea
            title="Описание потока"
            size="s"
            max-length-text="100"
            :max-length="100"
            :error="!!errors?.description"
            :error-message="errors?.description?.message"
            v-model:value="values.description"
          />
        </fieldset>

        <fieldset :class="styles.action">
          <BaseButton :loading="isLoading" submit full type="primary" size="m">
            {{ actionTitle }}
          </BaseButton>
        </fieldset>
      </form>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { ref, reactive, computed, watch } from 'vue';

import { getCourses, type Course } from 'features/courses';
import {
  addStream,
  updateStream,
  streamSchema,
  type StreamCreate,
  type StreamUpdate,
  type Stream,
} from 'features/streams';
import {
  Typography,
  BaseButton,
  BaseInput,
  BaseTextarea,
  Modal,
  ComboboxSearch,
  ComboboxSearchItem,
} from 'shared/ui';
import { openConfirm } from 'shared/ui/confirm/model';
import { useForm } from 'shared/utils/useForm';

import styles from './styles.module.css';

interface StreamFormProps {
  title: string;
  actionTitle: string;
  stream?: Stream;
  type: 'add' | 'edit';
}

interface StreamFormPagination {
  loading: boolean;
  hasNextPage: boolean;
  page: number;
  pageSize: number;
}

type StreamFormEmits = {
  reloaded: [value: null];
};

const props = defineProps<StreamFormProps>();
const emit = defineEmits<StreamFormEmits>();
const modelValue = defineModel<boolean>({ required: true });

const { values, errors, isLoading, submit, clearErrors } = useForm(streamSchema);

const coursePagination = reactive<StreamFormPagination>({
  loading: false,
  hasNextPage: true,
  page: 1,
  pageSize: 10,
});

const searchedCourse = ref();
const courses = ref<Course[]>([]);

const isTypeAdd = computed(() => props.type === 'add');
const isTypeEdit = computed(() => props.type === 'edit');

const isFormEdited = computed(() => {
  if (isTypeAdd.value) {
    return Object.values(values).some(Boolean);
  }

  if (!props.stream) return false;

  const {
    course_id,
    name,
    description,
    total_cost,
    min_participants,
    max_participants,
    duration_weeks,
    schedule,
  } = props.stream;

  const isNameEdited = values.name !== name;
  const isDescriptionEdited = values.description !== description;
  const isTotalCostEdited = parseInt(values.totalCost) !== total_cost;
  const isMinParticipantsEdited = parseInt(values.minParticipants) !== min_participants;
  const isMaxParticipantsEdited = parseInt(values.maxParticipants) !== max_participants;
  const isDurationWeeksEdited = parseInt(values.durationWeeks) !== duration_weeks;
  const isScheduleEdited = values.schedule !== schedule;
  const isCourseEdited = values.course?.id !== course_id;

  return (
    isNameEdited ||
    isDescriptionEdited ||
    isTotalCostEdited ||
    isMinParticipantsEdited ||
    isMaxParticipantsEdited ||
    isDurationWeeksEdited ||
    isScheduleEdited ||
    isCourseEdited
  );
});

const onSubmit = submit(async () => {
  if (!isFormEdited.value) {
    modelValue.value = false;

    return;
  }

  if (isTypeAdd.value) {
    await onAddStream();
  }

  if (isTypeEdit.value) {
    await onUpdateStream();
  }
});

const onAddStream = async (): Promise<void> => {
  const payload = createStreamAddRequestArgs();
  const { success } = await addStream(payload);

  if (success) {
    emit('reloaded', null);
    modelValue.value = false;

    return;
  }
};

const onUpdateStream = async (): Promise<void> => {
  const payload = createStreamUpdateRequestArgs();
  const { success } = await updateStream(payload, props.stream?.id as number);

  if (success) {
    emit('reloaded', null);
    modelValue.value = false;
  }
};

const onGetCourses = async (): Promise<void> => {
  coursePagination.loading = true;

  const { page, pageSize } = coursePagination;
  const { success, response } = await getCourses(page, pageSize, searchedCourse.value);

  if (success && response?.items.length) {
    const { page, total_pages } = response;
    const tempResults = response.items.map((item) => ({ id: item.id, title: item.title }));

    courses.value = (page === 1 ? tempResults : [...courses.value, ...tempResults]) as Course[];
    coursePagination.hasNextPage = page < total_pages;
  } else {
    courses.value = [];
    coursePagination.hasNextPage = false;
  }

  coursePagination.loading = false;
};

const onCloseModal = async (value: boolean): Promise<void> => {
  if (isFormEdited.value) {
    const isConfirmed = await openConfirm({
      title: 'Вы действительно хотите закрыть форму?',
      description: 'Все несохраненные данные будут удалены',
      confirmButtonText: 'Да',
      cancelButtonText: 'Нет',
      hideCloseIcon: true,
      maxWidth: '400px',
      zIndex: 6,
    });

    if (isConfirmed) {
      modelValue.value = false;
      clearErrors();
    }

    return;
  }

  modelValue.value = value;
  clearErrors();
};

const createStreamAddRequestArgs = (): StreamCreate => {
  return {
    course_id: values.course.id as unknown as number,
    name: values.name,
    description: values.description,
    total_cost: parseInt(values.totalCost),
    min_participants: parseInt(values.minParticipants),
    max_participants: parseInt(values.maxParticipants),
    duration_weeks: parseInt(values.durationWeeks),
    schedule: values.schedule,
  };
};

const createStreamUpdateRequestArgs = (): StreamUpdate => {
  return {
    course_id: values.course.id as unknown as number,
    name: values.name,
    description: values.description,
    total_cost: parseInt(values.totalCost),
    min_participants: parseInt(values.minParticipants),
    max_participants: parseInt(values.maxParticipants),
    duration_weeks: parseInt(values.durationWeeks),
    schedule: values.schedule,
    has_started: props.stream?.has_started ?? false,
  };
};

const clearForm = (): void => {
  values.course = undefined as unknown as Course;
  values.name = '';
  values.description = '';
  values.totalCost = '';
  values.minParticipants = '';
  values.maxParticipants = '';
  values.durationWeeks = '';
  values.schedule = '';
};

const updateForm = (): void => {
  if (!props.stream || isTypeAdd.value) return;

  const { stream } = props;

  values.name = stream.name;
  values.description = stream.description;

  values.description = stream.description;
  values.description = stream.description;
  values.description = stream.description;
  values.description = stream.description;
  values.description = stream.description;
  values.description = stream.description;
};

watch(modelValue, (newValue: boolean) => {
  if (!newValue) return;

  clearForm();
  clearErrors();
  updateForm();
});

watchDebounced(
  searchedCourse,
  async () => {
    coursePagination.page = 1;

    await onGetCourses();
  },
  { debounce: 500, maxWait: 1000 },
);
</script>
