<template>
  <Story :layout="{ type: 'grid', width: 300 }">
    <Variant title="Sizes">
      <BaseCheckbox v-model:checked="checked" size="sm"> Label for checkbox </BaseCheckbox>
      <BaseCheckbox v-model:checked="checked" size="m"> Label for checkbox </BaseCheckbox>
    </Variant>

    <Variant title="disabled">
      <BaseCheckbox disabled default-checked size="sm"> Label for checkbox </BaseCheckbox>
      <BaseCheckbox disabled default-checked size="m"> Label for checkbox </BaseCheckbox>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from './index.vue';

const checked = ref(false);
</script>
