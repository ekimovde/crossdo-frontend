<template>
  <div :class="styles.fileUpload">
    <button type="button" :class="styles.uploader" @click="selectFile">
      <Typography as="span" variant="text-s-1"> Нажмите для загрузки файла </Typography>
    </button>

    <input
      :class="styles.inputFile"
      :accept="fileTypes"
      :multiple="true"
      type="file"
      ref="input"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import styles from './styles.module.css';
import { Typography } from '../typography';

export interface FileUploadParams extends File {
  errorMessage?: string;
}

interface FileUploadProps {
  fileTypes: string;
  maxSize?: number;
  minResolution?: number;
  maxResolution?: number;
  errorMessage?: string;
}

const ERROR_MESSAGE = 'Допустимые форматы файла JPEG, PNG';

const props = defineProps<FileUploadProps>();
const modelValue = defineModel<FileUploadParams[]>({ required: true });

const input = ref();

const selectFile = (): void => {
  if (input.value) input.value.click();
};

const handleFileChange = (event: Event): void => {
  const files = (event.target as HTMLInputElement).files;

  if (files) {
    modelValue.value.push(...Array.from(files));

    Array.from(files).forEach((file) => {
      const isValid = isSizeValid(file) && isFileTypeValid(file);

      if (isValid) {
        validateResolution(file);
      } else {
        setErrorMessageOnFiles(file.name, ERROR_MESSAGE);
      }
    });

    if (input.value) input.value.value = '';
  }
};

const isSizeValid = (file: File): boolean => {
  if (props.maxSize && file.size > props.maxSize) {
    return false;
  }

  return true;
};

const isFileTypeValid = (file: File): boolean => {
  const types = props.fileTypes.split(', ');

  return types.some((type) => file.name.endsWith(type));
};

const setErrorMessageOnFiles = (fileName: string, errorMessage: string): void => {
  modelValue.value = modelValue.value.map((item) => {
    if (item.name === fileName) {
      item.errorMessage = errorMessage;
    }

    return item;
  });
};

const validateResolution = (file: File): void => {
  const img = new Image();

  img.onload = (): void => {
    const { height, width } = img;

    if (props.minResolution) {
      if (height < props.minResolution || width < props.minResolution) {
        setErrorMessageOnFiles(file.name, 'Слишком маленький файл');
        return;
      }
    }

    if (props.maxResolution) {
      if (height > props.maxResolution || width > props.maxResolution) {
        setErrorMessageOnFiles(file.name, 'Слишком большой файл');
        return;
      }
    }
  };

  img.onerror = (): void => {
    setErrorMessageOnFiles(file.name, 'Ошибка загрузки файла');
  };

  img.src = URL.createObjectURL(file);
};
</script>
