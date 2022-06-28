import isEmpty from 'lodash/isEmpty';
import trim from 'lodash/trim';

export const StrNotBlankValidator: (value: string) => boolean = (value: string): boolean => isEmpty(trim(value));
