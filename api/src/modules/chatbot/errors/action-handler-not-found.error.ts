export class ActionHandlerNotFoundError extends Error {
  constructor(actionName: string) {
    super(`could not find handler for action ${actionName}`);
    Error.captureStackTrace(this);
  }
}
