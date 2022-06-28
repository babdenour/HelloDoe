import { AccessCardFactory } from './access-card.factory';

describe('AccessCardFactory', () => {
  describe('createFacebookAccessCard', () => {
    it('should create facebook access card with default values', () => {
      const entryPt = AccessCardFactory.createFacebookAccessCard();

      expect(entryPt.id).toBe(undefined);
      expect(entryPt.entryPoint).toBe(undefined);
      expect(entryPt.doer).toBe(undefined);
      expect(entryPt.pageScopeId).toBe(undefined);
    });

    it('should create facebook access card with specified values', () => {
      const entryPt = AccessCardFactory.createFacebookAccessCard({
        createdAt: 100,
        updatedAt: 100,
        id: '1',
        entryPoint: 'entryPoint',
        doer: 'doer',
        pageScopeId: 'pageScopeId',
      });

      expect(entryPt.createdAt).toBe(100);
      expect(entryPt.updatedAt).toBe(100);
      expect(entryPt.id).toBe('1');
      expect(entryPt.entryPoint).toBe('entryPoint');
      expect(entryPt.doer).toBe('doer');
      expect(entryPt.pageScopeId).toBe('pageScopeId');
    });
  });
});
