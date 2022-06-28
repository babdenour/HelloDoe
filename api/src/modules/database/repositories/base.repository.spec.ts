import { MissionBusinessImpl, MissionFactory } from '@business';
import { TestUtils } from '@mocks/test-utils';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { DatabaseModule } from '..';
import { cleanDatabase, getConnection, getModel } from '../../../mocks/database-utils';
import { ConverterNames } from '../constants/converter-names';
import { BaseRepository } from '../repositories/base.repository';
import { MissionDocument } from '../schemas/mission.schema';
import { MissionConverter } from './converters/mission.converter';

describe('BaseRepository', () => {
  let repository: BaseRepository<MissionBusinessImpl, MissionDocument>;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    const model = getModel('mission', connection);
    const converter = module.get<MissionConverter>(ConverterNames.MISSION);
    repository = new BaseRepository<MissionBusinessImpl, MissionDocument>(model, converter);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('findAll', () => {
    beforeEach(async () => {
      await Promise.all([
        repository.save(MissionFactory.create({ code: 'code-1' })),
        repository.save(MissionFactory.create({ code: 'code-2' })),
      ]);
    });

    it('should find models', async () => {
      const models = await repository.findAll();

      expect(models.length).toBe(2);
    });
  });

  describe('findById', () => {
    const id = TestUtils.genMongoId();
    const description = 'a description';
    let model;

    beforeEach(async () => {
      model = MissionFactory.create({
        id,
        description,
      });
      await repository.save(model);
    });

    it('should find model by id', async () => {
      const model = await repository.findById(id);

      expect(model.id).toBe(id);
      expect(model.description).toBe(description);
    });
  });

  describe('when save model', () => {
    describe('if new model', () => {
      let model: MissionBusinessImpl;

      beforeEach(async () => {
        model = await repository.save(MissionFactory.create());
      });

      it('should create model', async () => {
        model = await repository.save(model);

        expect(model.id).toBeTruthy();
      });
    });

    describe('if existing model', () => {
      const ID = TestUtils.genMongoId();
      const DESCRIPTION = 'a description';

      let model: MissionBusinessImpl;
      let modelCreatedAt: number;
      let modelUpdatedAt: number;

      beforeEach(async () => {
        model = await repository.save(MissionFactory.create({ id: ID }));
        modelCreatedAt = model.createdAt;
        modelUpdatedAt = model.updatedAt;
      });

      it('should update model', async () => {
        model.description = DESCRIPTION;

        model = await repository.save(model);

        expect(model.id).toBe(ID);
        expect(model.description).toBe(DESCRIPTION);
      });

      it('should protect createdAt timestamp and update updatedAt timestamp', async () => {
        model.createdAt = 0;
        model.updatedAt = modelUpdatedAt - 1000;

        model = await repository.save(model);

        expect(model.createdAt).toBe(modelCreatedAt);
        expect(model.updatedAt).toBeGreaterThan(modelUpdatedAt);
      });
    });
  });

  describe('when bulk save model', () => {
    describe('if new models', () => {
      const MODEL_ID_0 = TestUtils.genMongoId();
      const MODEL_ID_1 = TestUtils.genMongoId();

      it('should create models', async () => {
        await repository.bulkSave([
          MissionFactory.create({ id: MODEL_ID_0, code: 'code-0' }),
          MissionFactory.create({ id: MODEL_ID_1, code: 'code-1' }),
        ]);

        const models = await repository.findAll();
        expect(models.length).toBe(2);
        expect(models[0].id).toBe(MODEL_ID_0);
        expect(models[1].id).toBe(MODEL_ID_1);
      });
    });

    describe('if existing models', () => {
      const MODEL_ID_0 = TestUtils.genMongoId();
      const MODEL_ID_1 = TestUtils.genMongoId();
      const DESCRIPTION = 'DESCRIPTION';

      beforeEach(async () => {
        await repository.save(MissionFactory.create({ id: MODEL_ID_0, code: 'code-0' }));
        await repository.save(MissionFactory.create({ id: MODEL_ID_1, code: 'code-1' }));
      });

      it('should update models', async () => {
        await repository.bulkSave([
          MissionFactory.create({ id: MODEL_ID_0, description: DESCRIPTION }),
          MissionFactory.create({ id: MODEL_ID_1, description: DESCRIPTION }),
        ]);

        const models = await repository.findAll();
        expect(models.length).toBe(2);
        expect(models[0].id).toBe(MODEL_ID_0);
        expect(models[0].description).toBe(DESCRIPTION);
        expect(models[1].id).toBe(MODEL_ID_1);
        expect(models[1].description).toBe(DESCRIPTION);
      });
    });
  });
});
