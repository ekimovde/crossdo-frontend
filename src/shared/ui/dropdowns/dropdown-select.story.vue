<template>
  <Story>
    <Variant>
      <div style="height: 500px; width: 300px">
        <DropdownSelect placeholder="Выберите возраст">
          <DropdownSelectGroup>
            <DropdownSelectLabel>Дети</DropdownSelectLabel>
            <DropdownSelectItem
              v-for="option in childOptions"
              :key="option.value"
              :value="option.value.toString()"
              :text-value="option.label"
            />
          </DropdownSelectGroup>

          <DropdownSelectGroup>
            <DropdownSelectSeparator />
            <DropdownSelectLabel>Взрослые</DropdownSelectLabel>
            <DropdownSelectItem
              v-for="option in adultOptions"
              :key="option.value"
              :value="option.value.toString()"
              :text-value="option.label"
            />
          </DropdownSelectGroup>
        </DropdownSelect>
      </div>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import {
  DropdownSelect,
  DropdownSelectItem,
  DropdownSelectGroup,
  DropdownSelectLabel,
  DropdownSelectSeparator,
} from './index';

const childOptions = ref([
  {
    value: 17,
    label: '17 лет',
  },
  {
    value: 16,
    label: '16 лет',
  },
  {
    value: 15,
    label: '15 лет',
  },
]);

const adultOptions = ref([
  {
    value: 18,
    label: '18 лет',
  },
  {
    value: 19,
    label: '19 лет',
  },
  {
    value: 20,
    label: '20 лет',
  },
]);
</script>
