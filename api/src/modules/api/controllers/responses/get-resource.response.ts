import { ApiResponseSuccess } from '../api-response';

export class GetResourceResponse<T> implements ApiResponseSuccess<T> {
  readonly success: true = true;
  readonly data: T;

  constructor(resource: T) {
    this.data = resource;
  }
}
