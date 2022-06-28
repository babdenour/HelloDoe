import { ProviderFactory } from '@modules/provider.factory';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectTokenService, TokenService, UserInfo } from '@token';
import { Request } from 'express';
import { values } from 'lodash';

import { AuthRole } from '../auth-role';
import { AUTH_ROLES_METADATA } from '../decorators/auth-role.decorator';
import { InjectableNames } from '../injectable-names';
import { RequestKeys } from '../request-keys';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, @InjectTokenService private readonly tokenService: TokenService) {}

  public canActivate(context: ExecutionContext): boolean {
    const roles: AuthRole[] = this.buildRoles(context);

    const userInfo: UserInfo = this.getUserInfo(context);
    this.matchRoles(roles, (userInfo.role as unknown) as AuthRole);

    this.injectUserInfoIntoRequest(userInfo, context);

    return true;
  }

  private buildRoles(context: ExecutionContext): AuthRole[] {
    const roles: AuthRole[] = this.getRolesFromContext(context);

    if (!roles) {
      return [];
    } else if (roles.length === 1 && roles[0] === AuthRole.ALL) {
      return values(AuthRole);
    }

    return roles;
  }

  private getUserInfo(context: ExecutionContext): UserInfo {
    const request: Request = this.getRequestFromContext(context);
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }

    let userInfo: UserInfo;
    try {
      userInfo = this.tokenService.decipherToken(token);
    } catch (_) {
      throw new UnauthorizedException();
    }

    return userInfo;
  }

  private matchRoles(roles: AuthRole[], userRole: AuthRole): void {
    if (roles.indexOf(userRole) === -1) {
      throw new ForbiddenException();
    }
  }

  private injectUserInfoIntoRequest(userInfo: UserInfo, context: ExecutionContext): void {
    const request: Request = this.getRequestFromContext(context);
    request[RequestKeys.USER_INFO] = userInfo;
  }

  private getRolesFromContext(context: ExecutionContext): AuthRole[] {
    const roles = this.reflector.get<AuthRole[]>(AUTH_ROLES_METADATA, context.getHandler());

    return roles;
  }

  private getRequestFromContext(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest<Request>();
  }
}

export const AuthGuardProviderFactory = ProviderFactory.createFactory(InjectableNames.AUTH_GUARD, {
  useClass: AuthGuard,
});
