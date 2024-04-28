<template>
  <Story>
    <Variant title="Open on click">
      <BaseButton @click="open">Open toast</BaseButton>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { openToast } from './index';
import { BaseButton } from '../base-button';

const open = (): void => {
  openToast({
    title: 'Произошла ошибка!',
    description: 'Неверно введены данные',
  });
};
</script>
