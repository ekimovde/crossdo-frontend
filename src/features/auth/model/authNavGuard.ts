import { storeToRefs } from 'pinia';
import { unref } from 'vue';
import type { NavigationGuard } from 'vue-router';

import { useAuthStore } from './store';

export const authNavigationGuard: NavigationGuard = async () => {
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);

  if (!unref(token)) {
    return { name: 'signIn' };
  }

  const isTokenValid = await authStore.getUser();

  if (!isTokenValid) {
    return { name: 'signIn' };
  }
};

export const loggedNavigationGuard: NavigationGuard = async () => {
  const { getUser } = useAuthStore();

  const isTokenValid = await getUser();

  if (isTokenValid) {
    return { path: '/' };
  }
};
