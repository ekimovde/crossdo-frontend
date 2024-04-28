<template>
  <Story>
    <Variant title="default">
      <Confirm />
      <BaseButton @click="onConfirm">Click me</BaseButton>
      <p class="font-h2">Is confirmed: {{ isConfirmed }}</p>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { BaseButton } from 'shared/ui/base-button';

import { openConfirm, Confirm } from './index';

const isConfirmed = ref<string>('');

const onConfirm = async (): Promise<void> => {
  isConfirmed.value = (
    await openConfirm({
      title: 'Сохраните, чтобы не потерять',
      description: 'Ваши изменения будут потеряны, если вы их не сохраните',
      cancelButtonText: 'Отстань',
      confirmButtonText: 'Давай уже',
    })
  ).toString();
};
</script>
