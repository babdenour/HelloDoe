import { MessageType, QuestionFactory } from '@business';

import { QuestionAdapter } from './question.adapter';

describe('QuestionAdapter', () => {
  describe('toApi', () => {
    it('should convert question to api object', () => {
      const questionImpl = QuestionFactory.create({
        id: '1',
        messages: [
          {
            type: MessageType.QUICK_REPLIES,
            text: 'text',
            choices: [
              {
                text: 'text',
                score: 1,
              },
            ],
          },
        ],
        tags: ['tag1', 'tag2'],
      });

      const question = QuestionAdapter.toApi(questionImpl);

      expect(question.id).toBe('1');
      expect(question.messages).toEqual([
        {
          type: MessageType.QUICK_REPLIES,
          text: 'text',
          choices: [
            {
              text: 'text',
              score: 1,
            },
          ],
        },
      ]);
      expect(question.tags).toEqual(['tag1', 'tag2']);
    });
  });
});
