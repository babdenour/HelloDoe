export interface ApiResponseSuccess<T> {
  success: true;
  data?: T;
}

export interface ApiResponseError {
  success: false;
  error: string;
}

export type ApiResponse<T = never> =
  | ApiResponseSuccess<T>
  | ApiResponseError;
