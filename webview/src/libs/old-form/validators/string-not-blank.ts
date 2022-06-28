import isEmpty from 'lodash/isEmpty';
import trim from 'lodash/trim';
import { RuleValidator } from '../types/rule';

export const stringNotBlank: RuleValidator<string> = (_, value, callback) => {
  if (isEmpty(trim(value))) {
    callback(new Error());
  } else {
    callback();
  }
};
