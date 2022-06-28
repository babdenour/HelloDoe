import { QuizzRepositoryProviderFactory } from '@database';
import { Test, TestingModule } from '@nestjs/testing';

import { ServiceNames } from '../constants/service-names';
import { QuestionFactory } from '../factories/question.factory';
import { QuizzFactory } from '../factories/quizz.factory';
import { QuestionServiceProviderFactory, QuizzServiceProviderFactory } from '../providers';
import { QuizzService } from './quizz.service';

describe('QuizzService', () => {
  let quizzService: QuizzService;

  let mockFindByMissionId = jest.fn();
  let mockGetUnansweredQuestions = jest.fn();

  const createApp = async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionServiceProviderFactory({
          useValue: {
            getUnansweredQuestions: mockGetUnansweredQuestions,
          },
        }),
        QuizzRepositoryProviderFactory({
          useValue: {
            findByMissionId: mockFindByMissionId,
          },
        }),
        QuizzServiceProviderFactory(),
      ],
      exports: [QuizzServiceProviderFactory()],
    }).compile();

    quizzService = module.get<QuizzService>(ServiceNames.QUIZZ);
  };

  beforeEach(async () => {
    mockFindByMissionId = jest.fn().mockResolvedValue(QuizzFactory.create());
    mockGetUnansweredQuestions = jest.fn();
    await createApp();
  });

  describe('when check if quizz exists', () => {
    describe('if exists', () => {
      beforeEach(async () => {
        mockFindByMissionId = jest.fn().mockResolvedValue(QuizzFactory.create());
        await createApp();
      });

      it('should return true', async () => {
        const doesExist: boolean = await quizzService.doesQuizzExistByMissionId('1');

        expect(doesExist).toBe(true);
      });
    });

    describe('if does not exist', () => {
      beforeEach(async () => {
        mockFindByMissionId = jest.fn().mockResolvedValue(null);
        await createApp();
      });

      it('should return false', async () => {
        const doesExist: boolean = await quizzService.doesQuizzExistByMissionId('1');

        expect(doesExist).toBe(false);
      });
    });
  });

  describe('when check if doer has finished quizz', () => {
    const DOER_ID = '1';
    const QUIZZ_ID = '1';

    describe('if has finished', () => {
      beforeEach(async () => {
        mockGetUnansweredQuestions = jest.fn().mockResolvedValue([]);
        await createApp();
      });

      it('should return true', async () => {
        const hasFinishedQuizz: boolean = await quizzService.hasDoerFinishedQuizz(DOER_ID, QUIZZ_ID);

        expect(hasFinishedQuizz).toBe(true);
      });
    });

    describe('if has not finished', () => {
      beforeEach(async () => {
        mockGetUnansweredQuestions = jest.fn().mockResolvedValue([QuestionFactory.create()]);
        await createApp();
      });

      it('should return false', async () => {
        const hasFinishedQuizz: boolean = await quizzService.hasDoerFinishedQuizz(DOER_ID, QUIZZ_ID);

        expect(hasFinishedQuizz).toBe(false);
      });
    });
  });
});
