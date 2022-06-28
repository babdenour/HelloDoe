import { UserRole } from '@token';

import { GrantsType } from './types/grants.type';

export const grants: GrantsType = {
  [UserRole.ADMIN]: {
    candidates: {
      'read:any': ['*'],
      'update:any': ['*'],
    },
  },
  [UserRole.CLIENT]: {
    candidates: {
      'read:own': ['*'],
      'update:own': ['*'],
    },
  },
};
