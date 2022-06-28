import { isEmpty, trim } from 'lodash';

import { RuleValidator } from '../types/rule';

export const stringNotBlank: RuleValidator<string> = (_, value, callback) => {
  if (isEmpty(trim(value))) {
    callback(new Error());
  } else {
    callback();
  }
};
