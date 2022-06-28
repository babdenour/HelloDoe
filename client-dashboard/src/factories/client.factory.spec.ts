import { ClientFactory } from '@factories/client.factory';

describe('ClientFactory', () => {
  describe('when create', () => {
    describe('with default values', () => {
      it('should set right values', () => {
        const client = ClientFactory.create();

        expect(client.createdAt).toBe(0);
        expect(client.updatedAt).toBe(0);
        expect(client.id).toBe(undefined);
        expect(client.address).toBe('');
        expect(client.companyName).toBe('');
        expect(client.siren).toBe('');
      });
    });

    describe('with specified values', () => {
      it('should set right values', () => {
        const client = ClientFactory.create({
          createdAt: 100,
          updatedAt: 200,
          id: 'id',
          address: 'address',
          companyName: 'companyName',
          siren: 'siren',
        });

        expect(client.createdAt).toBe(100);
        expect(client.updatedAt).toBe(200);
        expect(client.id).toBe('id');
        expect(client.address).toBe('address');
        expect(client.companyName).toBe('companyName');
        expect(client.siren).toBe('siren');
      });
    });
  });

  describe('when create contact information', () => {
    describe('with default values', () => {
      it('should set right values', () => {
        const contact = ClientFactory.createContact();

        expect(contact.email).toBe('');
        expect(contact.firstName).toBe('');
        expect(contact.lastName).toBe('');
        expect(contact.phone).toBe('');
      });
    });

    describe('with specified values', () => {
      it('should set right values', () => {
        const contact = ClientFactory.createContact({
          email: 'email',
          firstName: 'firstName',
          lastName: 'lastName',
          phone: 'phone',
        });

        expect(contact.email).toBe('email');
        expect(contact.firstName).toBe('firstName');
        expect(contact.lastName).toBe('lastName');
        expect(contact.phone).toBe('phone');
      });
    });
  });
});
