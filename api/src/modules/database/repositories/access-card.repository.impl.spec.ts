import { AccessCardFactory, AccessCardRepositoryBusiness, FacebookAccessCardImplBusiness } from '@business';
import { cleanDatabase, getConnection } from '@mocks/database-utils';
import { TestUtils } from '@mocks/test-utils';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { RepositoryNames } from '../constants/repository-names';
import { DatabaseModule } from '../database.module';

describe('AccessCardRepositoryImpl', () => {
  let connection: Connection;
  let accessCardRepo: AccessCardRepositoryBusiness;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    accessCardRepo = module.get<AccessCardRepositoryBusiness>(RepositoryNames.ACCESS_CARD);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when find by entry point id and facebook page scope id', () => {
    const ENTRY_POINT_ID = TestUtils.genMongoId();
    const PAGE_SCOPE_ID = TestUtils.genMongoId();

    describe('if exists', () => {
      beforeEach(async () => {
        await accessCardRepo.save(
          AccessCardFactory.createFacebookAccessCard({
            entryPoint: ENTRY_POINT_ID,
            pageScopeId: PAGE_SCOPE_ID,
          }),
        );
      });

      it('should find', async () => {
        const accessCard: FacebookAccessCardImplBusiness = await accessCardRepo.findByEntryPointIdAndFacebookPageScopeId(
          ENTRY_POINT_ID,
          PAGE_SCOPE_ID,
        );

        expect(accessCard.entryPoint).toBe(ENTRY_POINT_ID);
        expect(accessCard.pageScopeId).toBe(PAGE_SCOPE_ID);
      });
    });
  });
});
