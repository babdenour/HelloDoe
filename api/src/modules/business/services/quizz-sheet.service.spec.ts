/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { QuestionSheetRepositoryProviderFactory, QuizzSheetRepositoryProviderFactory } from '@database';
import { TestUtils } from '@mocks/test-utils';
import { Test, TestingModule } from '@nestjs/testing';

import { ServiceNames } from '../constants/service-names';
import { QuizzSheetImpl } from '../domains/quizz/quizz-sheet.impl';
import { QuestionSheetFactory } from '../factories/question-sheet.factory';
import { QuizzSheetFactory } from '../factories/quizz-sheet.factory';
import { QuizzSheetServiceProviderFactory } from '../providers';
import { QuizzSheetService } from './quizz-sheet.service';

describe('QuizzSheetService', () => {
  let quizzSheetSvc: QuizzSheetService;

  let mockFindQuizzSheet = jest.fn();
  let mockSaveQuizzSheet = jest.fn();
  let mockFindAllQuestionSheets = jest.fn();

  const createApp = async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionSheetRepositoryProviderFactory({
          useValue: {
            findAllByDoerIdAndQuizzId: mockFindAllQuestionSheets,
          },
        }),
        QuizzSheetRepositoryProviderFactory({
          useValue: {
            findByDoerIdAndQuizzIdOrCreate: mockFindQuizzSheet,
            save: mockSaveQuizzSheet,
          },
        }),
        QuizzSheetServiceProviderFactory(),
      ],
      exports: [QuizzSheetServiceProviderFactory()],
    }).compile();

    quizzSheetSvc = module.get<QuizzSheetService>(ServiceNames.QUIZZ_SHEET);
  };

  beforeEach(async () => {
    mockFindQuizzSheet = jest.fn();
    mockSaveQuizzSheet = jest.fn().mockImplementation((sheet: QuizzSheetImpl) => sheet);
    mockFindAllQuestionSheets = jest.fn();
    await createApp();
  });

  describe('when compute results', () => {
    const DOER_ID = TestUtils.genMongoId();
    const QUIZZ_ID = TestUtils.genMongoId();
    const QUESTION_ID_0 = TestUtils.genMongoId();
    const QUESTION_ID_1 = TestUtils.genMongoId();
    const QUESTION_ID_2 = TestUtils.genMongoId();

    beforeEach(async () => {
      mockFindQuizzSheet = jest.fn().mockResolvedValue(
        QuizzSheetFactory.create({
          doer: DOER_ID,
          quizz: QUIZZ_ID,
        }),
      );
      mockFindAllQuestionSheets = jest
        .fn()
        .mockResolvedValue([
          QuestionSheetFactory.create({ question: QUESTION_ID_0, score: 7 }),
          QuestionSheetFactory.create({ question: QUESTION_ID_1, score: 8 }),
          QuestionSheetFactory.create({ question: QUESTION_ID_2, score: 9 }),
        ]);
      await createApp();
    });

    it('should compute score', async () => {
      const quizzSheet: QuizzSheetImpl = await quizzSheetSvc.computeResults(DOER_ID, QUIZZ_ID);

      expect(quizzSheet.score).toBe(8);
    });

    it('should save quizz sheet', async () => {
      await quizzSheetSvc.computeResults(DOER_ID, QUIZZ_ID);

      expect(mockSaveQuizzSheet).toHaveBeenCalledWith(
        expect.objectContaining({
          doer: DOER_ID,
          quizz: QUIZZ_ID,
          questionSheets: [QUESTION_ID_0, QUESTION_ID_1, QUESTION_ID_2],
          completedAt: expect.any(Number),
        }),
      );
    });
  });
});
