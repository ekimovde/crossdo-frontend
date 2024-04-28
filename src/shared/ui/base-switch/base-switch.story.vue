<template>
  <Story>
    <Variant title="Default">
      <div style="width: 150px">
        <BaseSwitch label="Switch" />
      </div>
    </Variant>

    <Variant title="Disabled">
      <div style="width: 150px">
        <BaseSwitch label="Switch" disabled />
      </div>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { BaseSwitch } from './index';
</script>
