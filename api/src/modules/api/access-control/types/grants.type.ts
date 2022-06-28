import { UserRole } from '@token';

import { ResourceType } from './resource.type';

type GrantResource = {
  'create:any'?: string[];
  'create:own'?: string[];
  'delete:any'?: string[];
  'delete:own'?: string[];
  'read:any'?: string[];
  'read:own'?: string[];
  'update:any'?: string[];
  'update:own'?: string[];
};
type Grant = { [k in ResourceType]?: GrantResource };

export type GrantsType = { [k in UserRole]?: Grant };
