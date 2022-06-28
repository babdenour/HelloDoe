import { ConnectorNames } from '@chatbot/constants/connector-names';
import { DatabaseModule } from '@database';
import { I18nModule } from '@i18n';
import { TokenFactory } from '@mocks/auth';
import { cleanDatabase, getConnection } from '@mocks/database-utils';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { ApiModule } from '../../api.module';

const BASE_URL = '/webhook/chatbot';
const BODY: Request['body'] = {};

let app: INestApplication;
let connection: Connection;
let tokenFactory: TokenFactory;
let authToken: string;

let mockHandleRequest: jest.Mock;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ApiModule, DatabaseModule, I18nModule],
  })
    .overrideProvider(ConnectorNames.CHATBOT)
    .useValue({
      handleRequest: mockHandleRequest,
    })
    .compile();

  connection = getConnection(module);
  tokenFactory = new TokenFactory(module);
  authToken = tokenFactory.getChatbotToken();

  app = module.createNestApplication();
  await app.init();
};

describe('ChatbotController E2E', () => {
  beforeEach(async () => {
    mockHandleRequest = jest.fn();
    await createApp();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/POST handle action', () => {
    const TESTED_URL = `${BASE_URL}`;

    describe('when handle action successfully', () => {
      it(`should return 200`, () => {
        return request(app.getHttpServer()).post(TESTED_URL).send(BODY).auth(authToken, { type: 'bearer' }).expect(200);
      });
    });

    describe('when raises error', () => {
      beforeEach(async () => {
        mockHandleRequest = jest.fn().mockRejectedValue(new Error());
        await createApp();
      });

      it(`should return 500`, () => {
        return request(app.getHttpServer()).post(TESTED_URL).send(BODY).auth(authToken, { type: 'bearer' }).expect(500);
      });
    });
  });
});
