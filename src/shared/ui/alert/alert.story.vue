<template>
  <Story>
    <Variant title="type 500">
      <BaseButton @click="isError500Open = true">Click me</BaseButton>
      <Alert v-model="isError500Open" type="500" />
    </Variant>

    <Variant title="type 400">
      <BaseButton @click="isError400Open = true">Click me</BaseButton>
      <Alert v-model="isError400Open" type="400" />
    </Variant>

    <Variant title="type 429">
      <BaseButton @click="isError429Open = true">Click me</BaseButton>
      <Alert v-model="isError429Open" type="429" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Alert from './index.vue';
import { BaseButton } from '../base-button';

const isError500Open = ref(false);
const isError400Open = ref(false);
const isError429Open = ref(false);
</script>
