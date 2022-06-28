import { MissionRepositoryProviderFactory } from '@database';
import { TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';

import { MissionStatus } from '../constants/mission-status';
import { UseCaseNames } from '../constants/use-case-names';
import { MissionImpl } from '../domains/mission.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { MissionFactory } from '../factories/mission.factory';
import { MissionValidateUseCaseProviderFactory, QuizzServiceProviderFactory } from '../providers';
import { MissionValidateUseCase } from './mission-validate.use-case';

let missionValidateUsc: MissionValidateUseCase;

const MISSION_ID = TestUtils.genMongoId();

let mockDoesQuizzExistByMissionId: boolean;
let mockFindById: MissionImpl;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      QuizzServiceProviderFactory({
        useValue: {
          doesQuizzExistByMissionId: jest.fn().mockImplementation(() => mockDoesQuizzExistByMissionId),
        },
      }),
      MissionRepositoryProviderFactory({
        useValue: {
          findById: jest.fn().mockImplementation(() => mockFindById),
          save: jest.fn((mission: MissionImpl) => mission),
        },
      }),
      MissionValidateUseCaseProviderFactory(),
    ],
    exports: [MissionValidateUseCaseProviderFactory()],
  }).compile();

  missionValidateUsc = module.get<MissionValidateUseCase>(UseCaseNames.MISSION_VALIDATE);
};

describe('MissionValidateUseCase', () => {
  beforeEach(async () => {
    mockDoesQuizzExistByMissionId = true;
    mockFindById = MissionFactory.create({ status: MissionStatus.FOR_VALIDATION });
    await createApp();
  });

  describe('when can validate mission', () => {
    it('should validate mission', async () => {
      const missionValidated = await missionValidateUsc.run(MISSION_ID);

      expect(missionValidated.status).toBe(MissionStatus.BEING_PREPARED);
    });
  });

  describe('if mission does not exist', () => {
    beforeEach(async () => {
      mockFindById = null;
      await createApp();
    });

    it('should raise BusinessError H00007', async () => {
      expect.assertions(1);

      try {
        await missionValidateUsc.run(MISSION_ID);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00007_MISSION_NOT_FOUND);
        }
      }
    });
  });

  describe('if mission not validatable', () => {
    beforeEach(async () => {
      mockFindById = MissionFactory.create({ status: MissionStatus.ON_GOING });
      await createApp();
    });

    it('should raise BusinessError H00008', async () => {
      expect.assertions(1);

      try {
        await missionValidateUsc.run(MISSION_ID);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00008_MISSION_NOT_VALIDATABLE);
        }
      }
    });
  });

  describe('if quizz does not exist', () => {
    beforeEach(async () => {
      mockDoesQuizzExistByMissionId = false;
      await createApp();
    });

    it('should raise BusinessError H00003', async () => {
      expect.assertions(1);

      try {
        await missionValidateUsc.run(MISSION_ID);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00003_QUIZZ_NOT_FOUND);
        }
      }
    });
  });
});
