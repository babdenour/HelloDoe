import isEmpty from 'lodash/isEmpty';
import trim from 'lodash/trim';
import { RuleValidator } from '../types/rule';

export const arrayNoBlankString: RuleValidator<string[]> = (_, values, callback) => {
  if (values.some((value) => isEmpty(trim(value)))) {
    callback(new Error());
  } else {
    callback();
  }
};
