import { UserRole } from '../constants/user-roles';

export interface UserInfo {
  name: string;
  role: UserRole;
}
