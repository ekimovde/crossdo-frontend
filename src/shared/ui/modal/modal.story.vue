<template>
  <Story>
    <Variant title="default">
      <BaseButton @click="isOpen = true">Click me</BaseButton>
      <BaseButton @click="isOpen2 = true">Click outside doesnt close modal</BaseButton>

      <Modal
        header-title="Hello!"
        description="This is some additional text"
        size="s"
        v-model:open="isOpen"
      >
        <template #actions="{ close }">
          <BaseButton @click="close">Close this modal</BaseButton>
        </template>
      </Modal>

      <Modal
        header-title="Hello!"
        description="This is some additional text"
        v-model:open="isOpen2"
        :close-on-click-outside="false"
      >
        <template #actions="{ close }">
          <BaseButton @click="close">Close this modal</BaseButton>
        </template>
      </Modal>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { BaseButton } from 'shared/ui/base-button';

import Modal from './index.vue';

const isOpen = ref(false);
const isOpen2 = ref(false);
</script>
