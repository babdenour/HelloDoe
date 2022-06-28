import { UserRole } from '@token/constants/user-roles';

export interface Token {
  unm: string;
  url: UserRole;
  iat: number;
}
