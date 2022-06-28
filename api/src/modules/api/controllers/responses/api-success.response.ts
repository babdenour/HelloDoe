import { ApiResponseSuccess } from '../api-response';

export class ApiSuccessResponse<T = never> implements ApiResponseSuccess<T> {
  readonly success: true = true;
  readonly data: T;

  constructor(data?: T) {
    if (data) {
      this.data = data;
    }
  }
}
