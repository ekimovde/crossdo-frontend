<template>
  <Story>
    <Variant title="default">
      <Tabs v-model:model-value="selectedTab">
        <TabsList>
          <TabsTrigger value="tab1">Таб 1</TabsTrigger>
          <TabsTrigger value="tab2">Таб 2</TabsTrigger>
          <TabsTrigger value="tab3">Таб 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Контент таба 1</TabsContent>
        <TabsContent value="tab2">Контент таба 2</TabsContent>
        <TabsContent value="tab3">Контент таба 3</TabsContent>
      </Tabs>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './index';

const selectedTab = ref('tab2');
</script>
