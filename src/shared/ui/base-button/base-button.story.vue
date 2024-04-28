<template>
  <Story :layout="{ type: 'grid', width: 300 }">
    <Variant title="Sizes">
      <BaseButton type="primary" size="s">primary</BaseButton>
      <BaseButton type="secondary" size="m">secondary</BaseButton>
      <BaseButton type="outline" size="l">outline</BaseButton>
      <BaseButton type="flat" size="l">flat</BaseButton>
      <BaseButton type="default" size="l">default</BaseButton>
      <BaseButton type="tertiary" size="l">tertiary</BaseButton>
      <BaseButton type="dark" size="l">dark</BaseButton>
    </Variant>

    <Variant title="Icons">
      <BaseButton type="primary" size="s">
        <template #left-icon><ArrowDownIcon /></template>
        primary
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="secondary" size="m">
        <template #left-icon><ArrowDownIcon /></template>
        secondary
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="outline" size="l">
        <template #left-icon><ArrowDownIcon /></template>
        outline
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="flat" size="l">
        <template #left-icon><ArrowDownIcon /></template>
        flat
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="default" size="s">
        <template #left-icon><ArrowDownIcon /></template>
        default
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="tertiary" size="l">
        <template #left-icon><ArrowDownIcon /></template>
        tertiary
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="dark" size="l">
        <template #left-icon><ArrowDownIcon /></template>
        dark
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
    </Variant>

    <Variant title="Icons + Disabled">
      <BaseButton type="primary" size="s" full disabled>
        <template #left-icon><ArrowDownIcon /></template>
        primary
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="secondary" size="m" full disabled>
        <template #left-icon><ArrowDownIcon /></template>
        secondary
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="outline" size="l" full disabled>
        <template #left-icon><ArrowDownIcon /></template>
        outline
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="flat" size="l" full disabled>
        <template #left-icon><ArrowDownIcon /></template>
        flat
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="default" size="s" full disabled>
        <template #left-icon><ArrowDownIcon /></template>
        default
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="tertiary" size="l" full disabled>
        <template #left-icon><ArrowDownIcon /></template>
        tertiary
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="dark" size="l" full disabled>
        <template #left-icon><ArrowDownIcon /></template>
        dark
        <template #right-icon><ArrowDownIcon /></template>
      </BaseButton>
    </Variant>

    <Variant title="Loading">
      <BaseButton type="primary" size="s" loading>Hello!</BaseButton>
      <BaseButton type="secondary" size="m" loading>Hello!</BaseButton>
      <BaseButton type="outline" size="l" loading>Hello!</BaseButton>
      <BaseButton type="flat" size="l" loading>Hello!</BaseButton>
      <BaseButton type="default" size="l" loading>Hello!</BaseButton>
      <BaseButton type="tertiary" size="l" loading>Hello!</BaseButton>
      <BaseButton type="dark" size="l" loading>Hello!</BaseButton>
    </Variant>

    <Variant title="Icon-only">
      <BaseButton type="primary" size="s">
        <template #left-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="secondary" size="m" full>
        <template #left-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="outline" size="l">
        <template #left-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="flat" size="l">
        <template #left-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="default" size="s">
        <template #left-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="tertiary" size="l">
        <template #left-icon><ArrowDownIcon /></template>
      </BaseButton>
      <BaseButton type="dark" size="l">
        <template #left-icon><ArrowDownIcon /></template>
      </BaseButton>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import ArrowDownIcon from 'shared/icons/arrow-down.svg';

import BaseButton from './index.vue';
</script>
