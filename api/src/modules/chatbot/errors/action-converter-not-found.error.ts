export class ActionConverterNotFoundError extends Error {
  constructor(requestBody: string) {
    super(`could not find converter to convert request body ${requestBody}`);
    Error.captureStackTrace(this);
  }
}
