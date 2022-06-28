import { mockCandidateSvc, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';

import { UseCaseNames } from '../constants/use-case-names';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { DoerServiceProviderFactory, MissionServiceProviderFactory, MissionSetSeenCandidateUseCaseProviderFactory } from '../providers';
import { CandidateService, CandidateServiceProviderFactory } from '../services/candidate.service';
import { MissionSetSeenCandidateUseCase } from './mission-set-seen-candidate.use-case';

const missionSetCandidateAsSeenUseCaseProvider = MissionSetSeenCandidateUseCaseProviderFactory();
let useCase: MissionSetSeenCandidateUseCase;

let mockDoesMissionExists = jest.fn();
let mockedCandidateSvc: Partial<CandidateService>;
let mockDoesDoerExistById = jest.fn();

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CandidateServiceProviderFactory({
        useValue: mockedCandidateSvc,
      }),
      DoerServiceProviderFactory({
        useValue: {
          doesDoerExistById: mockDoesDoerExistById,
        },
      }),
      MissionServiceProviderFactory({
        useValue: {
          doesMissionExist: mockDoesMissionExists,
        },
      }),
      missionSetCandidateAsSeenUseCaseProvider,
    ],
    exports: [missionSetCandidateAsSeenUseCaseProvider],
  }).compile();

  useCase = module.get<MissionSetSeenCandidateUseCase>(UseCaseNames.MISSION_SET_SEEN_CANDIDATE);
};

describe('MissionSetFavoriteDoerUseCase', () => {
  const MISSION_ID = TestUtils.genMongoId();
  const CANDIDATE_ID = TestUtils.genMongoId();

  beforeEach(async () => {
    mockedCandidateSvc = mockCandidateSvc();
    mockDoesMissionExists = jest.fn().mockResolvedValue(true);
    mockDoesDoerExistById = jest.fn().mockResolvedValue(true);
    await createApp();
  });

  describe('when set candidate as seen', () => {
    it('should call set as seen right params', async () => {
      await useCase.run(MISSION_ID, CANDIDATE_ID);

      expect(mockedCandidateSvc.setCandidateSeenForMission).toHaveBeenCalledWith(MISSION_ID, CANDIDATE_ID);
    });
  });

  describe('if mission not found', () => {
    beforeEach(async () => {
      mockDoesMissionExists = jest.fn().mockResolvedValue(false);
      await createApp();
    });

    it('should raise BusinessError H00007', async () => {
      expect.assertions(2);

      try {
        await useCase.run(MISSION_ID, CANDIDATE_ID);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00007_MISSION_NOT_FOUND);
          expect(ex.message).toContain(MISSION_ID);
        }
      }
    });
  });

  describe('if doer not found', () => {
    beforeEach(async () => {
      mockDoesDoerExistById = jest.fn().mockResolvedValue(false);
      await createApp();
    });

    it('should raise BusinessError H00009', async () => {
      expect.assertions(2);

      try {
        await useCase.run(MISSION_ID, CANDIDATE_ID);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00009_DOER_NOT_FOUND);
          expect(ex.message).toContain(CANDIDATE_ID);
        }
      }
    });
  });
});
