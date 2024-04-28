<template>
  <div :class="styles.form">
    <Typography span="h3" variant="h3-semi">Авторизуйтесь <br />для работы с системой</Typography>

    <BaseButton
      type="primary"
      size="l"
      full
      :class="styles.button"
      :loading="loading"
      @click="onAuthorize"
    >
      <template #left-icon>
        <GoogleIcon />
      </template>

      Авторизоваться
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { authorize } from 'features/auth';
import GoogleIcon from 'shared/icons/google.svg';
import { Typography, BaseButton } from 'shared/ui';

import styles from './styles.module.css';

const loading = ref(false);

const router = useRouter();

const onAuthorize = async (): Promise<void> => {
  loading.value = true;

  const { success, response } = await authorize();

  if (success) {
    window.open(response?.authorization_url as string, '_blank');
  }

  loading.value = false;

  router.push({ path: '/' });
};
</script>
