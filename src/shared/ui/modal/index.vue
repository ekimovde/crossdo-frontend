<template>
  <DialogRoot v-bind="forwarded">
    <DialogPortal :disabled="disablePortal">
      <DialogOverlay :class="styles.overlay" :style="{ zIndex: zIndex }">
        <DialogContent
          @pointer-down-outside="onClickOutside"
          :class="[styles.content, styles[size], styles[type]]"
          :style="{ maxWidth: maxWidth }"
        >
          <div :class="styles.header" v-if="headerTitle || !hideCloseIcon || $slots.icon">
            <Typography v-if="headerTitle" as="span" variant="text-xl-2">
              {{ headerTitle }}
            </Typography>

            <div v-if="$slots.icon" :class="styles.icon">
              <slot name="icon" />
            </div>

            <DialogClose v-if="!hideCloseIcon" :class="styles.close" @click="closeModal">
              <CloseIcon />
            </DialogClose>
          </div>

          <DialogTitle v-if="$slots.title || title" as-child>
            <slot name="title">
              <Typography :class="styles.text" as="div" variant="h3-semi">{{ title }}</Typography>
            </slot>
          </DialogTitle>

          <DialogDescription v-if="$slots.description || description" as-child>
            <slot name="description">
              <Typography :class="styles.text" as="div" variant="text-m-0">
                {{ description }}
              </Typography>
            </slot>
          </DialogDescription>

          <slot :close="closeModal" />

          <div v-if="$slots.actions" :class="[styles.actions, styles[type]]">
            <slot :close="closeModal" name="actions" />
          </div>
        </DialogContent>
      </DialogOverlay>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogDescription,
  useForwardPropsEmits,
} from 'radix-vue';
import type { DialogRootEmits, DialogRootProps } from 'radix-vue';

import CloseIcon from 'shared/icons/close.svg';

import styles from './styles.module.css';
import { Typography } from '../typography';

export interface ModalProps extends DialogRootProps {
  title?: string;
  description?: string;
  /** By default, Modal renders inside the <body>, but this property can disable
   * the behaviour and render the Modal right where it is called. */
  disablePortal?: boolean;
  hideCloseIcon?: boolean;
  headerTitle?: string;
  maxWidth?: string;
  closeOnClickOutside?: boolean;
  size?: 's' | 'm' | 'l';
  type?: 'default' | 'confirm';
  zIndex?: number;
}

const props = withDefaults(defineProps<ModalProps>(), {
  hideCloseIcon: false,
  disablePortal: false,
  closeOnClickOutside: true,
  size: 's',
  type: 'default',
});
const emit = defineEmits<DialogRootEmits>();

const dialogRootProps = reactiveOmit(
  props,
  'disablePortal',
  'title',
  'description',
  'maxWidth',
  'hideCloseIcon',
  'closeOnClickOutside',
);
const forwarded = useForwardPropsEmits(dialogRootProps, emit);

defineSlots<{
  default(props: { close: VoidFunction }): never;
  title(props: object): never;
  description(props: object): never;
  actions(props: { close: VoidFunction }): never;
  icon(props: object): never;
}>();

const closeModal = (): void => {
  emit('update:open', false);
};

const onClickOutside = (event: Event): void => {
  if (!props.closeOnClickOutside) {
    event.preventDefault();
  }
};
</script>
