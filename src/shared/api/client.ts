import type { Middleware } from 'openapi-fetch';
import createClient from 'openapi-fetch';

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
};

client.use(middleware);
