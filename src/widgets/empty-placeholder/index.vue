<template>
  <article :class="styles.content">
    <Typography variant="h1">
      {{ title }}
    </Typography>

    <Typography as="span" variant="text-xl-0">
      {{ description }}
    </Typography>
  </article>
</template>

<script setup lang="ts">
import { Typography } from 'shared/ui';

import styles from './styles.module.css';

interface EmptyPlaceholderProps {
  title: string;
  description: string;
}

defineProps<EmptyPlaceholderProps>();
</script>
