import { EntryPointFactory, EntryPointRepositoryBusiness, FacebookEntryPointImplBusiness } from '@business';
import { cleanDatabase, getConnection } from '@mocks/database-utils';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { RepositoryNames } from '../constants/repository-names';
import { DatabaseModule } from '../database.module';

describe('EntryPointRepositoryImpl', () => {
  let connection: Connection;
  let entryPtRepo: EntryPointRepositoryBusiness;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    entryPtRepo = module.get<EntryPointRepositoryBusiness>(RepositoryNames.ENTRY_POINT);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when find by facebook page id', () => {
    const PAGE_ID = 'PAGE_ID';

    describe('if exists', () => {
      beforeEach(async () => {
        await entryPtRepo.save(
          EntryPointFactory.createFacebookEntryPoint({
            pageId: PAGE_ID,
          }),
        );
      });

      it('should find', async () => {
        const entryPt: FacebookEntryPointImplBusiness = await entryPtRepo.findByFacebookPageId(PAGE_ID);

        expect(entryPt.pageId).toBe(PAGE_ID);
      });
    });
  });
});
