<template>
  <header :class="styles.header">
    <Typography variant="text-s-2"> {{ user?.email }} </Typography>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAuthStore } from 'features/auth/model/store';
import { Typography } from 'shared/ui';

import styles from './styles.module.css';

const { user } = storeToRefs(useAuthStore());
</script>
