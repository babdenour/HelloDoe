import { QuestionSheetFactory } from './question-sheet.factory';

describe('QuestionSheetFactory', () => {
  describe('create', () => {
    it('should create question sheet with default values', () => {
      const question = QuestionSheetFactory.create();

      expect(question.id).toBe(undefined);
      expect(question.question).toBe(undefined);
      expect(question.doer).toBe(undefined);
      expect(question.quizz).toBe(undefined);
      expect(question.answer).toBe(undefined);
      expect(question.score).toBe(undefined);
    });

    it('should create question sheet with specified values', () => {
      const question = QuestionSheetFactory.create({
        createdAt: 100,
        updatedAt: 100,
        id: '1',
        question: 'question',
        doer: 'doer',
        quizz: 'quizz',
        answer: 'answer',
        score: 0,
      });

      expect(question.createdAt).toBe(100);
      expect(question.updatedAt).toBe(100);
      expect(question.id).toBe('1');
      expect(question.question).toBe('question');
      expect(question.doer).toBe('doer');
      expect(question.quizz).toBe('quizz');
      expect(question.answer).toBe('answer');
      expect(question.score).toBe(0);
    });
  });
});
