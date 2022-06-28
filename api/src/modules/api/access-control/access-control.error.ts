export class AccessControlError extends Error {
  constructor() {
    super();
    Error.captureStackTrace(this);
  }
}
