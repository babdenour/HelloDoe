import { QuizzSheetFactory } from './quizz-sheet.factory';

describe('QuizzSheetFactory', () => {
  describe('create', () => {
    it('should create quizz sheet with default values', () => {
      const quizz = QuizzSheetFactory.create();

      expect(quizz.id).toBe(undefined);
      expect(quizz.doer).toBe(undefined);
      expect(quizz.quizz).toBe(undefined);
      expect(quizz.questionSheets).toEqual([]);
      expect(quizz.completedAt).toEqual(undefined);
      expect(quizz.score).toBe(undefined);
      expect(quizz.isFavorite).toBe(false);
      expect(quizz.isUnlocked).toBe(false);
      expect(quizz.isSeen).toBe(false);
    });

    it('should create quizz sheet with specified values', () => {
      const quizz = QuizzSheetFactory.create({
        createdAt: 100,
        updatedAt: 100,
        id: '1',
        doer: 'doer',
        quizz: 'quizz',
        questionSheets: ['1', '2'],
        completedAt: 1000,
        score: 5,
        isFavorite: true,
        isUnlocked: true,
        isSeen: true,
      });

      expect(quizz.createdAt).toBe(100);
      expect(quizz.updatedAt).toBe(100);
      expect(quizz.id).toBe('1');
      expect(quizz.doer).toBe('doer');
      expect(quizz.quizz).toBe('quizz');
      expect(quizz.questionSheets).toEqual(['1', '2']);
      expect(quizz.completedAt).toBe(1000);
      expect(quizz.score).toBe(5);
      expect(quizz.isFavorite).toBe(true);
      expect(quizz.isUnlocked).toBe(true);
      expect(quizz.isSeen).toBe(true);
    });
  });
});
