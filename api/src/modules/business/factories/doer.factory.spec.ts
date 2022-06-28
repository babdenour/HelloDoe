import { DoerVideoCv, DoerVideoCvType } from '../domains/doer';
import { DoerFactory } from './doer.factory';

describe('DoerFactory', () => {
  describe('when create video cv', () => {
    it('should create video cv with default values', () => {
      const videoCv: DoerVideoCv = DoerFactory.createVideoCv();

      expect(videoCv.id).toBe(undefined);
      expect(videoCv.imgUrl).toBe('');
      expect(videoCv.question).toBe('');
      expect(videoCv.videoUrl).toBe('');
      expect(videoCv.type).toBe(DoerVideoCvType.INTRODUCTION);
    });

    it('should create video cv with specified values', () => {
      const videoCv: DoerVideoCv = DoerFactory.createVideoCv({
        id: 'id',
        imgUrl: 'imgUrl',
        question: 'question',
        videoUrl: 'videoUrl',
        type: DoerVideoCvType.INTRODUCTION,
      });

      expect(videoCv.id).toBe('id');
      expect(videoCv.imgUrl).toBe('imgUrl');
      expect(videoCv.question).toBe('question');
      expect(videoCv.videoUrl).toBe('videoUrl');
      expect(videoCv.type).toBe(DoerVideoCvType.INTRODUCTION);
    });
  });
});
