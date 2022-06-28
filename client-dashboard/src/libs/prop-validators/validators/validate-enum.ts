import { Enum } from '../types/enum';
import { Validator } from '../types/validator';
import keys from 'lodash/keys';

export const ValidateEnum = (e: Enum): Validator => (value: string): boolean => {
  const enumValues: string[] = keys(e).map((key: string | number) => e[key]);
  return enumValues.includes(value);
};
