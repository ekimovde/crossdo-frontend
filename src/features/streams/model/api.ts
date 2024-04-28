import { apiClient } from 'shared/api';

import type { ErrorMessage, StreamPage, StreamCreate, StreamUpdate, Stream } from './types';

export interface BaseResponse<T> {
  status?: number;
  success: boolean;
  message?: { detail: string };
  token?: string;
  response?: T;
}

export const getStreams = async (page: number, size: number): Promise<BaseResponse<StreamPage>> => {
  const { data, error, response } = await apiClient.GET('/streams/', {
    params: {
      query: { page, size },
    },
  });

  if (error) {
    return {
      success: false,
      status: (response as Response).status,
      message: { detail: (error as unknown as ErrorMessage).detail as string },
    };
  }

  return { response: data, success: true, status: response.status };
};

export const addStream = async (courseInfo: StreamCreate): Promise<BaseResponse<Stream>> => {
  const { data, error, response } = await apiClient.POST('/streams/', {
    body: courseInfo,
  });

  if (error) {
    return {
      success: false,
      status: (response as Response).status,
      message: { detail: (error as unknown as ErrorMessage).detail as string },
    };
  }

  return { response: data, success: true, status: response.status };
};

export const updateStream = async (
  courseInfo: StreamUpdate,
  stream_id: number,
): Promise<BaseResponse<Stream>> => {
  const { data, error, response } = await apiClient.PUT('/streams/{stream_id}', {
    body: courseInfo,
    params: {
      path: { stream_id },
    },
  });

  if (error) {
    return {
      success: false,
      status: (response as Response).status,
      message: { detail: (error as unknown as ErrorMessage).detail as string },
    };
  }

  return { response: data, success: true, status: response.status };
};
