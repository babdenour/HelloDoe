import { EntryPointFactory } from './entry-point.factory';

describe('EntryPointFactory', () => {
  describe('createFacebookEntryPoint', () => {
    it('should create facebook entry point with default values', () => {
      const entryPt = EntryPointFactory.createFacebookEntryPoint();

      expect(entryPt.id).toBe(undefined);
      expect(entryPt.jobBoard).toBe(undefined);
      expect(entryPt.pageId).toBe(undefined);
    });

    it('should create facebook entry point with specified values', () => {
      const entryPt = EntryPointFactory.createFacebookEntryPoint({
        createdAt: 100,
        updatedAt: 100,
        id: '1',
        jobBoard: 'jobBoard',
        pageId: 'pageId',
      });

      expect(entryPt.createdAt).toBe(100);
      expect(entryPt.updatedAt).toBe(100);
      expect(entryPt.id).toBe('1');
      expect(entryPt.jobBoard).toBe('jobBoard');
      expect(entryPt.pageId).toBe('pageId');
    });
  });
});
