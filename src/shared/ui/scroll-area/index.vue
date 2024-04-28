<template>
  <ScrollAreaRoot ref="wrapperEl" v-bind="forwarded" :class="styles.wrapper">
    <ScrollAreaViewport :class="styles.viewport">
      <slot />
    </ScrollAreaViewport>

    <ScrollAreaScrollbar :class="styles.scrollbar" orientation="vertical">
      <ScrollAreaThumb :class="styles.thumb" />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar :class="styles.scrollbar" orientation="horizontal">
      <ScrollAreaThumb :class="styles.thumb" />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import type { ScrollAreaRootProps } from 'radix-vue';
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useForwardPropsEmits,
} from 'radix-vue';
import { ref } from 'vue';

import styles from './styles.module.css';

const props = defineProps<ScrollAreaRootProps>();
const forwarded = useForwardPropsEmits(props);

const wrapperEl = ref<{ $el: HTMLDivElement }>();

// In some cases, this function will help to scroll to the bottom of the area. Could be helpful in, for example, chat.
const scrollDown = (): void => {
  setTimeout(() => {
    const viewport = wrapperEl.value?.$el?.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport) {
      viewport.scrollTo({ top: viewport.scrollHeight });
    }
  });
};

defineExpose({
  scrollDown,
});
</script>
