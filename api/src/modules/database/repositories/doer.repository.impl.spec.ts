import { DoerFactory, DoerImplBsn, MissionBusinessImpl, MissionFactory } from '@business';
import { cleanDatabase, getConnection, getRepository, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { DatabaseModule } from '../database.module';
import { DoerRepositoryImpl } from './doer.repository.impl';

describe('DoerRepositoryImpl', () => {
  let repository: DoerRepositoryImpl;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    repository = getRepository('doer', module);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when save doer', () => {
    describe('if referenced schemas are objects', () => {
      let doer: DoerImplBsn;

      beforeEach(() => {
        doer = DoerFactory.create({
          workProfile: DoerFactory.createDoerWorkProfile({
            missions: [MissionFactory.create()],
          }),
        });
      });

      it('should return referenced schemas as objects', async () => {
        doer = await repository.save(doer);

        expect(doer.workProfile.missions[0] instanceof MissionBusinessImpl).toBe(true);
      });
    });
  });

  describe('when find all by id in', () => {
    const DOER_ID_1: string = TestUtils.genMongoId();
    const DOER_ID_2: string = TestUtils.genMongoId();
    const DOER_ID_3: string = TestUtils.genMongoId();

    beforeEach(async () => {
      await Promise.all([
        repository.save(DoerFactory.create({ id: DOER_ID_1 })),
        repository.save(DoerFactory.create({ id: DOER_ID_2 })),
        repository.save(DoerFactory.create({ id: DOER_ID_3 })),
      ]);
    });

    it('should return all doers by id', async () => {
      const doers: DoerImplBsn[] = await repository.findAllByIdIn([DOER_ID_1, DOER_ID_3]);

      expect(doers.length).toBe(2);
      expect(doers[0].id).toBe(DOER_ID_1);
      expect(doers[1].id).toBe(DOER_ID_3);
    });
  });
});
