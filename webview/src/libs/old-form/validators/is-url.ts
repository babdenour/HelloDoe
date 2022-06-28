import trim from 'lodash/trim';
import { RuleValidator } from '../types/rule';

const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;

export const isUrl: RuleValidator<string> = (_, value, callback) => {
  if (!URL_REGEX.test(trim(value))) {
    callback(new Error());
  } else {
    callback();
  }
};
