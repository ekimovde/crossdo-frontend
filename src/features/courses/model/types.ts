import type { components } from 'shared/api/schema';

export type ErrorMessage = components['schemas']['ErrorModel'];

export type Course = components['schemas']['CourseRead'];
export type CourseCreate = components['schemas']['CourseCreate'];
export type CourseUpdate = components['schemas']['CourseUpdate'];
export type CoursePage = components['schemas']['Pagination_CourseRead_'];
