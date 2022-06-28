import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInfo } from '@token';
import { Request } from 'express';

import { RequestKeys } from '../request-keys';

export const UserAuthInfoDecorator = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): UserInfo => {
    const request: Request = ctx.switchToHttp().getRequest();
    const userInfo = request[RequestKeys.USER_INFO] as UserInfo;

    return userInfo;
  },
);
