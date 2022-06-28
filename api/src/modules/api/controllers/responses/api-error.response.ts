import { ApiResponseError } from '../api-response';

export class ApiErrorResponse implements ApiResponseError {
  readonly success: false = false;
  readonly error: string;

  constructor(error: string) {
    this.error = error;
  }
}
