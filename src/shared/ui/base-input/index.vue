<template>
  <component :is="as" :class="formStyles.inputWrap">
    <Typography
      v-if="title"
      as="label"
      :for="inputId"
      :variant="isLabelOnTop ? inputVariants.label : inputVariants.title"
      :class="[styles.formLabel, styles[size], { [styles.labelOnTop]: isLabelOnTop }]"
    >
      {{ title }}
      <RequiredIcon v-if="required" />
    </Typography>

    <textarea
      v-if="props.textarea"
      ref="inputRef"
      v-bind="$attrs"
      v-model="inputValue"
      :class="[formStyles.input, styles.textarea]"
      :disabled="disabled"
      :maxlength="maxLength"
      :autocomplete="autocomplete"
      @focusin="onFocusInput"
      @focusout="focusInput(false)"
      @input="inputFunc()"
      wrap="soft"
    />

    <Typography v-if="props.textarea" variant="text-s-1" :class="styles.counter">
      {{ textareaCounter }}
    </Typography>

    <input
      v-else-if="!props.textarea"
      ref="inputRef"
      v-bind="$attrs"
      v-model="inputValue"
      v-maska="maskaObject"
      :type="type || 'text'"
      :id="inputId"
      :class="formStyles.input"
      :value="inputValue"
      :inputmode="inputType.inputMode"
      :disabled="disabled"
      :data-maska="mask"
      :maxlength="maxLength"
      :autocomplete="autocomplete"
      data-maska-eager
      @focusin="onFocusInput"
      @focusout="focusInput(false)"
      @input="inputFunc()"
    />

    <BaseButton
      v-if="inputType.type === 'password' && eyeIconShown"
      type="flat"
      size="s"
      :class="[styles.close, { [styles.empty]: !value.length }, styles.secondary, styles.iconOnly]"
      @click="changeIsShowPass()"
    >
      <template #left-icon>
        <EyeSlashIcon v-if="isShowPass" />
        <EyeIcon v-else />
      </template>
    </BaseButton>

    <BaseButton
      v-else-if="clearable && value"
      type="secondary"
      size="s"
      :class="[styles.close, { [styles.empty]: !value.length }]"
      @click="clearFunc()"
    >
      <template #left-icon><CloseIcon /></template>
    </BaseButton>

    <span v-else-if="$slots['right-icon']" :class="[styles.icon, styles.right]">
      <slot name="right-icon" />
    </span>

    <Typography
      v-if="error && errorMessage"
      as="span"
      :variant="inputVariants.error"
      :class="styles.error"
    >
      {{ errorMessage }}
    </Typography>
  </component>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-extraneous-dependencies
import { vMaska, type MaskaDetail } from 'maska';
import { useId } from 'radix-vue';
import { computed, reactive, ref, watch } from 'vue';

import CloseIcon from 'shared/icons/close.svg';
import RequiredIcon from 'shared/icons/required.svg';
import { BaseButton, Typography, type TypographyVariant } from 'shared/ui';
import { useConvert } from 'shared/utils/useConvert';

import EyeSlashIcon from './icons/eye-slash.svg';
import EyeIcon from './icons/eye.svg';
import styles from './styles.module.css';

defineSlots<{
  default(props: object): never;
  'right-icon'(props: object): never;
}>();

export type BaseInputEmits = {
  'update:value': [string];
  'update:unmasked': [string];
  'update:error': [boolean];
};
const emit = defineEmits<BaseInputEmits>();

export interface BaseInputProps {
  /** html tag for inputWrap  */
  as?: string;
  value: string;
  unmasked?: string;
  title: string;
  /** isRequired icon for label */
  clearable?: boolean;
  //** callback func for clear button */
  clearCallback?: () => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  /** variant for input default: 'text' */
  variant?: 'phone' | 'password' | 'text' | 'email' | string;
  textarea?: boolean;
  valueModifiers?: { default: () => Record<string, never> };
  size?: 's' | 'l' | 'xl';
  mask?: string | string[];
  maxLength?: number;
  initalizeUnmasked?: boolean;
  eyeIconShown?: boolean;
  autocomplete?: string;
  required?: boolean;
  convertable?: boolean;
  textboxMaxLength?: number;
  maxDigitsAfterSeparator?: number;
}
const props = withDefaults(defineProps<BaseInputProps>(), {
  as: 'div',
  value: '',
  unmasked: '',
  title: '',
  clearable: false,
  clearCallback: () => {},
  textarea: false,
  error: false,
  errorMessage: '',
  disabled: false,
  initalizeUnmasked: false,
  variant: '',
  size: 'l',
  mask: '',
  eyeIconShown: true,
  autocomplete: '',
  required: false,
  convertable: false,
});

