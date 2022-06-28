import { StandardEnum } from './enum.type';
import { getEnumValues } from './get-enum-values';
import { isValidEnumValue } from './is-valid-enum-value';

export const validateAndGetEnumValue = <T extends StandardEnum>(e: T, value: string): T[keyof T] => {
  if (!isValidEnumValue(e, value)) {
    throw new Error(`Invalid value ${value} for enum ${JSON.stringify(getEnumValues(e))}`);
  }

  return value as T[keyof T];
};
