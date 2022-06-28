import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { AuthRole } from '../auth-role';

export const AUTH_ROLES_METADATA = 'roles';

export const AuthRoleDecorator = (...roles: AuthRole[]): CustomDecorator<string> =>
  SetMetadata(AUTH_ROLES_METADATA, roles);
