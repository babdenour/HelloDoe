import { ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UserInfo, UserRole } from '@token';

import { AuthRole } from '../auth-role';
import { AuthGuard } from './auth.guard';

let authGuard: AuthGuard;

let mockRoles: AuthRole[] = [];
let mockAuthorization = '';
let mockDecipherToken: jest.Mock = jest.fn();
let mockUserInfo: UserInfo = { name: 'admin', role: UserRole.ADMIN };

let mockRequest = {};
const createMockContext = (): ExecutionContext => {
  mockRequest = {
    headers: {
      authorization: mockAuthorization,
    },
  };

  return ({
    switchToHttp: () => ({
      getRequest: () => mockRequest,
    }),
    getHandler: () => undefined,
  } as unknown) as ExecutionContext;
};

const createApp = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const reflector = {
    get: () => mockRoles,
  } as any;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const tokenService = {
    decipherToken: mockDecipherToken,
  } as any;

  authGuard = new AuthGuard(reflector, tokenService);
};

describe('AuthGuard', () => {
  let context: ExecutionContext;

  beforeEach(() => {
    mockRoles = [AuthRole.ADMIN];
    mockAuthorization = 'Bearer valid-token';
    mockDecipherToken = jest.fn().mockImplementation(() => mockUserInfo);
    mockUserInfo = {
      name: 'admin',
      role: UserRole.ADMIN,
    };

    context = createMockContext();
    createApp();
  });

  describe('when user authenticated', () => {
    it('should activate', () => {
      const activated = authGuard.canActivate(context);

      expect(activated).toBe(true);
    });

    it('should inject user info into request', () => {
      authGuard.canActivate(context);

      expect((mockRequest as any).userInfo).toBe(mockUserInfo);
    });
  });

  describe('given a route acceting all roles', () => {
    beforeEach(() => {
      mockRoles = [AuthRole.ALL];
    });

    describe('if user is admin', () => {
      beforeEach(() => {
        mockUserInfo.role = UserRole.ADMIN;
      });

      it('should activate', () => {
        const activated = authGuard.canActivate(context);

        expect(activated).toBe(true);
      });
    });

    describe('if user is doer', () => {
      beforeEach(() => {
        mockUserInfo.role = UserRole.DOER;
      });

      it('should activate', () => {
        const activated = authGuard.canActivate(context);

        expect(activated).toBe(true);
      });
    });
  });

  describe('when user has not permission', () => {
    beforeEach(() => {
      mockUserInfo.role = UserRole.DOER;
    });

    it('should throw ForbiddenException', () => {
      expect(() => {
        authGuard.canActivate(context);
      }).toThrow(ForbiddenException);
    });
  });

  describe('when user not authenticated', () => {
    describe('given a missing authorization header', () => {
      beforeEach(() => {
        mockAuthorization = '';
        context = createMockContext();
      });

      it('should throw UnauthorizedException', () => {
        expect(() => {
          authGuard.canActivate(context);
        }).toThrow(UnauthorizedException);
      });
    });

    describe('given a malformed authorization header with missing token', () => {
      beforeEach(() => {
        mockAuthorization = 'Bearer';
        context = createMockContext();
      });

      it('should throw UnauthorizedException', () => {
        expect(() => {
          authGuard.canActivate(context);
        }).toThrow(UnauthorizedException);
      });
    });

    describe('given an indecipherable token', () => {
      beforeEach(() => {
        mockDecipherToken = jest.fn().mockImplementation(() => {
          throw new Error();
        });
        createApp();
      });

      it('should throw UnauthorizedException', () => {
        expect(() => {
          authGuard.canActivate(context);
        }).toThrow(UnauthorizedException);
      });
    });
  });
});
