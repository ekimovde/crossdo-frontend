<template>
  <div :class="styles.inner">
    <SidebarMenu />

    <div :class="styles.container">
      <MainHeader />

      <div :class="styles.wrapper">
        <RouterView v-slot="{ Component }">
          <Suspense>
            <template #default>
              <component :is="Component" />
            </template>
          </Suspense>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { MainHeader } from 'widgets/main-header';
import { SidebarMenu } from 'widgets/sidebar-menu';

import { useAuthStore } from 'features/auth/model/store';

import styles from './styles.module.css';

const { getUser } = useAuthStore();

onBeforeMount(getUser);
</script>
