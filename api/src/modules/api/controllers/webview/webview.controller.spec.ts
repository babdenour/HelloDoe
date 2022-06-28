import { AUTH_ROLES_METADATA } from '@api/auth';
import { MissionDto } from '@api/dtos/mission.dto';
import { MissionFactory } from '@business';
import { MissionRepository, MissionRepositoryProviderFactory } from '@database';
import { ClassMock, mockClass, TestUtils } from '@mocks';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { GetResourceResponse } from '../responses/get-resource.response';
import { WebviewController } from './webview.controller';

let webviewCtrl: WebviewController;

let mockMissionRepo: ClassMock<MissionRepository>;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      MissionRepositoryProviderFactory({
        useValue: mockMissionRepo,
      }),
      WebviewController,
    ],
  }).compile();

  webviewCtrl = module.get<WebviewController>(WebviewController);
};

describe('WebviewController', () => {
  beforeEach(async () => {
    mockMissionRepo = mockClass(MissionRepository);
    mockMissionRepo.findById = jest.fn().mockImplementation(() => MissionFactory.create());
    await createApp();
  });

  describe('when get mission by id', () => {
    const MISSION_ID = TestUtils.genMongoId();

    it('should return success', async () => {
      const res = (await webviewCtrl.getMissionById(MISSION_ID)) as GetResourceResponse<MissionDto>;

      expect(res.success).toBe(true);
      expect(res.data instanceof MissionDto).toBe(true);
    });

    describe('if mission does not exist', () => {
      beforeEach(() => {
        mockMissionRepo.findById = jest.fn().mockImplementation(() => null);
      });

      it('should throw NotFoundException', async () => {
        await expect(webviewCtrl.getMissionById(MISSION_ID)).rejects.toThrowError(NotFoundException);
      });
    });
  });

  describe('given security', () => {
    it('everyone can get a mission by id', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, webviewCtrl.getMissionById);
      expect(metadata).toBe(undefined);
    });
  });
});
