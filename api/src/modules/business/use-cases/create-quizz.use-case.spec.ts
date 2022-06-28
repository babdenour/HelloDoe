import { QuizzRepositoryProviderFactory } from '@database';
import { Test, TestingModule } from '@nestjs/testing';

import { UseCaseNames } from '../constants/use-case-names';
import { QuizzImpl } from '../domains/quizz/quizz.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { QuizzFactory } from '../factories/quizz.factory';
import {
  CreateQuizzUseCaseProviderFactory,
  MissionServiceProviderFactory,
  QuizzServiceProviderFactory,
} from '../providers';
import { CreateQuizzUseCase } from './create-quizz.use-case';

describe('CreateQuizzUseCase', () => {
  let createQuizzUseCase: CreateQuizzUseCase;

  let mockDoesMissionExists = jest.fn();
  let mockDoesQuizzExists = jest.fn();
  let mockSaveQuizz = jest.fn();

  const createApp = async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MissionServiceProviderFactory({
          useValue: {
            doesMissionExist: mockDoesMissionExists,
          },
        }),
        QuizzServiceProviderFactory({
          useValue: {
            doesQuizzExistByMissionId: mockDoesQuizzExists,
          },
        }),
        QuizzRepositoryProviderFactory({
          useValue: {
            save: mockSaveQuizz,
          },
        }),
        CreateQuizzUseCaseProviderFactory(),
      ],
      exports: [CreateQuizzUseCaseProviderFactory()],
    }).compile();

    createQuizzUseCase = module.get<CreateQuizzUseCase>(UseCaseNames.CREATE_QUIZZ);
  };

  beforeEach(async () => {
    mockDoesMissionExists = jest.fn().mockResolvedValue(true);
    mockDoesQuizzExists = jest.fn().mockResolvedValue(false);
    mockSaveQuizz = jest.fn();

    await createApp();
  });

  describe('when happy path', () => {
    const MISSION_ID = '1';

    beforeEach(async () => {
      mockDoesMissionExists = jest.fn().mockResolvedValue(true);
      await createApp();
    });

    it('should create quizz', async () => {
      const quizz: QuizzImpl = QuizzFactory.create({
        mission: MISSION_ID,
      });

      await createQuizzUseCase.run(quizz);

      expect(mockDoesMissionExists).toHaveBeenCalledWith(MISSION_ID);
      expect(mockSaveQuizz).toHaveBeenCalledWith(quizz);
    });
  });

  describe('if mission does not exist', () => {
    const WRONG_MISSION_ID = '1';

    beforeEach(async () => {
      mockDoesMissionExists = jest.fn().mockResolvedValue(false);
      await createApp();
    });

    it('should raise BusinessError H00001', async () => {
      expect.assertions(1);
      const quizz: QuizzImpl = QuizzFactory.create({
        mission: WRONG_MISSION_ID,
      });

      try {
        await createQuizzUseCase.run(quizz);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00001_QUIZZ_MISSION_NOT_FOUND);
        }
      }
    });
  });

  describe('if quizz already exists', () => {
    const WRONG_MISSION_ID = '1';

    beforeEach(async () => {
      mockDoesQuizzExists = jest.fn().mockResolvedValue(true);
      await createApp();
    });

    it('should raise BusinessError H00002', async () => {
      expect.assertions(1);
      const quizz: QuizzImpl = QuizzFactory.create({
        mission: WRONG_MISSION_ID,
      });

      try {
        await createQuizzUseCase.run(quizz);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00002_QUIZZ_ALREADY_CREATED);
        }
      }
    });
  });
});
