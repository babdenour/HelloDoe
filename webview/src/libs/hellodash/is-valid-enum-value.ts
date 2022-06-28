import { StandardEnum } from './enum.type';

export const isValidEnumValue = <T extends StandardEnum>(e: T, value: any): boolean => {
  return Object.values(e).includes(value);
};