const inputRef = ref();
const isFocus = ref(false);
const inputId = useId();
const inputValue = ref(props.value);
const maskaObject = reactive({} as MaskaDetail);

const { convertToPercentage } = useConvert();

const isLabelOnTop = computed<boolean>((): boolean => {
  return !!inputValue.value?.length || isFocus.value;
});

const sizeToInputVariants: Record<
  Required<BaseInputProps>['size'],
  { error: TypographyVariant; title: TypographyVariant; label: TypographyVariant }
> = {
  s: { error: 'text-xs-0', label: 'caption-xs', title: 'text-xs-1' },
  l: { error: 'caption-s', label: 'text-xs-2', title: 'text-m-1' },
  xl: { error: 'caption-s', label: 'text-xs-2', title: 'text-m-1' },
};
const inputVariants = computed(() => {
  return sizeToInputVariants[props.size];
});

const formStyles = computed<{ input: string[]; inputWrap: string[] }>(
  (): { input: string[]; inputWrap: string[] } => {
    const classes = {
      input: [styles.formInput, styles[props.size]],
      inputWrap: [styles.form, styles[props.size]],
    };

    if (props.disabled) {
      classes.inputWrap.push(styles.disabled);
      classes.input.push(styles.disabled);
    }

    if (inputValue.value?.length) {
      classes.input.push(styles.filled);
    }

    if (isLabelOnTop.value && props.title) {
      classes.input.push(styles.inputDown);
    }

    if (props.error) {
      classes.inputWrap.push(styles.invalid);
      classes.input.push(styles.invalid);
    }

    if (isFocus.value && !props.error) {
      classes.inputWrap.push(styles.focus);
    }

    return classes;
  },
);
const textareaCounter = computed(() => {
  return props.textboxMaxLength ? `${props.value.length}/${props.textboxMaxLength} символов` : '';
});

export type inputModeType =
  | 'text'
  | 'none'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'search'
  | undefined;

const inputType = computed((): { inputMode: inputModeType; type: string } => {
  if (props.variant === 'phone') {
    return {
      inputMode: 'tel',
      type: 'text',
    };
  }

  if (props.variant === 'password') {
    return {
      inputMode: 'text',
      type: 'password',
    };
  }

  if (props.variant === 'email') {
    return {
      inputMode: 'email',
      type: 'text',
    };
  }

  return {
    inputMode: 'text',
    type: 'text',
  };
});

const type = ref(inputType.value.type);

const isShowPass = computed<boolean>((): boolean => {
  return type.value === 'text';
});

const onFocusInput = (): void => {
  if (props.variant === 'phone' && !inputValue.value.startsWith('+')) {
    inputValue.value = `+${inputValue.value}`;
  }

  focusInput(true);
};

const focusInput = (value: boolean): void => {
  isFocus.value = value;

  if (!value && props.convertable) {
    inputValue.value = convertToPercentage(props.value);
    inputFunc();
  }
};

const inputFunc = (): void => {
  if (props.maxDigitsAfterSeparator) {
    inputValue.value = limitDigitsAfterSeparator(inputValue.value);
  }

  emit('update:value', inputValue.value);
  emit('update:unmasked', maskaObject.unmasked);
};

const limitDigitsAfterSeparator = (inputValue: string): string => {
  const { maxDigitsAfterSeparator } = props;
  const cleanedInputValue = inputValue.replace(/[^\d.,]|(?<=\..*?)[.,]|(?<=,.*?)[.,]/g, '');

  const isSeparatorComma = cleanedInputValue.includes(',');
  const isSeparatorPoint = cleanedInputValue.includes('.');
  const isSeparatorContains = isSeparatorComma || isSeparatorPoint;

  const separator = isSeparatorComma ? ',' : '.';

  if (maxDigitsAfterSeparator && isSeparatorContains) {
    const parts = cleanedInputValue.split(separator);

    if (parts.length === 2 && parts[1].length > maxDigitsAfterSeparator) {
      parts[1] = parts[1].substring(0, maxDigitsAfterSeparator);
      return parts.join(separator);
    }
  }

  return cleanedInputValue;
};

const clearFunc = (): void => {
  props.clearCallback();
  inputValue.value = '';
  inputFunc();
};

const changeIsShowPass = (): void => {
  type.value = isShowPass.value ? 'password' : 'text';
};

watch(
  () => props.value,
  (newValue: string) => {
    inputValue.value = newValue;
  },
);

watch(
  () => props.initalizeUnmasked,
  (newValue: boolean) => {
    if (!newValue) return;
    inputValue.value = props.unmasked;
  },
  { immediate: true },
);

const focus = (): void => {
  inputRef.value.focus();
};

defineExpose({
  focus,
});
</script>
