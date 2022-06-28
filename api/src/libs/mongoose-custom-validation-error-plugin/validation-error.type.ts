export interface ValidationErrorSubError {
  kind: string;
  message: string;
  name: string;
  path: string;
  properties: {
    message: string;
    path: string;
    type: string;
  };
}

export interface ValidationError {
  name: string;
  _message: string;
  message: string;
  errors: { [k: string]: ValidationErrorSubError };
}
