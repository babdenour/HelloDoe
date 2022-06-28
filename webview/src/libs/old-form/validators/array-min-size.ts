import { RuleValidator } from '../types/rule';

export const arrayMinSize: <T>(minSize: number) => RuleValidator<T[]> = (minSize: number) => (
  _,
  arr,
  callback
) => {
  if (arr.length < minSize) {
    callback(new Error());
  } else {
    callback();
  }
};
