import type { components } from 'shared/api/schema';

export type ErrorMessage = components['schemas']['ErrorModel'];

export type Stream = components['schemas']['StreamRead'];
export type StreamCreate = components['schemas']['StreamCreate'];
export type StreamUpdate = components['schemas']['StreamUpdate'];
export type StreamPage = components['schemas']['Pagination_StreamRead_'];
