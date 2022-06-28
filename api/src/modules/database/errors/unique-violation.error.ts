import { SchemaValidationError } from '@database/errors/schema-validation.error';

export class UniqueViolationError extends SchemaValidationError {
  constructor(field: string) {
    super(`field ${field} should be unique`);
  }
}
