import { ProviderFactory } from '@modules/provider.factory';
import { Inject, Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { AccessControl, Permission } from 'accesscontrol';

import { AccessControlError } from './access-control.error';
import { grants } from './grants';
import { InjectableNames } from './injectable-names';
import { RULE_METADATA_KEY, RuleMetadata } from './rule.decorator';
import { ActionType } from './types/action.type';
import { ResourceType } from './types/resource.type';
import { Rule } from './types/rule';

@Injectable()
export class AccessControlService {
  private rules: Map<string, Rule> = new Map<string, Rule>();
  private ac = new AccessControl(grants);

  constructor(private readonly discoverySvc: DiscoveryService) {}

  private onModuleInit(): void {
    this.discoverRules();
  }

  private discoverRules(): void {
    this.rules = this.discoverySvc
      .getProviders()
      .filter((wrapper) => !!wrapper.metatype && !!Reflect.getMetadata(RULE_METADATA_KEY, wrapper.metatype))
      .map((wrapper: InstanceWrapper<Rule>) => {
        const { action, resource } = Reflect.getMetadata(RULE_METADATA_KEY, wrapper.metatype) as RuleMetadata;
        return {
          action,
          resource,
          instance: wrapper.instance,
        };
      })
      .reduce((acc: Map<string, Rule>, current) => {
        acc.set(this.buildRuleKey(current.action, current.resource), current.instance);
        return acc;
      }, new Map<string, Rule>());
  }

  public async can(
    role: string,
    action: ActionType,
    resource: ResourceType,
    data?: { any?: any; own?: any },
  ): Promise<void> {
    const ruleKey = this.buildRuleKey(action, resource);
    const rule: Rule = this.rules.get(ruleKey);

    if (!rule) {
      throw new Error(`Could not find access control rule for action '${action}' on resource '${resource}'`);
    }

    if (this.hasOwnPermission(role, action, resource)) {
      const hasOwn = await rule.own(data?.own);
      if (hasOwn) {
        return;
      }
    }

    if (this.hasAnyPermission(role, action, resource)) {
      const hasAny = await rule.any(data?.any);
      if (hasAny) {
        return;
      }
    }

    throw new AccessControlError();
  }

  private hasOwnPermission(role: string, action: ActionType, resource: ResourceType): boolean {
    return this.hasPermission(role, action, 'own', resource);
  }

  private hasAnyPermission(role: string, action: ActionType, resource: ResourceType): boolean {
    return this.hasPermission(role, action, 'any', resource);
  }

  private hasPermission(role: string, action: ActionType, pronoun: 'any' | 'own', resource: ResourceType): boolean {
    const actionSuffix = pronoun === 'any' ? 'Any' : pronoun === 'own' ? 'Own' : '';
    const actionKey = `${action}${actionSuffix}`;

    if (!this.ac.can(role)[actionKey]) {
      throw new Error(`Could not find query for '${actionKey}'`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.ac.can(role)[actionKey](resource).granted;
  }

  private buildRuleKey(action: ActionType, resource: ResourceType): string {
    return `${resource}:${action}`;
  }
}

export const InjectAccessControlService = Inject(InjectableNames.ACCESS_CONTROL_SERVICE);

export const AccessControlServiceProviderFactory = ProviderFactory.createFactory(
  InjectableNames.ACCESS_CONTROL_SERVICE,
  {
    useClass: AccessControlService,
  },
);
