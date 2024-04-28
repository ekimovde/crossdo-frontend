<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="6px">
      <Skeleton height="6" />
    </Variant>
    <Variant title="60px">
      <Skeleton height="60" />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { Skeleton } from './index';
</script>
