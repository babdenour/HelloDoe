export type ApiResponse<T = never> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export type PaginationResponse<T> = {
  success: true;
  data: {
    results: T[];
  };
};
