<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="20px + default color">
      <Spinner size="20" />
    </Variant>

    <Variant title="50 + primary color">
      <Spinner size="50" color="primary" />
    </Variant>

    <Variant title="100 + white color">
      <Spinner size="100" color="white" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import Spinner from './index.vue';
</script>
