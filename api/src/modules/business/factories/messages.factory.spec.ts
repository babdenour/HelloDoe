import { MessagesFactory } from './messages.factory';

describe('MessagesFactory', () => {
  describe('when create image', () => {
    it('should create image with default values', () => {
      const choice = MessagesFactory.createImage();

      expect(choice.url).toBe('');
    });

    it('should create image with specified values', () => {
      const choice = MessagesFactory.createImage({
        url: 'url',
      });

      expect(choice.url).toBe('url');
    });
  });

  describe('when create quick replies choice', () => {
    it('should create quick replies choice with default values', () => {
      const choice = MessagesFactory.createQuickRepliesChoice();

      expect(choice.text).toBe('');
      expect(choice.postback).toBe(undefined);
      expect(choice.score).toBe(undefined);
    });

    it('should create quick replies choice with specified values', () => {
      const choice = MessagesFactory.createQuickRepliesChoice({
        text: 'text',
        postback: 'postback',
        score: 0,
      });

      expect(choice.text).toBe('text');
      expect(choice.postback).toBe('postback');
      expect(choice.score).toBe(0);
    });
  });
});
