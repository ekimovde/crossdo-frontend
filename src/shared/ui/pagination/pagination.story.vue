<template>
  <Story>
    <Variant title="default">
      <Pagination
        v-model:page="currentPage"
        :total="20"
        :items-per-page="10"
        :sibling-count="1"
        :show-edges="true"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Pagination from './index.vue';

const currentPage = ref(1);
</script>
