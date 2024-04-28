import { defineStore, storeToRefs } from 'pinia';
import { ref, computed, unref } from 'vue';

import { getUserInfo } from './api';
import { useAuthLocalStore } from './local-store';
import { useAuthSessionStore } from './session-store';
import type { User, TokenInfoExtended, TokenInfo } from './types';

export const useAuthStore = defineStore(
  'auth',

  () => {
    const authLocalStore = useAuthLocalStore();
    const authSessionStore = useAuthSessionStore();

    const { localToken, localRefreshToken } = storeToRefs(authLocalStore);
    const { sessionToken } = storeToRefs(authSessionStore);

    const isRememberMe = ref<boolean>(false);

    const user = ref<User>();

    const token = computed(() => (unref(isRememberMe) ? unref(localToken) : unref(sessionToken)));
    const refreshToken = computed(() =>
      unref(isRememberMe) ? unref(localRefreshToken) : undefined,
    );

    const login = async (tokenInfo: TokenInfoExtended): Promise<void> => {
      if (unref(isRememberMe)) {
        authLocalStore.login(tokenInfo);
      } else {
        authSessionStore.login(tokenInfo);
      }

      await getUser();
    };

    const refresh = (tokenInfo: TokenInfo): void => {
      authLocalStore.localToken = tokenInfo.token;
    };

    const logout = (): void => {
      authLocalStore.logout();
      authSessionStore.logout();

      isRememberMe.value = false;
      user.value = undefined;
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
      isRememberMe,
      user,

      token,
      refreshToken,

      login,
      refresh,
      logout,
      getUser,
    };
  },

  {
    persist: {
      key: 'warehouse-auth',
      paths: ['isRememberMe', 'user'],
      storage: localStorage,
    },
  },
);
