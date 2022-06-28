import { mockCandidateSvc, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';

import { UseCaseNames } from '../constants/use-case-names';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { DoerServiceProviderFactory, MissionServiceProviderFactory, MissionSetFavoriteDoerUseCaseProviderFactory } from '../providers';
import { CandidateService, CandidateServiceProviderFactory } from '../services/candidate.service';
import { MissionSetFavoriteDoerUseCase } from './mission-set-favorite-doer.use-case';

const missionSetFavoriteDoerUseCaseProvider = MissionSetFavoriteDoerUseCaseProviderFactory();
let useCase: MissionSetFavoriteDoerUseCase;

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
      missionSetFavoriteDoerUseCaseProvider,
    ],
    exports: [missionSetFavoriteDoerUseCaseProvider],
  }).compile();

  useCase = module.get<MissionSetFavoriteDoerUseCase>(UseCaseNames.MISSION_SET_FAVORITE_DOER);
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

  describe('when add doer to favorite', () => {
    const IS_FAVORITE = true;

    it('should call add to favorite with right params', async () => {
      await useCase.run(MISSION_ID, CANDIDATE_ID, IS_FAVORITE);

      expect(mockedCandidateSvc.addToFavoriteForMission).toHaveBeenCalledWith(MISSION_ID, CANDIDATE_ID);
    });
  });

  describe('when remove doer from favorite', () => {
    const IS_FAVORITE = false;

    it('should call remove from favorite with right params', async () => {
      await useCase.run(MISSION_ID, CANDIDATE_ID, IS_FAVORITE);

      expect(mockedCandidateSvc.removeFromFavoriteForMission).toHaveBeenCalledWith(MISSION_ID, CANDIDATE_ID);
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
        await useCase.run(MISSION_ID, CANDIDATE_ID, true);
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
        await useCase.run(MISSION_ID, CANDIDATE_ID, true);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00009_DOER_NOT_FOUND);
          expect(ex.message).toContain(CANDIDATE_ID);
        }
      }
    });
  });
});
