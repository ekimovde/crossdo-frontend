<template>
  <div :class="styles.file">
    <div :class="[styles.inner, styles[status]]">
      <div :class="styles.block">
        <FileIcon :class="styles.icon" />

        <Typography as="p" variant="text-xs-1">
          {{ file.name }}
        </Typography>
      </div>

      <div :class="styles.block">
        <Typography as="span" variant="text-xs-0">
          {{ displayedFileSize }}
        </Typography>

        <button :class="styles.button" type="button" @click="processToClick">
          <component :is="displayedIcon" :class="[styles.icon, styles[status]]" />
        </button>
      </div>
    </div>

    <Typography v-if="file.errorMessage" variant="text-xs-0" :class="styles.error">
      {{ file.errorMessage }}
    </Typography>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import CloseIcon from 'shared/icons/close.svg';
import FileIcon from 'shared/icons/file.svg';
import TrashIcon from 'shared/icons/trash.svg';
import type { FileUploadParams } from 'shared/ui';
import { Typography } from 'shared/ui';

import styles from './styles.module.css';

interface FileUploadItemProps {
  file: FileUploadParams;
  status: 'pending' | 'fulfilled' | 'rejected';
}

type FileUploadItemEmits = {
  cancel: [value: null];
  remove: [value: null];
};

const props = defineProps<FileUploadItemProps>();
const emit = defineEmits<FileUploadItemEmits>();

const isStatusPending = computed(() => props.status === 'pending');

const displayedIcon = computed(() => {
  if (props.status === 'pending') {
    return CloseIcon;
  }

  return TrashIcon;
});

const displayedFileSize = computed(() => {
  const fileSizeInBytes = props.file.size;
  const fileSizeInKb = fileSizeInBytes / 1024;
  const fileSizeInMb = fileSizeInKb / 1024;

  if (fileSizeInMb >= 1) {
    return fileSizeInMb.toFixed(2) + ' Mb';
  } else {
    return fileSizeInKb.toFixed(2) + ' Kb';
  }
});

const processToClick = (): void => {
  if (isStatusPending.value) {
    emit('cancel', null);
    return;
  }

  emit('remove', null);
};
</script>
