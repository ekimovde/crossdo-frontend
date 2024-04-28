<template>
  <section :class="styles['not-found']">
    <Typography variant="error-title"> 404 </Typography>

    <Typography as="h3" variant="h1"> Страница не найдена </Typography>

    <BaseButton type="primary" size="l" @click="goToMainPage"> Вернуться на главную </BaseButton>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { Typography, BaseButton } from 'shared/ui';

import styles from './styles.module.css';

const router = useRouter();

const goToMainPage = (): void => {
  router.push('/');
};
</script>
