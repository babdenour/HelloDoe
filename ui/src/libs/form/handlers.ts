import { Form, Validator } from './form.type';

export const isFieldInError = (form: Form, fieldName: string): boolean => {
  return form.values[fieldName]?.touched && !!form.errors[fieldName];
};

export const getError = (form: Form, fieldName: string): string => {
  return form.errors[fieldName];
};

export const setTouched = (form: Form, fieldName: string): void => {
  form.values[fieldName].touched = true;
};

export const checkInput = (form: Form, fieldName: string): void => {
  const value: any = form.values[fieldName].value;

  let hasError: boolean = false;
  let i: number = 0;
  while (!hasError && i < form.values[fieldName].validators.length) {
    const validator: Validator['check'] = form.values[fieldName].validators[i].check;
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

export const validateForm = (form: Form): void => {
  Object.keys(form.values).forEach((fieldName: string): void => {
    setTouched(form, fieldName);
    checkInput(form, fieldName);
  });

  const errorCount: number = Object.keys(form.errors).length;
  if (errorCount > 0) {
    throw new Error(`Form contains ${errorCount} errors`);
  }
};
