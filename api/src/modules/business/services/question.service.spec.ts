import {
  QuestionRepositoryProviderFactory,
  QuestionSheetRepositoryProviderFactory,
  QuizzRepositoryProviderFactory,
} from '@database';
import { Test, TestingModule } from '@nestjs/testing';

import { ServiceNames } from '../constants/service-names';
import { QuestionImpl } from '../domains/quizz/question.impl';
import { QuestionSheetFactory } from '../factories/question-sheet.factory';
import { QuestionFactory } from '../factories/question.factory';
import { QuestionServiceProviderFactory } from '../providers';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let questionSvc: QuestionService;

  let mockFindByDoerIdAndQuizzId = jest.fn();
  let mockFindByIdWithQuestions = jest.fn();

  const createApp = async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionRepositoryProviderFactory({
          useValue: {},
        }),
        QuestionSheetRepositoryProviderFactory({
          useValue: {
            findAllByDoerIdAndQuizzId: mockFindByDoerIdAndQuizzId,
          },
        }),
        QuizzRepositoryProviderFactory({
          useValue: {
            findByIdWithQuestions: mockFindByIdWithQuestions,
          },
        }),
        QuestionServiceProviderFactory(),
      ],
      exports: [QuestionServiceProviderFactory()],
    }).compile();

    questionSvc = module.get<QuestionService>(ServiceNames.QUESTION);
  };

  beforeEach(async () => {
    mockFindByDoerIdAndQuizzId = jest.fn();
    mockFindByIdWithQuestions = jest.fn();
    await createApp();
  });

  describe('when get unanswered questions', () => {
    describe('if are unanswered questions', () => {
      const DOER_ID = '1';
      const QUIZZ_ID = '1';
      const QUESTION_ID = '1';

      beforeEach(async () => {
        mockFindByIdWithQuestions = jest.fn().mockResolvedValue({
          questions: [QuestionFactory.create({ id: QUESTION_ID })],
        });
        mockFindByDoerIdAndQuizzId = jest.fn().mockResolvedValue([]);
        await createApp();
      });

      it('should return list of questions', async () => {
        const questions: QuestionImpl[] = await questionSvc.getUnansweredQuestions(DOER_ID, QUIZZ_ID);

        expect(questions.length).toBe(1);
        expect(questions[0].id).toBe(QUESTION_ID);
      });
    });

    describe('if all questions answered', () => {
      const DOER_ID = '1';
      const QUIZZ_ID = '1';
      const QUESTION_ID_0 = '0';
      const QUESTION_ID_1 = '1';

      beforeEach(async () => {
        mockFindByIdWithQuestions = jest.fn().mockResolvedValue({
          questions: [QuestionFactory.create({ id: QUESTION_ID_0 }), QuestionFactory.create({ id: QUESTION_ID_1 })],
        });
        mockFindByDoerIdAndQuizzId = jest.fn().mockResolvedValue([
          QuestionSheetFactory.create({
            question: QUESTION_ID_0,
          }),
          QuestionSheetFactory.create({
            question: QUESTION_ID_1,
          }),
        ]);
        await createApp();
      });

      it('should return empty list', async () => {
        const questions: QuestionImpl[] = await questionSvc.getUnansweredQuestions(DOER_ID, QUIZZ_ID);

        expect(questions.length).toBe(0);
      });
    });
  });
});
