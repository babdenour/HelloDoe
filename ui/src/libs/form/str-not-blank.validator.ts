import { isEmpty, trim } from 'lodash';

export const StrNotBlankValidator: (value: string) => boolean = (value: string): boolean => isEmpty(trim(value));
