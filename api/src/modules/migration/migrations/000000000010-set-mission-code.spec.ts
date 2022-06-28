import { DatabaseModule } from '@database';
import { SchemaNames } from '@database/constants/schema-names';
import { SchemaModule } from '@database/schema.module';
import { MissionDocument } from '@database/schemas/mission.schema';
import { cleanDatabase, getConnection } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model } from 'mongoose';

import { Migration } from '../types/migration';
import MigrationImpl from './000000000010-set-mission-code';

describe('Migration 000000000010', () => {
  let connection: Connection;
  let migration: Migration;
  let missionMdl: Model<MissionDocument>;

  beforeEach(async () => {
    await createApp();
  });

  const createApp = async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, SchemaModule],
      providers: [MigrationImpl],
    }).compile();

    connection = getConnection(module);
    migration = module.get<MigrationImpl>(MigrationImpl);
    missionMdl = connection.models[SchemaNames.MISSION] as Model<MissionDocument>;
  };

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe(`when up`, () => {
    beforeEach(async () => {
      await Promise.all([
        missionMdl.create({ code: 'GO-001' } as any),
        // missionMdl.create({} as any),
        // missionMdl.create({} as any),
      ]);
    });

    it(`should set entry points job board`, async () => {
      await migration.up();

      const missions = await missionMdl.find({});

      expect(missions[0].code).toEqual('GO-001');
      // expect(missions[1].code).toEqual('HD-001');
      // expect(missions[2].code).toEqual('HD-002');
    });
  });
});
