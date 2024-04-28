<template>
  <Modal v-model:open="modelValue" disablePortal :hide-close-icon="true" max-width="514px">
    <template #default="{ close }">
      <div :class="styles.alert">
        <img src="./assets/container.png" alt="Picture" :class="styles.picture" />

        <div :class="styles.wrapper">
          <div :class="styles.content">
            <Typography variant="h3">
              {{ displayedTitle }}
            </Typography>

            <Typography v-if="displayedDescription" variant="caption-m">
              {{ displayedDescription }}
            </Typography>
          </div>

          <BaseButton type="primary" size="l" @click="close">
            <template #left-icon>
              <ChevronLeftIcon />
            </template>

            Вернуться назад
          </BaseButton>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import ChevronLeftIcon from 'shared/icons/chevron-left.svg';
import { Modal, Typography, BaseButton } from 'shared/ui';

import styles from './styles.module.css';

export interface AlertProps {
  type: '400' | '429' | '500';
}

const props = defineProps<AlertProps>();

const errors = {
  400: {
    title: 'Данные введены неверно',
    description: 'Проверьте правильность введенных данных',
  },
  429: {
    title: 'Слишком много запросов, попробуйте позже',
    description: '',
  },
  500: {
    title: 'Что-то пошло не так',
    description:
      'На сервере произошла непредвиденная ошибка. Пожалуйста, подождите, она вскоре будет исправленна',
  },
};

const displayedTitle = computed(() => errors[props.type].title);
const displayedDescription = computed(() => errors[props.type].description);

const modelValue = defineModel<boolean>({ required: true });
</script>
