import { CryptoServiceProvider } from '@crypto';
import { Test, TestingModule } from '@nestjs/testing';

import { ServiceNames } from '../constants/service-names';
import { UserRole } from '../constants/user-roles';
import { Token } from '../models/token.model';
import { TokenServiceProvider } from '../providers/token-service.provider';
import { TokenService } from '../services/token.service';

describe('TokenManager', () => {
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoServiceProvider({
          useValue: {
            hmacSha256: (str: any) => str,
          },
        }),
        TokenServiceProvider(),
      ],
      exports: [TokenServiceProvider()],
    }).compile();
    tokenService = module.get<TokenService>(ServiceNames.TOKEN);
  });

  describe('when generate and decipher a token', () => {
    const IAT = 1;
    const UNM = 'unm';
    const URL: UserRole = UserRole.DOER;

    it('should generate and decipher token', () => {
      const tokenParams: Token = { iat: IAT, unm: UNM, url: URL };

      const token = tokenService.generateToken(tokenParams);
      const userInfos = tokenService.decipherToken(token);

      expect(userInfos.name).toBe(UNM);
      expect(userInfos.role).toBe(URL);
    });
  });

  describe('when validate a token', () => {
    describe('if token valid', () => {
      it('should not throw', () => {
        const token = tokenService.generateToken({ unm: 'unm' });

        expect(() => {
          tokenService.validateToken(token);
        }).not.toThrow();
      });
    });

    describe('if token invalid', () => {
      it('should throw', () => {
        const token = 'this token is so wrong';

        expect(() => {
          tokenService.validateToken(token);
        }).toThrow();
      });
    });

    describe('if payload has been changed', () => {
      let token: string;

      beforeEach(() => {
        const t1 = tokenService.generateToken({
          unm: 'user 1',
          url: UserRole.ADMIN,
        });
        const t2 = tokenService.generateToken({
          unm: 'user 2',
          url: UserRole.DOER,
        });
        token = `${t1.split('.')[0]}.${t2.split('.')[1]}`;
      });

      it('should throw', () => {
        expect(() => {
          tokenService.validateToken(token);
        }).toThrow();
      });
    });
  });
});
