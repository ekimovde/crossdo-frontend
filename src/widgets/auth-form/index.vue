<template>
  <form :class="styles.form" @submit.prevent="onSubmit">
    <Typography span="h3" variant="h3-semi">Авторизуйтесь <br />для работы с системой</Typography>

    <BaseButton :class="styles.button" type="primary" size="l" full submit :loading="isLoading">
      <template #left-icon>
        <GoogleIcon />
      </template>

      Авторизоваться
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { loginSchema } from 'features/auth';
import GoogleIcon from 'shared/icons/google.svg';
import { Typography, BaseButton } from 'shared/ui';
import { useForm } from 'shared/utils/useForm';

import styles from './styles.module.css';

const { submit, isLoading } = useForm(loginSchema);

const onSubmit = submit(async (): Promise<void> => {
  //
});
</script>
