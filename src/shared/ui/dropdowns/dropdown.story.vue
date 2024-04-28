<template>
  <Story>
    <Variant title="default">
      <Dropdown>
        <template #trigger>
          <BaseButton>Open me</BaseButton>
        </template>

        <DropdownItem>
          <Typography variant="text-s-1">Element one</Typography>
        </DropdownItem>

        <DropdownItem>
          <Typography variant="text-s-1">Element two</Typography>
        </DropdownItem>
      </Dropdown>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { Dropdown, DropdownItem } from './index';
import { BaseButton } from '../base-button';
import { Typography } from '../typography';
</script>
