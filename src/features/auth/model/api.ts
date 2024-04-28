import { apiClient } from 'shared/api';

import type { ErrorMessage, LoginInfo, TokenInfo, TokenInfoExtended, User } from './types';

export interface BaseResponse<T> {
  status?: number;
  success: boolean;
  message?: { detail: string };
  response?: T;
}

export const loginUser = async (loginInfo: LoginInfo): Promise<BaseResponse<TokenInfoExtended>> => {
  const { data, error, response } = await apiClient.POST('/auth/login', {
    body: loginInfo,
  });

  if (error) {
    return {
      success: false,
      status: (response as Response).status,
      message: { detail: (error as ErrorMessage).detail as string },
    };
  }

  return { success: true, status: response.status, response: data };
};

export const refreshUserToken = async (refreshToken: string): Promise<BaseResponse<TokenInfo>> => {
  const { data, error, response } = await apiClient.POST('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (error) {
    return {
      success: false,
      status: (response as Response).status,
      message: { detail: (error as ErrorMessage).detail as string },
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
