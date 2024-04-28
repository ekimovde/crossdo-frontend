import { apiClient } from 'shared/api';

import type { ErrorMessage, CoursePage, CourseCreate, Course, CourseUpdate } from './types';

export interface BaseResponse<T> {
  status?: number;
  success: boolean;
  message?: { detail: string };
  token?: string;
  response?: T;
}

export const getCourses = async (
  page: number,
  size: number,
  search?: string,
): Promise<BaseResponse<CoursePage>> => {
  const { data, error, response } = await apiClient.GET('/courses/', {
    params: {
      query: { page, size, search },
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

export const addCourse = async (courseInfo: CourseCreate): Promise<BaseResponse<Course>> => {
  const { data, error, response } = await apiClient.POST('/courses/', {
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

export const updateCourse = async (
  courseInfo: CourseUpdate,
  course_id: number,
): Promise<BaseResponse<Course>> => {
  const { data, error, response } = await apiClient.PUT(`/courses/{course_id}`, {
    body: courseInfo,
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
