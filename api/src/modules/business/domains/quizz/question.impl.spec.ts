import { MessageType } from '../../constants/message-type';
import { QuestionFactory } from '../../factories/question.factory';
import { QuestionImpl } from './question.impl';

const CHOICE_0 = 'choice0';
const CHOICE_1 = 'choice1';

describe('QuestionImpl', () => {
  let question: QuestionImpl;

  beforeEach(() => {
    question = QuestionFactory.create({
      messages: [
        {
          type: MessageType.QUICK_REPLIES,
          text: 'text',
          choices: [
            {
              text: CHOICE_0,
              score: 0,
            },
            {
              text: CHOICE_1,
              score: 10,
            },
          ],
        },
      ],
    });
  });

  describe('when validate answer', () => {
    describe('if valid', () => {
      it('should return true', () => {
        expect(question.isAnswerValid(CHOICE_0)).toBe(true);
        expect(question.isAnswerValid(CHOICE_1)).toBe(true);
      });
    });

    describe('if invalid', () => {
      it('should return false', () => {
        expect(question.isAnswerValid(`wrong ${CHOICE_0}`)).toBe(false);
      });
    });
  });

  describe('when get score of answer', () => {
    describe('if found', () => {
      it('should return score', () => {
        expect(question.getAnswerScore(CHOICE_0)).toBe(0);
        expect(question.getAnswerScore(CHOICE_1)).toBe(10);
      });
    });

    describe('if not found', () => {
      it('should return undefined', () => {
        expect(question.getAnswerScore(`wrong ${CHOICE_0}`)).toBe(undefined);
      });
    });
  });
});
