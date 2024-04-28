import type { components } from 'shared/api/schema';

export type ErrorMessage = components['schemas']['ErrorMessage'];

export interface User {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

export type LoginInfo = components['schemas']['LoginInfo'];
export type TokenInfo = components['schemas']['TokenInfo'];
export type TokenInfoExtended = components['schemas']['TokenInfoExtended'];
