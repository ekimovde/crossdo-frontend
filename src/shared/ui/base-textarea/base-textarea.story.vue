<template>
  <Story class="textares">
    <Variant title="text" class="textares-row">
      <BaseTextarea v-model:value="textarea" title="empty" />

      <BaseTextarea v-model:value="textarea" title="disabled" disabled />

      <BaseTextarea
        v-model:value="invalidStirng"
        title="invalid empty field"
        style="margin-bottom: 16px"
        :error="error"
        :errorMessage="errorMessage"
      />

      <BaseTextarea
        v-model:value="textareaText"
        title="invalid filled field"
        style="margin-bottom: 24px"
        :error="error"
        :errorMessage="errorMessage"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseTextarea from './index.vue';

const invalidStirng = ref(
  'Длинное сообщение Длинное сообщение Длинное сообщение Длинное сообщение Длинное сообщение Длинное сообщение',
);
const textarea = ref('');
const textareaText = ref('Your Text');
const error = ref(true);
const errorMessage = ref('Ошибка переданая в компонент');
</script>

<style>
.textares {
  display: flex;
  align-items: center;
  max-height: 980px;
  gap: 20px;
  padding-top: var(--margin-xxxxxxxl);
  padding-bottom: 104px;
  overflow: auto;
}
.textares-row {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 40px;
  flex-wrap: wrap;
  align-items: flex-start;
  max-height: 980px;
  width: 320px;
}
</style>
