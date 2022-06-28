import { AgencyFactory, AgencyRepositoryBusiness } from '@business';
import { DatabaseModule, RepositoryNames } from '@database';
import { I18nModule } from '@i18n';
import { cleanDatabase, getConnection, TestUtils, TokenFactory } from '@mocks';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { AgencyAdapter } from '../../adapters/agency.adapter';
import { ApiModule } from '../../api.module';
import { AgencyDto } from '../../dtos/agency.dto';
import { GetResourceResponse } from '../responses/get-resource.response';

const BASE_URL = '/api/v2/agencies';

let app: INestApplication;
let connection: Connection;
let agencyRepo: AgencyRepositoryBusiness;
let tokenFactory: TokenFactory;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ApiModule, DatabaseModule, I18nModule],
  }).compile();

  connection = getConnection(module);
  agencyRepo = module.get<AgencyRepositoryBusiness>(RepositoryNames.AGENCY);
  tokenFactory = new TokenFactory(module);

  app = module.createNestApplication();
  await app.init();
};

describe('AgenciesController E2E', () => {
  beforeEach(async () => {
    await createApp();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/GET all agencies', () => {
    const TESTED_URL = `${BASE_URL}`;

    describe('if user is admin', () => {
      beforeEach(async () => {
        await Promise.all([
          agencyRepo.save(
            AgencyFactory.create({
              id: TestUtils.genMongoId(),
              name: 'name1',
            }),
          ),
          agencyRepo.save(
            AgencyFactory.create({
              id: TestUtils.genMongoId(),
              name: 'name2',
            }),
          ),
        ]);
      });

      it(`should get all agencies`, async () => {
        const agencies = await agencyRepo.findAll();
        const expectedAgencies: AgencyDto[] = agencies.map(AgencyAdapter.toApi);

        return request(app.getHttpServer())
          .get(TESTED_URL)
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(200)
          .expect(JSON.stringify(new GetResourceResponse(expectedAgencies)));
      });
    });
  });
});
