<template>
  <Modal
    :title="confirmStore.props?.title"
    :description="confirmStore.props?.description"
    :open="confirmStore.isOpen"
    :hide-close-icon="confirmStore.props?.hideCloseIcon"
    :max-width="confirmStore.props?.maxWidth"
    :z-index="confirmStore.props?.zIndex"
    size="l"
    type="confirm"
    @update:open="onClose"
  >
    <template #actions v-if="confirmStore.props">
      <BaseButton
        v-if="!confirmStore?.props.cancelButtonOnly"
        full
        type="primary"
        size="m"
        @click="onConfirm()"
      >
        {{ confirmStore.props?.confirmButtonText || 'Подтвердить' }}
      </BaseButton>

      <BaseButton full type="secondary" size="m" @click="onClose(false)">
        {{ confirmStore.props?.cancelButtonText || 'Отмена' }}
      </BaseButton>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { BaseButton } from 'shared/ui/base-button';

import { useConfirmStore } from './model';
import { Modal } from '../modal';

const confirmStore = useConfirmStore();

const onConfirm = (): void => {
  confirmStore.onClose(true);
};

const onClose = (value: boolean): void => {
  if (!value) {
    confirmStore.onClose(false);
  }
};
</script>
