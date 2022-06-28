export class SchemaValidationError extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this);
  }
}
