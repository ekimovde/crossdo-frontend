import { storeToRefs } from 'pinia';
import { unref } from 'vue';

import { useAuthStore } from 'features/auth/model/store';

export const getAuthHeader = (): { Authorization: string } => {
  const { token } = storeToRefs(useAuthStore());

  return { Authorization: 'Bearer ' + unref(token) };
};
