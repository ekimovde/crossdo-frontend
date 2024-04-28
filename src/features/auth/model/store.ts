import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getUserInfo } from './api';
import type { User } from './types';

export const useAuthStore = defineStore(
  'auth',

  () => {
    const user = ref<User>();
    const token = ref();

    const login = async (): Promise<void> => {
      await getUser();
    };

    const logout = (): void => {
      user.value = undefined;
      token.value = undefined;
    };

    const getUser = async (): Promise<boolean> => {
      const { success, response } = await getUserInfo();

      if (success) {
        user.value = response;
        return true;
      }

      logout();
      return false;
    };

    return {
      user,

      token,

      login,
      logout,
      getUser,
    };
  },

  {
    persist: {
      key: 'crossdo-auth',
      paths: ['user', 'token'],
      storage: localStorage,
    },
  },
);
