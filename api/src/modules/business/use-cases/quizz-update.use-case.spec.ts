import { QuizzRepositoryProviderFactory } from '@database';
import { Test, TestingModule } from '@nestjs/testing';

import { UseCaseNames } from '../constants/use-case-names';
import { QuizzImpl } from '../domains/quizz/quizz.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { QuizzFactory } from '../factories/quizz.factory';
import {
  MissionServiceProviderFactory,
  QuestionServiceProviderFactory,
  QuizzServiceProviderFactory,
  QuizzUpdateUseCaseProviderFactory,
} from '../providers';
import { QuizzUpdateUseCase } from './quizz-update.use-case';

describe('QuizzUpdateUseCase', () => {
  let quizzUpdateUseCase: QuizzUpdateUseCase;

  let mockDoesMissionExists = jest.fn();
  let mockDoesQuizzExists = jest.fn();
  let mockDoesQuestionExists = jest.fn();
  let mockFindQuizzByMissionIdWithQuestions = jest.fn();
  let mockSaveQuizz = jest.fn();

  const createApp = async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MissionServiceProviderFactory({
          useValue: {
            doesMissionExist: mockDoesMissionExists,
          },
        }),
        QuestionServiceProviderFactory({
          useValue: {
            doesQuestionExistById: mockDoesQuestionExists,
          },
        }),
        QuizzServiceProviderFactory({
          useValue: {
            doesQuizzExistById: mockDoesQuizzExists,
          },
        }),
        QuizzRepositoryProviderFactory({
          useValue: {
            findByMissionIdWithQuestions: mockFindQuizzByMissionIdWithQuestions,
            save: mockSaveQuizz,
          },
        }),
        QuizzUpdateUseCaseProviderFactory(),
      ],
      exports: [QuizzUpdateUseCaseProviderFactory()],
    }).compile();

    quizzUpdateUseCase = module.get<QuizzUpdateUseCase>(UseCaseNames.QUIZZ_UPDATE);
  };

  beforeEach(async () => {
    mockDoesMissionExists = jest.fn().mockResolvedValue(true);
    mockDoesQuizzExists = jest.fn().mockResolvedValue(true);
    mockDoesQuestionExists = jest.fn().mockResolvedValue(true);
    mockFindQuizzByMissionIdWithQuestions = jest.fn();
    mockSaveQuizz = jest.fn();

    await createApp();
  });

  describe('when happy path', () => {
    const QUIZZ_ID = '1';
    const MISSION_ID = '1';
    const QUESTION_IDS = ['1', '2', '3'];

    const quizzToUpdate: QuizzImpl = QuizzFactory.create({
      id: QUIZZ_ID,
      mission: MISSION_ID,
      questions: QUESTION_IDS,
    });

    it('should update quizz', async () => {
      await quizzUpdateUseCase.run(quizzToUpdate);

      expect(mockDoesMissionExists).toHaveBeenCalledWith(MISSION_ID);
      expect(mockDoesQuizzExists).toHaveBeenCalledWith(QUIZZ_ID);
      expect(mockDoesQuestionExists.mock.calls).toEqual([['1'], ['2'], ['3']]);
      expect(mockSaveQuizz).toHaveBeenCalledWith(quizzToUpdate);
      expect(mockFindQuizzByMissionIdWithQuestions).toHaveBeenCalledWith(MISSION_ID);
    });
  });

  describe('if quizz does not exist', () => {
    beforeEach(async () => {
      mockDoesQuizzExists = jest.fn().mockResolvedValue(false);
      await createApp();
    });

    it('should raise BusinessError H00003', async () => {
      expect.assertions(1);
      const quizz: QuizzImpl = QuizzFactory.create();

      try {
        await quizzUpdateUseCase.run(quizz);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00003_QUIZZ_NOT_FOUND);
        }
      }
    });
  });

  describe('if mission does not exist', () => {
    beforeEach(async () => {
      mockDoesMissionExists = jest.fn().mockResolvedValue(false);
      await createApp();
    });

    it('should raise BusinessError H00001', async () => {
      expect.assertions(1);
      const quizz: QuizzImpl = QuizzFactory.create();

      try {
        await quizzUpdateUseCase.run(quizz);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00001_QUIZZ_MISSION_NOT_FOUND);
        }
      }
    });
  });

  describe('if one question does not exist', () => {
    const QUESTION_IDS = ['1', '2', '3'];

    beforeEach(async () => {
      mockDoesQuestionExists = jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true);
      await createApp();
    });

    it('should raise BusinessError H00004', async () => {
      expect.assertions(1);
      const quizz: QuizzImpl = QuizzFactory.create({
        questions: QUESTION_IDS,
      });

      try {
        await quizzUpdateUseCase.run(quizz);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00004_QUIZZ_QUESTION_NOT_FOUND);
        }
      }
    });
  });
});
