<template>
  <div :class="styles.page">
    <Typography variant="h3">Документы</Typography>

    <EmptyPlaceholder
      title="Нет добавленных документов"
      description="Актуальные документы ещё не были добавлены"
    />
  </div>
</template>

<script setup lang="ts">
import { EmptyPlaceholder } from 'widgets/index';

import { Typography } from 'shared/ui';

import styles from './styles.module.css';
</script>
