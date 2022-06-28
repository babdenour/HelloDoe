import { ClientBusinessImpl, ClientFactory } from '@business';
import { ClientRepository, DatabaseModule, RepositoryNames } from '@database';
import { I18nModule } from '@i18n';
import { cleanDatabase, getConnection, TokenFactory } from '@mocks';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { ClientAdapter } from '../../adapters/client.adapter';
import { ApiModule } from '../../api.module';
import { ClientDto } from '../../dtos/client.dto';

const BASE_URL = '/api/clients';

let app: INestApplication;
let connection: Connection;
let clientRepository: ClientRepository;
let tokenFactory: TokenFactory;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ApiModule, DatabaseModule, I18nModule],
  }).compile();

  connection = getConnection(module);
  clientRepository = module.get<string, ClientRepository>(RepositoryNames.CLIENT);
  tokenFactory = new TokenFactory(module);

  app = module.createNestApplication();
  await app.init();
};

describe('ClientsController E2E', () => {
  beforeEach(async () => {
    await createApp();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/GET all clients', () => {
    const TESTED_URL = `${BASE_URL}`;

    describe('if user is admin', () => {
      let clients: ClientBusinessImpl[];

      beforeEach(async () => {
        const CLIENT_1 = clientRepository.save(
          ClientFactory.create({
            contact: ClientFactory.createClientContact({
              email: 'email-1',
            }),
          }),
        );
        const CLIENT_2 = clientRepository.save(
          ClientFactory.create({
            contact: ClientFactory.createClientContact({
              email: 'email-2',
            }),
          }),
        );
        clients = await Promise.all([CLIENT_1, CLIENT_2]);
      });

      it(`should get all clients`, () => {
        const clientsApi: ClientDto[] = clients.map(ClientAdapter.toApi);

        return request(app.getHttpServer()).get(TESTED_URL).auth(tokenFactory.getAdminToken(), { type: 'bearer' }).expect(200).expect(JSON.stringify(clientsApi));
      });
    });

    describe('if user is doer', () => {
      it(`should get 403`, () => {
        return request(app.getHttpServer()).get(TESTED_URL).auth(tokenFactory.getDoerToken(), { type: 'bearer' }).expect(403);
      });
    });
  });
});
