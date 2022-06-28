import { QuizzFactory } from '@business';

import { QuizzAdapter } from './quizz.adapter';

describe('QuizzAdapter', () => {
  describe('toApi', () => {
    it('should convert quizz to api object', () => {
      const quizzImpl = QuizzFactory.create({
        id: '1',
        mission: '1',
        questions: ['1', '2'],
      });

      const quizz = QuizzAdapter.toApi(quizzImpl);

      expect(quizz.id).toBe('1');
      expect(quizz.mission).toBe('1');
      expect(quizz.questions).toEqual(['1', '2']);
    });
  });
});
