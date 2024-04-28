<template>
  <aside :class="styles.sidebar">
    <div :class="styles.block">
      <Typography variant="text-m-1" :class="styles.title">Меню</Typography>
    </div>

    <nav :class="styles.menu">
      <RouterLink
        v-for="item of SIDEBAR_ITEMS"
        :key="item.to"
        :to="item.to"
        :class="[styles.item, { [styles.active]: isActiveLink(item.to) }]"
      >
        <component :is="item.icon" :class="styles.icon" />

        <Typography variant="text-s-1">{{ item.title }}</Typography>
      </RouterLink>

      <BaseButton type="flat" :class="styles.button" @click="handleLogout">
        <template #left-icon>
          <LogoutIcon :class="styles.logout" />
        </template>
        Выйти из профиля
      </BaseButton>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { useAuthStore } from 'features/auth/model/store';
import LogoutIcon from 'shared/icons/logout.svg';
import { Typography, BaseButton, openConfirm } from 'shared/ui';

import { SIDEBAR_ITEMS } from './model';
import styles from './styles.module.css';

const route = useRoute();
const router = useRouter();
const { logout } = useAuthStore();

const isActiveLink = (to: string): boolean => {
  if (to === '/') return to === route.path;

  return route.path?.includes(to);
};

const handleLogout = async (): Promise<void> => {
  const isConfirmed = await openConfirm({
    title: 'Вы действительно хотите выйти из профиля?',
    confirmButtonText: 'Да',
    cancelButtonText: 'Нет',
    hideCloseIcon: true,
    maxWidth: '400px',
    zIndex: 6,
  });

  if (isConfirmed) {
    logout();
    router.push({ path: '/auth' });
  }
};
</script>
