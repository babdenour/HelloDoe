import { AgencyFactory } from '@business';

import { AgencyAdapter } from './agency.adapter';

describe('AgencyAdapter', () => {
  describe('toApi', () => {
    it('should convert agency to api object', () => {
      const agencyImpl = AgencyFactory.create({
        id: '1',
        name: 'name',
      });

      const agency = AgencyAdapter.toApi(agencyImpl);

      expect(agency.id).toBe('1');
      expect(agency.name).toBe('name');
    });
  });
});
