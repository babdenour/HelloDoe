import { QuizzFactory } from './quizz.factory';

describe('QuizzFactory', () => {
  describe('create', () => {
    it('should create quizz with default values', () => {
      const quizz = QuizzFactory.create();

      expect(quizz.id).toBe(undefined);
      expect(quizz.mission).toBe(undefined);
      expect(quizz.questions).toEqual([]);
    });

    it('should create quizz with specified values', () => {
      const quizz = QuizzFactory.create({
        createdAt: 100,
        updatedAt: 100,
        id: '1',
        mission: '1',
        questions: ['1', '2'],
      });

      expect(quizz.createdAt).toBe(100);
      expect(quizz.updatedAt).toBe(100);
      expect(quizz.id).toBe('1');
      expect(quizz.mission).toBe('1');
      expect(quizz.questions).toEqual(['1', '2']);
    });
  });
});
