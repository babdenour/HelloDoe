import { DatabaseModule } from '@database';
import { I18nModule } from '@i18n';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { ApiModule } from '../../api.module';

const BASE_URL = '/api/health-check';

let app: INestApplication;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ApiModule, DatabaseModule, I18nModule],
  }).compile();

  app = module.createNestApplication();
  await app.init();
};

describe('HealthCheckController E2E', () => {
  beforeEach(async () => {
    await createApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/GET check health', () => {
    const TESTED_URL = `${BASE_URL}`;

    it(`should check health`, async () => {
      return request(app.getHttpServer()).get(TESTED_URL).expect(200);
    });
  });
});
