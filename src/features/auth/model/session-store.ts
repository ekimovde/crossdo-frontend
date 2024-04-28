import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { TokenInfoExtended } from './types';

export const useAuthSessionStore = defineStore(
  'auth-session',

  () => {
    const sessionToken = ref<string>();

    const login = (tokenInfo: TokenInfoExtended): void => {
      sessionToken.value = tokenInfo.token;
    };

    const logout = async (): Promise<void> => {
      sessionToken.value = undefined;
    };

    return {
      sessionToken,

      login,
      logout,
    };
  },

  {
    persist: {
      key: 'warehouse-auth-session',
      paths: ['sessionToken'],
      storage: sessionStorage,
    },
  },
);
