import { ConfigModule } from '@config';
import { ClientRepositoryProviderFactory, MissionRepository, MissionRepositoryProviderFactory } from '@database';
import { I18nServiceProviderFactory } from '@i18n';
import { mockMissionRepo, TestUtils } from '@mocks';
import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ServiceNames } from '../constants/service-names';
import { MissionFactory } from '../factories/mission.factory';
import { MissionServiceProviderFactory } from '../providers';
import { MissionService } from './mission.service';

let missionService: MissionService;

let mockedMissionRepo: Partial<MissionRepository>;

const missionServiceProvider: Provider = MissionServiceProviderFactory();
const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule],
    providers: [
      ClientRepositoryProviderFactory({
        useValue: {},
      }),
      I18nServiceProviderFactory({
        useValue: {
          t: jest.fn(),
        },
      }),
      MissionRepositoryProviderFactory({
        useValue: mockedMissionRepo,
      }),
      missionServiceProvider,
    ],
    exports: [missionServiceProvider],
  }).compile();

  missionService = module.get<MissionService>(ServiceNames.MISSION);
};

describe('MissionService', () => {
  beforeEach(async () => {
    mockedMissionRepo = mockMissionRepo();
    mockedMissionRepo.findById = jest.fn().mockResolvedValue(MissionFactory.create());

    await createApp();
  });

  describe('when check if mission exists', () => {
    describe('if exists', () => {
      const MISSION_ID: string = '1';

      beforeEach(async () => {
        mockedMissionRepo.findById = jest.fn().mockResolvedValue(MissionFactory.create({ id: MISSION_ID }));
        await createApp();
      });

      it('should return true', async () => {
        const doesExist: boolean = await missionService.doesMissionExist(MISSION_ID);

        expect(doesExist).toBe(true);
      });
    });

    describe('if does not exist', () => {
      const WRONG_ID: string = '1';

      beforeEach(async () => {
        mockedMissionRepo.findById = jest.fn().mockResolvedValue(null);
        await createApp();
      });

      it('should return false', async () => {
        const doesExist: boolean = await missionService.doesMissionExist(WRONG_ID);

        expect(doesExist).toBe(false);
      });
    });
  });

  describe('when check if is owned by client', () => {
    const MISSION_ID: string = TestUtils.genMongoId();
    const CLIENT_ID: string = TestUtils.genMongoId();

    describe('when owned', () => {
      beforeEach(async () => {
        mockedMissionRepo.findByIdAndClientId = jest.fn().mockResolvedValue(MissionFactory.create());
        await createApp();
      });

      it('should return true', async () => {
        const doesExist: boolean = await missionService.isOwnedByClient(MISSION_ID, CLIENT_ID);

        expect(doesExist).toBe(true);
      });
    });

    describe('when not owned', () => {
      beforeEach(async () => {
        mockedMissionRepo.findByIdAndClientId = jest.fn().mockResolvedValue(null);
        await createApp();
      });

      it('should return true', async () => {
        const doesExist: boolean = await missionService.isOwnedByClient(MISSION_ID, CLIENT_ID);

        expect(doesExist).toBe(false);
      });
    });
  });
});
