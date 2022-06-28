import { ClientBusinessImpl, ClientFactory } from '@business';
import { ClientRepository, DatabaseModule } from '@database';
import { Test, TestingModule } from '@nestjs/testing';
import { cleanDatabase, getConnection, getRepository } from '@mocks/database-utils';

import { ClientContact } from '@business/domains/client';
import { Connection } from 'mongoose';

describe('ClientRepository', () => {
  let repository: ClientRepository;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    repository = getRepository('client', module);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when find client by email', () => {
    describe('if exists', () => {
      const EMAIL = 'john@doe.co';

      beforeEach(async () => {
        await repository.save(
          ClientFactory.create({
            contact: {
              email: EMAIL,
            } as ClientContact,
          }),
        );
      });

      it('should find', async () => {
        const client = await repository.findByEmail(EMAIL);

        expect(client instanceof ClientBusinessImpl).toBe(true);
        expect(client.contact.email).toBe(EMAIL);
      });
    });

    describe('if does not exist', () => {
      it('should return null', async () => {
        const client = await repository.findByEmail('not.john@doe.co');

        expect(client).toBe(null);
      });
    });
  });

  describe('when find client by email or create', () => {
    describe('if exists', () => {
      const EMAIL = 'john@doe.co';
      let client: ClientBusinessImpl;

      beforeEach(async () => {
        client = ClientFactory.create({
          contact: {
            email: EMAIL,
          } as ClientContact,
        });
        await repository.save(client);
      });

      it('should find by email', async () => {
        const foundClient: ClientBusinessImpl = await repository.findByEmailOrCreate(client);

        const allClients: ClientBusinessImpl[] = await repository.findAll();
        expect(foundClient.contact.email).toBe(EMAIL);
        expect(allClients.length).toBe(1);
      });
    });

    describe('if does not exist', () => {
      const EMAIL = 'john@doe.co';

      it('should create', async () => {
        const client = ClientFactory.create({
          contact: {
            email: EMAIL,
          } as ClientContact,
        });

        const foundClient: ClientBusinessImpl = await repository.findByEmailOrCreate(client);

        const allClients: ClientBusinessImpl[] = await repository.findAll();
        expect(foundClient.contact.email).toBe(EMAIL);
        expect(allClients.length).toBe(1);
      });
    });
  });
});
