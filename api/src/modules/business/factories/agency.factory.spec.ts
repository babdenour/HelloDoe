import { AgencyFactory } from './agency.factory';

describe('AgencyFactory', () => {
  describe('create', () => {
    it('should create agency with default values', () => {
      const agency = AgencyFactory.create();

      expect(agency.id).toBe(undefined);
      expect(agency.name).toBe(undefined);
    });

    it('should create agency with specified values', () => {
      const agency = AgencyFactory.create({
        createdAt: 100,
        updatedAt: 100,
        id: '1',
        name: 'name',
      });

      expect(agency.createdAt).toBe(100);
      expect(agency.updatedAt).toBe(100);
      expect(agency.id).toBe('1');
      expect(agency.name).toBe('name');
    });
  });
});
