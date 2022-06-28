import { JobBoardFactory, JobBoardImplBusiness } from '@business';
import { cleanDatabase, getConnection, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model, Types } from 'mongoose';

import { ConverterNames } from '../../constants/converter-names';
import { SchemaNames } from '../../constants/schema-names';
import { DatabaseModule } from '../../database.module';
import { JobBoard } from '../../schemas/job-board';
import { JobBoardDoc } from '../../schemas/job-board.schema';
import { JobBoardConverter } from './job-board.converter';

let connection: Connection;
let jobBoardModel: Model<JobBoardDoc>;
let jobBoardCvtr: JobBoardConverter;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [DatabaseModule],
  }).compile();

  connection = getConnection(module);
  jobBoardModel = connection.models[SchemaNames.JOB_BOARD] as Model<JobBoardDoc>;
  jobBoardCvtr = module.get<JobBoardConverter>(ConverterNames.JOB_BOARD);
};

describe('JobBoardConverter', () => {
  beforeEach(async () => {
    await createApp();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when converts to document', () => {
    describe('given a job board', () => {
      const ID = TestUtils.genMongoId();
      const SOURCE_1 = TestUtils.genMongoId();
      const SOURCE_2 = TestUtils.genMongoId();
      let jobBoard: JobBoardImplBusiness;

      beforeEach(() => {
        jobBoard = JobBoardFactory.create({
          createdAt: 100,
          updatedAt: 100,
          id: ID,
          name: 'name',
          missionSources: [SOURCE_1, SOURCE_2],
        });
      });

      it('should convert to document', () => {
        const jobBoardDoc = jobBoardCvtr.toDocument(jobBoard);

        expect(jobBoardDoc.createdAt).toEqual(new Date(100));
        expect(jobBoardDoc.updatedAt).toEqual(new Date(100));
        expect(jobBoardDoc._id).toEqual(new Types.ObjectId(ID));
        expect(jobBoardDoc.name).toEqual('name');
        expect(jobBoardDoc.missionSources.length).toBe(2);
        expect(jobBoardDoc.missionSources[0]).toEqual(new Types.ObjectId(SOURCE_1));
        expect(jobBoardDoc.missionSources[1]).toEqual(new Types.ObjectId(SOURCE_2));
      });
    });
  });

  describe('when converts to domain', () => {
    describe('given a job board', () => {
      const ID = TestUtils.genMongoId();
      const SOURCE_1 = TestUtils.genMongoId();
      const SOURCE_2 = TestUtils.genMongoId();
      let jobBoardDoc: JobBoardDoc;

      beforeEach(() => {
        const jobBoard: JobBoard = {
          createdAt: new Date(100),
          updatedAt: new Date(100),
          _id: new Types.ObjectId(ID),
          name: 'name',
          missionSources: [new Types.ObjectId(SOURCE_1), new Types.ObjectId(SOURCE_2)],
        };
        jobBoardDoc = new jobBoardModel(jobBoard);
      });

      it('should convert to domain', () => {
        const jobBoard = jobBoardCvtr.toDomain(jobBoardDoc);

        expect(jobBoard.createdAt).toBe(100);
        expect(jobBoard.updatedAt).toBe(100);
        expect(jobBoard.id).toBe(ID);
        expect(jobBoard.name).toBe('name');
        expect(jobBoard.missionSources).toEqual([SOURCE_1, SOURCE_2]);
      });
    });
  });
});
