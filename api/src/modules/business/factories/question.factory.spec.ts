import { MessageType } from '../constants/message-type';
import { QuestionFactory } from './question.factory';

describe('QuestionFactory', () => {
  describe('create', () => {
    it('should create question with default values', () => {
      const question = QuestionFactory.create();

      expect(question.id).toBe(undefined);
      expect(question.messages).toEqual([]);
      expect(question.tags).toEqual([]);
    });

    it('should create question with specified values', () => {
      const question = QuestionFactory.create({
        createdAt: 100,
        updatedAt: 100,
        id: '1',
        messages: [{ type: MessageType.TEXT, text: 'text' }],
        tags: ['tag1', 'tag2'],
      });

      expect(question.createdAt).toBe(100);
      expect(question.updatedAt).toBe(100);
      expect(question.id).toBe('1');
      expect(question.messages).toEqual([{ type: MessageType.TEXT, text: 'text' }]);
      expect(question.tags).toEqual(['tag1', 'tag2']);
    });
  });
});
