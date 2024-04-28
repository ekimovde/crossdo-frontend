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
            :error="!!errors?.title"
            :error-message="errors?.title?.message"
            v-model:value="values.title"
          />

          <BaseInput
            title="Ссылка на курс"
            size="l"
            variant="text"
            :required="true"
            :error="!!errors?.courseUrl"
            :error-message="errors?.courseUrl?.message"
            v-model:value="values.courseUrl"
          />
        </fieldset>

        <div :class="styles.inner">
          <typography variant="text-m-2"> Обшая информация: </typography>

          <fieldset>
            <BaseTextarea
              title="Описание курса"
              size="s"
              max-length-text="100"
              :max-length="100"
              :error="!!errors?.description"
              :error-message="errors?.description?.message"
              v-model:value="values.description"
            />
          </fieldset>
        </div>

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
import { computed, watch } from 'vue';

import {
  addCourse,
  updateCourse,
  courseSchema,
  type CourseCreate,
  type CourseUpdate,
  type Course,
} from 'features/courses';
import { Typography, BaseButton, BaseInput, BaseTextarea, Modal } from 'shared/ui';
import { openConfirm } from 'shared/ui/confirm/model';
import { useForm } from 'shared/utils/useForm';

import styles from './styles.module.css';

interface CourseFormProps {
  title: string;
  actionTitle: string;
  course?: Course;
  type: 'add' | 'edit';
}

type CourseFormEmits = {
  reloaded: [value: null];
};

const props = defineProps<CourseFormProps>();
const emit = defineEmits<CourseFormEmits>();
const modelValue = defineModel<boolean>({ required: true });

const { values, errors, isLoading, submit, clearErrors } = useForm(courseSchema);

const isTypeAdd = computed(() => props.type === 'add');
const isTypeEdit = computed(() => props.type === 'edit');

const isFormEdited = computed(() => {
  if (isTypeAdd.value) {
    return Object.values(values).some(Boolean);
  }

  if (!props.course) return false;

  const { title, description, course_url } = props.course;

  const isTitleEdited = values.title !== title;
  const isDescriptionEdited = values.description !== description;
  const isCourseUrlEdited = values.courseUrl !== course_url;

  return isTitleEdited || isDescriptionEdited || isCourseUrlEdited;
});

const onSubmit = submit(async () => {
  if (!isFormEdited.value) {
    modelValue.value = false;

    return;
  }

  if (isTypeAdd.value) {
    await onAddCourse();
  }

  if (isTypeEdit.value) {
    await onUpdateCourse();
  }
});

const onAddCourse = async (): Promise<void> => {
  const payload = createCourseRequestArgs();
  const { success } = await addCourse(payload);

  if (success) {
    emit('reloaded', null);
    modelValue.value = false;

    return;
  }
};

const onUpdateCourse = async (): Promise<void> => {
  const payload = createCourseRequestArgs();
  const { success } = await updateCourse(payload, props.course?.id as number);

  if (success) {
    emit('reloaded', null);
    modelValue.value = false;
  }
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

const createCourseRequestArgs = (): CourseCreate | CourseUpdate => {
  return {
    title: values.title,
    description: values.description,
    course_url: values.courseUrl,
  };
};

const clearForm = (): void => {
  Object.keys(values).forEach((key) => {
    values[key as keyof typeof values] = '';
  });
};

const updateForm = (): void => {
  if (!props.course || isTypeAdd.value) return;

  const { course } = props;

  values.title = course.title;
  values.description = course.description;
  values.courseUrl = course.course_url;
};

watch(modelValue, (newValue: boolean) => {
  if (!newValue) return;

  clearForm();
  clearErrors();
  updateForm();
});
</script>
