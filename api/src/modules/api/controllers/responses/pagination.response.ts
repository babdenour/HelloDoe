import { ApiResponseSuccess } from '../api-response';

interface PaginationData<T> {
  results: T[];
}

export class PaginationResponse<T> implements ApiResponseSuccess<PaginationData<T>> {
  readonly success: true = true;
  readonly data: PaginationData<T>;

  constructor(results: T[]) {
    this.data = {
      results,
    };
  }
}
