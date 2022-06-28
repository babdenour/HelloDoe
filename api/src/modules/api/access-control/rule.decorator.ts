import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { ActionType } from './types/action.type';
import { ResourceType } from './types/resource.type';

export const RULE_METADATA_KEY = 'ACCESS_CONTROL_RULE';

export interface RuleMetadata {
  action: ActionType;
  resource: ResourceType;
}

export const RuleDecorator = (resource: ResourceType, action: ActionType): CustomDecorator =>
  SetMetadata(RULE_METADATA_KEY, { action, resource });
