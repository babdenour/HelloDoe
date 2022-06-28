import { AUTH_ROLES_METADATA } from '@api/auth';
import { ClientFactory, MissionFactory } from '@business';
import { ClientRepositoryProviderFactory, MissionRepositoryProviderFactory } from '@database';
import { TestUtils } from '@mocks';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule, TokenServiceProvider } from '@token';

import { TokenDto } from '../../dtos/token.dto';
import { ApiSuccessResponse } from '../responses/api-success.response';
import { UsersController } from './users.controller';

let usersCtrl: UsersController;

let mockFindMissionByCode = jest.fn();
let mockFindClientByEmail = jest.fn();

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [TokenModule],
    providers: [
      UsersController,
      ClientRepositoryProviderFactory({
        useValue: {
          findByEmail: mockFindClientByEmail,
        },
      }),
      MissionRepositoryProviderFactory({
        useValue: {
          findByCode: mockFindMissionByCode,
        },
      }),
      TokenServiceProvider({
        useValue: {
          generateClientToken: jest.fn().mockImplementation(() => 'token'),
        },
      }),
    ],
  }).compile();

  usersCtrl = module.get<UsersController>(UsersController);
};

describe('UsersController', () => {
  beforeEach(async () => {
    await createApp();
  });

  describe('when login client', () => {
    const CLIENT_ID = TestUtils.genMongoId();
    const OTHER_CLIENT_ID = TestUtils.genMongoId();

    beforeEach(async () => {
      mockFindClientByEmail = jest.fn().mockImplementation(() =>
        ClientFactory.create({
          id: CLIENT_ID,
        }),
      );
      mockFindMissionByCode = jest.fn().mockImplementation(() =>
        MissionFactory.create({
          client: CLIENT_ID,
        }),
      );
      await createApp();
    });

    it('should return success', async () => {
      const res: ApiSuccessResponse<TokenDto> = (await usersCtrl.loginClient({
        email: 'email',
        missionCode: 'missionCode',
      })) as ApiSuccessResponse<TokenDto>;

      expect(res instanceof ApiSuccessResponse).toBe(true);
      expect(res.success).toBe(true);
      expect(res.data instanceof TokenDto).toBe(true);
    });

    describe('when mission not found', () => {
      beforeEach(async () => {
        mockFindMissionByCode = jest.fn().mockImplementation(() => null);
        await createApp();
      });

      it('should throw UnauthorizedException', async () => {
        await expect(() =>
          usersCtrl.loginClient({
            email: 'email',
            missionCode: 'missionCode',
          }),
        ).rejects.toThrow(UnauthorizedException);
      });
    });

    describe('when client not found', () => {
      beforeEach(async () => {
        mockFindClientByEmail = jest.fn().mockImplementation(() => null);
        await createApp();
      });

      it('should throw UnauthorizedException', async () => {
        await expect(() =>
          usersCtrl.loginClient({
            email: 'email',
            missionCode: 'missionCode',
          }),
        ).rejects.toThrow(UnauthorizedException);
      });
    });

    describe('when mission client and client id do not match', () => {
      beforeEach(async () => {
        mockFindClientByEmail = jest.fn().mockImplementation(() =>
          ClientFactory.create({
            id: CLIENT_ID,
          }),
        );
        mockFindMissionByCode = jest.fn().mockImplementation(() =>
          MissionFactory.create({
            client: OTHER_CLIENT_ID,
          }),
        );
        await createApp();
      });

      it('should return UnauthorizedException', async () => {
        await expect(() =>
          usersCtrl.loginClient({
            email: 'email',
            missionCode: 'missionCode',
          }),
        ).rejects.toThrow(UnauthorizedException);
      });
    });
  });

  describe('given security', () => {
    it('everyone can login client', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, usersCtrl.loginClient);

      expect(metadata).toEqual(undefined);
    });
  });
});
