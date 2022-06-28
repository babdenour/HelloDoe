import { Form, Validator } from './form.type';

export const isFieldInError = <T>(form: Form<T>, fieldName: string): boolean => {
  return form.values[fieldName]?.touched && !!form.errors[fieldName];
};

export const getError = <T>(form: Form<T>, fieldName: string): string => {
  return form.errors[fieldName];
};

export const getValues = <T>(form: Form<T>): T => {
  const keys: string[] = Object.keys(form.values);

  const formValues: T = keys.reduce((formValues: T, key: string) => {
    formValues[key] = form.values[key].value;

    return formValues;
  }, {} as T);

  return formValues;
};

export const setTouched = <T>(form: Form<T>, fieldName: keyof T): void => {
  form.values[fieldName].touched = true;
};

export const checkInput = <T>(form: Form<T>, fieldName: keyof T): void => {
  const value: T[keyof T] = form.values[fieldName].value;

  let hasError: boolean = false;
  let i: number = 0;
  while (!hasError && i < form.values[fieldName].validators.length) {
    const validator: Validator<T[keyof T]>['check'] = form.values[fieldName].validators[i].check;
    hasError = validator(value);

    if (!hasError) {
      i++;
    }
  }

  if (hasError) {
    form.errors[fieldName] = form.values[fieldName].validators[i].error;
  } else {
    delete form.errors[fieldName];
  }
};

export const validateForm = <T extends Record<string, any>>(form: Form<T>): void => {
  Object.keys(form.values).forEach((fieldName: keyof T): void => {
    setTouched(form, fieldName);
    checkInput(form, fieldName);
  });

  const errorCount: number = Object.keys(form.errors).length;
  if (errorCount > 0) {
    throw new Error(`Form contains ${errorCount} errors`);
  }
};
