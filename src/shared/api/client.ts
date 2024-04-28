import type { Middleware } from 'openapi-fetch';
import createClient from 'openapi-fetch';

import { refreshUserToken } from 'features/auth';
import { useAuthStore } from 'features/auth/model/store';
import { API_HOST } from 'shared/constants';

import { getAuthHeader } from './getAuthHeader';
import type { paths } from './schema';

export const client: ReturnType<typeof createClient<paths>> = createClient<paths>({
  baseUrl: API_HOST,
});

const middleware: Middleware = {
  async onRequest(request) {
    const token = request.headers.get('Authorization') ?? getAuthHeader().Authorization;

    request.headers.set('Authorization', token);
    return request;
  },

  async onResponse(res) {
    const { refreshToken, refresh, logout } = useAuthStore();

    if (res.status === 401 && res.url.includes('/refresh')) {
      logout();
      return undefined;
    }

    if (res.status === 401) {
      if (refreshToken) {
        try {
          const { success, response } = await refreshUserToken(refreshToken);

          if (success && response) {
            const { body, ...resOptions } = res.clone();

            refresh(response);
            fetch(res.url, {
              ...resOptions,
              headers: {
                Authorization: `Bearer ${response.token}`,
              },
            });

            return new Response(body, { ...resOptions });
          } else {
            logout();
          }
        } catch (error) {
          logout();
          return undefined;
        }
      } else {
        logout();
        return undefined;
      }
    }

    return res;
  },
};

client.use(middleware);
