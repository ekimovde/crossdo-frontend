import type { components } from 'shared/api/schema';

export type ErrorMessage = components['schemas']['ErrorModel'];

export type Authorize = components['schemas']['OAuth2AuthorizeResponse'];

export type User = components['schemas']['UserRead'];
