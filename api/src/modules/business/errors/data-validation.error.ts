export class DataValidationError extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this);
  }
}
