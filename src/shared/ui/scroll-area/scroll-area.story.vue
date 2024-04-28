<template>
  <Story>
    <Variant>
      <div style="width: 300px; height: 300px">
        <ScrollArea>
          <ul>
            <li v-for="i in 50" :key="i">Element {{ i }}</li>
          </ul>
        </ScrollArea>
      </div>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { ScrollArea } from './index';
</script>
