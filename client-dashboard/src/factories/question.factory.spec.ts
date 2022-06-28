import { QuestionType } from '@domains/question';
import { QuestionFactory } from '@factories/question.factory';

describe('QuestionFactory', () => {
  describe('when create', () => {
    describe('with default values', () => {
      it('should set right values', () => {
        const question = QuestionFactory.create();

        expect(question.id).toBe(undefined);
        expect(question.messages).toEqual([]);
        expect(question.tags).toEqual([]);
        expect(question.type).toBe(undefined);
      });
    });

    describe('with specified values', () => {
      it('should set right values', () => {
        const question = QuestionFactory.create({
          id: 'id',
          tags: ['tag'],
          type: QuestionType.OPEN_TYPING,
        });

        expect(question.id).toBe('id');
        expect(question.tags).toEqual(['tag']);
        expect(question.type).toBe(QuestionType.OPEN_TYPING);
      });
    });
  });
});
