import { apiClient } from 'shared/api';

import type { Authorize, ErrorMessage, User } from './types';

export interface BaseResponse<T> {
  status?: number;
  success: boolean;
  message?: { detail: string };
  response?: T;
}

export const authorize = async (): Promise<BaseResponse<Authorize>> => {
  const { data, error, response } = await apiClient.GET('/auth/google/authorize');

  if (error) {
    return {
      success: false,
      status: (response as Response).status,
      message: { detail: (error as unknown as ErrorMessage).detail as string },
    };
  }

  return { success: true, status: response.status, response: data };
};

export const getUserInfo = async (): Promise<BaseResponse<User>> => {
  const { data, error, response } = await apiClient.GET('/users/me');

  if (error) {
    return {
      success: false,
      status: (response as Response).status,
      message: { detail: (error as ErrorMessage).detail as string },
    };
  }

  return { response: data, success: true, status: response.status };
};
