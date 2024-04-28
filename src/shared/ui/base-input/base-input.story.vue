<template>
  <Story class="inputs">
    <Variant title="text" class="inputs-row">
      <BaseInput v-model:value="input" title="empty" />
      <BaseInput v-model:value="input" title="empty + icon" />
      <BaseInput v-model:value="input" title="clearable" :clearable="true" />
      <BaseInput v-model:value="input" title="clearable + icon" :clearable="true" />
      <BaseInput v-model:value="input" title="disabled" disabled />
      <BaseInput variant="password" v-model:value="password" title="password" />
      <BaseInput
        v-model:value="invalidStirng"
        title="invalid empty field"
        :error="error"
        style="margin-bottom: 16px"
        :errorMessage="errorMessage"
      />
      <BaseInput
        v-model:value="inputText"
        title="invalid filled field"
        :error="error"
        style="margin-bottom: 24px"
        :errorMessage="errorMessage"
      />
      <BaseInput
        v-model:value="inputText"
        title="invalid filled field + clearable + icon"
        :error="error"
        style="margin-bottom: 20px"
        :errorMessage="errorMessage"
        :clearable="true"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseInput from './index.vue';

const invalidStirng = ref(
  'Длинное сообщение Длинное сообщение Длинное сообщение Длинное сообщение Длинное сообщение Длинное сообщение Длинное сообщение Длинное сообщение Длинное сообщение ',
);
const input = ref('');
const inputText = ref('Your Text');
const error = ref(true);
const errorMessage = ref('Ошибка переданая в компонент');
const password = ref('asd123!@#_3123%:""');
</script>

<style>
.inputs {
  display: flex;
  align-items: center;
  max-height: 980px;
  gap: 20px;
  padding-top: var(--margin-xxxxxxxl);
  padding-bottom: 104px;
  overflow: auto;
}

.inputs-row {
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
