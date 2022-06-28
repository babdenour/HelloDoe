export interface FormValidation<T> {
  isValid: boolean;
  form: T;
}

export const formValidationSuccess = <T>(form: T): FormValidation<T> => {
  return { isValid: true, form };
};

export const formValidationFailure = <T>(): FormValidation<T> => {
  return { isValid: false, form: null };
};

export interface ValidatableForm<T> {
  validateForm: () => Promise<FormValidation<T>>;
}
