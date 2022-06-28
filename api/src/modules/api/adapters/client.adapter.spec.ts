import { ClientFactory } from '@business';

import { ClientDto } from '../dtos/client.dto';
import { ClientAdapter } from './client.adapter';

describe('ClientAdapter', () => {
  describe('toApi', () => {
    it('should convert client to api object', () => {
      const clientDomain = ClientFactory.create({
        id: '1',
        address: 'address',
        companyName: 'companyName',
        contact: {
          email: 'email',
          firstName: 'John',
          lastName: 'Doe',
          phone: '06xxxxxxxx',
        },
        siren: 'siren',
      });

      const client = ClientAdapter.toApi(clientDomain);

      expect(client.id).toBe('1');
      expect(client.address).toBe('address');
      expect(client.companyName).toBe('companyName');
      expect(client.siren).toBe('siren');
      expect(client.contact.email).toBe('email');
      expect(client.contact.firstName).toBe('John');
      expect(client.contact.lastName).toBe('Doe');
      expect(client.contact.phone).toBe('06xxxxxxxx');
    });
  });

  describe('toApiOrString', () => {
    describe('if the client is a string', () => {
      it('should convert to string', () => {
        const clientId = '1';

        const client = ClientAdapter.toApiOrString(clientId);

        expect(typeof client).toBe('string');
        expect(client).toBe(clientId);
      });
    });

    describe('if the client is a domain object', () => {
      it('should convert to api object', () => {
        const clientDomain = ClientFactory.create();

        const client = ClientAdapter.toApiOrString(clientDomain);

        expect(client instanceof ClientDto).toBe(true);
      });
    });

    describe('if the client is not a string or domain object', () => {
      it('should return null', () => {
        const client = null;

        const convertion = ClientAdapter.toApiOrString(client);

        expect(convertion).toBe(null);
      });
    });
  });
});
