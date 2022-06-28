import { DataValidationError } from '@business';
import { keys } from 'lodash';
import { Schema } from 'mongoose';

import { DuplicateKeyError, MONGO_ERROR_KEY } from './duplicate-key-error.type';
import { VALIDATION_ERROR_REGEX } from './validation-error-regex';
import { ValidationError } from './validation-error.type';

export function customValidationErrorPlugin(schema: Schema): void {
  schema.post('findOneAndUpdate', handleError);
}

function handleError(err: Error, _: any, next: (err?: Error) => void): void {
  if (isValidationError(err)) {
    next(convertValidationError(err as ValidationError));
  } else if (isDuplicateKeyError(err)) {
    next(convertDuplicateKeyError((err as unknown) as DuplicateKeyError));
  } else {
    next(err);
  }
}

function isValidationError(err: Error): boolean {
  return VALIDATION_ERROR_REGEX.test(err.message);
}

function convertValidationError(err: ValidationError): DataValidationError {
  return new DataValidationError(err.message);
}

function isDuplicateKeyError(err: Error): boolean {
  const castErr = (err as unknown) as DuplicateKeyError;
  return castErr.name === MONGO_ERROR_KEY && castErr.code === 11000;
}

function convertDuplicateKeyError(err: DuplicateKeyError): DataValidationError {
  const keysViolated = keys(err.keyPattern).join();
  const message = `Properties ${keysViolated} should be unique`;
  return new DataValidationError(message);
}
