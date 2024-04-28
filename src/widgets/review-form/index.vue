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
            :error="!!errors?.comment"
            :error-message="errors?.comment?.message"
            v-model:value="values.comment"
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
import { computed, watch } from 'vue';

import { addReview, reviewSchema, type ReviewCreate } from 'features/review';
import { BaseButton, BaseInput, Modal } from 'shared/ui';
import { openConfirm } from 'shared/ui/confirm/model';
import { useForm } from 'shared/utils/useForm';

import styles from './styles.module.css';

interface ReviewFormProps {
  title: string;
  actionTitle: string;
  courseId?: number;
  type: 'add' | 'edit';
}

type ReviewFormEmits = {
  reloaded: [value: null];
};

const props = defineProps<ReviewFormProps>();
const emit = defineEmits<ReviewFormEmits>();
const modelValue = defineModel<boolean>({ required: true });

const { values, errors, isLoading, submit, clearErrors } = useForm(reviewSchema);

const isTypeAdd = computed(() => props.type === 'add');

const isFormEdited = computed(() => Object.values(values).some(Boolean));

const onSubmit = submit(async () => {
  if (!isFormEdited.value) {
    modelValue.value = false;

    return;
  }

  if (isTypeAdd.value) {
    await onAddReview();
  }
});

const onAddReview = async (): Promise<void> => {
  const payload = createReviewAddRequestArgs();
  const { success } = await addReview(payload, props.courseId as number);

  if (success) {
    emit('reloaded', null);
    modelValue.value = false;

    return;
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

const createReviewAddRequestArgs = (): ReviewCreate => {
  return {
    rating: values.rating,
    comment: values.comment,
  };
};

const clearForm = (): void => {
  Object.keys(values).forEach((key) => {
    values[key as keyof typeof values] = '';
  });
};

watch(modelValue, (newValue: boolean) => {
  if (!newValue) return;

  clearForm();
  clearErrors();
});
</script>
