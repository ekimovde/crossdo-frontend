<template>
  <ComboboxRoot
    v-bind="forwarded"
    :class="[
      comboboxStyles.combobox,
      { [styles['not-searched']]: !searched, [styles.error]: errorMessage },
    ]"
    @click="toggleDropdown"
    @update:model-value="toggleDropdown"
  >
    <Typography
      v-if="label"
      :for="inputId"
      :variant="isLabelOnTop ? 'text-xs-2' : 'text-m-1'"
      :class="[
        styles.formLabel,
        { [styles.labelOnTop]: isLabelOnTop, [styles.searched]: searched },
      ]"
      as="label"
    >
      {{ label }}

      <RequiredIcon v-if="required" />
    </Typography>

    <ComboboxAnchor as-child>
      <ComboboxInput v-if="searched" as-child>
        <input
          :id="inputId"
          :class="[comboboxStyles.input, { [styles.error]: errorMessage }]"
          :placeholder="placeholder"
          :maxlength="maxLength"
          type="text"
          @focusin="focusInput(true)"
          @focusout="focusInput(false)"
        />
      </ComboboxInput>

      <div v-else :class="[styles.inner, { [styles.error]: errorMessage }]">
        {{ displayedValue }}
      </div>

      <ComboboxTrigger :class="styles.trigger">
        <ChevronDownIcon />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <Typography
      v-if="error && errorMessage"
      :class="styles.errorMessage"
      as="span"
      variant="caption-s"
    >
      {{ errorMessage }}
    </Typography>

    <ComboboxContent :class="styles.options" :disable-outside-pointer-events="true">
      <slot />

      <ComboboxEmpty :class="styles.emptyInfo">
        <Typography as="span" variant="text-s-1">
          <slot name="empty-info" />
        </Typography>
      </ComboboxEmpty>

      <slot v-if="isObserverShown" name="observer" />
    </ComboboxContent>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import { isObject, reactiveOmit } from '@vueuse/core';
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxEmpty,
  useId,
  type ComboboxRootProps,
  type ComboboxRootEmits,
  useForwardPropsEmits,
} from 'radix-vue';
import { ref, computed } from 'vue';

import ChevronDownIcon from 'shared/icons/chevron-down.svg';
import RequiredIcon from 'shared/icons/required.svg';
import { Typography } from 'shared/ui';

import styles from './styles.module.css';

export interface ComboboxProps extends ComboboxRootProps {
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  searched?: boolean;
  loading?: boolean;
  maxLength?: number;
  hasObserver?: boolean;
  hasNextPage?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<ComboboxProps>(), {
  disabled: false,
  searched: true,
  required: false,
});
const emit = defineEmits<ComboboxRootEmits>();
defineSlots<{
  default(props: object): never;
  'empty-info'(props: object): never;
  observer(props: object): never;
}>();

const comboboxRootProps = reactiveOmit(
  props,
  'placeholder',
  'label',
  'errorMessage',
  'required',
  'searched',
);
const forwarded = useForwardPropsEmits(comboboxRootProps, emit);

const inputId = useId();
const isFocus = ref(false);

const displayedValue = computed(() =>
  isObject(props.modelValue) ? (props.modelValue as { title: string }).title : props.modelValue,
);

const hasModelValue = computed(() =>
  isObject(props.modelValue) ? Object.values(props.modelValue).some(Boolean) : !!props.modelValue,
);
const isLabelOnTop = computed(
  () => hasModelValue.value || !!props.searchTerm?.length || isFocus.value,
);
const isObserverShown = computed(() => !props.loading && props.hasNextPage && props.hasObserver);

const comboboxStyles = computed<{ input: string[]; combobox: string[] }>(
  (): { input: string[]; combobox: string[] } => {
    const classes = { input: [styles.input], combobox: [styles.combobox] };

    if (props.searchTerm?.length) {
      classes.input.push(styles.filled);
    }

    if (isLabelOnTop.value && props.label) {
      classes.input.push(styles.inputDown);
    }

    if (props.error) {
      classes.combobox.push(styles.invalid);
    }

    if (props.disabled) {
      classes.input.push(styles.disabled);
      classes.combobox.push(styles.disabled);
    }

    return classes;
  },
);

const focusInput = (value: boolean): void => {
  isFocus.value = value;
};

const toggleDropdown = (): void => {
  if (props.searched) return;

  emit('update:open', !props.open);
};
</script>
