<template>
  <div :class="formStyles.textareaWrap">
    <Typography
      v-if="title"
      as="label"
      :for="textareaId"
      :variant="isLabelOnTop ? textareaVariants.label : textareaVariants.title"
      :class="[styles.formLabel, { [styles.labelOnTop]: isLabelOnTop }]"
    >
      {{ title }}
    </Typography>

    <textarea
      ref="textareaRef"
      v-bind="$attrs"
      v-model="textareaValue"
      :id="textareaId"
      :class="formStyles.textarea"
      :disabled="disabled"
      @focusin="focusInput(true)"
      @focusout="focusInput(false)"
      @input="inputFunc()"
      :maxlength="maxLength"
    />

    <Typography v-if="maxLength" :class="formStyles.counter" as="span" variant="caption-xs">
      {{ textareaValue.length }}/{{ maxLengthText }} символов
    </Typography>

    <Typography
      v-if="error && errorMessage"
      as="span"
      :variant="textareaVariants.error"
      :class="styles.error"
    >
      {{ errorMessage }}
    </Typography>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'radix-vue';
import { computed, ref, watch } from 'vue';

import styles from './styles.module.css';
import { Typography, type TypographyVariant } from '../typography';

export type BaseTextareaEmits = {
  'update:value': [string];
  'update:error': [boolean];
};

export interface BaseTextareaProps {
  value: string;
  title: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  maxLength?: number;
  maxLengthText?: string;
  size?: 's';
}

const emit = defineEmits<BaseTextareaEmits>();
const props = withDefaults(defineProps<BaseTextareaProps>(), {
  value: '',
  title: '',
  error: false,
  errorMessage: '',
  size: 's',
  disabled: false,
  maxLength: 100,
  maxLengthText: '100',
});

const textareaRef = ref();
const isFocus = ref(false);
const textareaId = useId();
const textareaValue = ref(props.value);

const sizeToTextareaVariants: Record<
  Required<BaseTextareaProps>['size'],
  { error: TypographyVariant; title: TypographyVariant; label: TypographyVariant }
> = {
  s: { error: 'text-s-0', label: 'text-xs-0', title: 'text-s-1' },
};
const textareaVariants = computed(() => sizeToTextareaVariants[props.size]);

const isLabelOnTop = computed(() => !!textareaValue.value.length || isFocus.value);

const formStyles = computed<{ textarea: string[]; textareaWrap: string[]; counter: string[] }>(
  (): { textarea: string[]; textareaWrap: string[]; counter: string[] } => {
    const classes = {
      textarea: [styles.formTextarea, styles[props.size]],
      textareaWrap: [styles.form, styles[props.size]],
      counter: [styles.counter],
    };

    if (props.disabled) {
      classes.textareaWrap.push(styles.disabled);
      classes.textarea.push(styles.disabled);
    }

    if (textareaValue.value.length) {
      classes.textarea.push(styles.filled);
    }

    if (isLabelOnTop.value && props.title) {
      classes.textarea.push(styles.textareaDown);
    }

    if (props.error) {
      classes.textareaWrap.push(styles.invalid);
      classes.textarea.push(styles.invalid);
      classes.counter.push(styles.invalid);
    }

    if (isFocus.value && !props.error) {
      classes.textareaWrap.push(styles.focus);
    }

    return classes;
  },
);

const focusInput = (value: boolean): void => {
  isFocus.value = value;
};

const inputFunc = (): void => {
  emit('update:value', textareaValue.value);
};

watch(
  () => props.value,
  (newValue: string) => {
    textareaValue.value = newValue;
  },
);

const focus = (): void => {
  textareaRef.value.focus();
};

defineExpose({
  focus,
});
</script>
