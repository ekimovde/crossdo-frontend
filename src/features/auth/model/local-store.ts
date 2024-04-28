import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { TokenInfoExtended } from './types';

export const useAuthLocalStore = defineStore(
  'auth-local',

  () => {
    const localToken = ref<string>();
    const localRefreshToken = ref<string>();

    const login = (tokenInfo: TokenInfoExtended): void => {
      localToken.value = tokenInfo.token;
      localRefreshToken.value = tokenInfo.refresh_token;
    };

    const logout = async (): Promise<void> => {
      localToken.value = undefined;
      localRefreshToken.value = undefined;
    };

    return {
      localToken,
      localRefreshToken,

      login,
      logout,
    };
  },

  {
    persist: {
      key: 'warehouse-auth-local',
      paths: ['localToken', 'localRefreshToken'],
      storage: localStorage,
    },
  },
);
