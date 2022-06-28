export interface Validator<T> {
  check: (value: T) => boolean;
  error: string;
}

export interface FormValue<T> {
  value: T;
  touched: boolean;
  validators: Validator<T>[];
}

export interface Form<T> {
  values: { [k in keyof T]: FormValue<T[k]> };
  errors: { [k in keyof T]?: string };
}
