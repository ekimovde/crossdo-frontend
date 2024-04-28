import { apiClient } from 'shared/api';

import type { ErrorMessage, ReviewCreate, Review } from './types';

export interface BaseResponse<T> {
  status?: number;
  success: boolean;
  message?: { detail: string };
  token?: string;
  response?: T;
}

export const addReview = async (
  reviewInfo: ReviewCreate,
  course_id: number,
): Promise<BaseResponse<Review>> => {
  const { data, error, response } = await apiClient.POST('/courses/{course_id}/reviews', {
    body: reviewInfo,
    params: {
      path: { course_id },
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
