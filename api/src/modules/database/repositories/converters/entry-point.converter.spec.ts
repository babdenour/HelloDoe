import { EntryPointFactory, EntryPointTypeBusiness, FacebookEntryPointImplBusiness } from '@business';
import { cleanDatabase, getConnection, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model, Types } from 'mongoose';

import { ConverterNames } from '../../constants/converter-names';
import { EntryPointKind } from '../../constants/entry-point-kind';
import { SchemaNames } from '../../constants/schema-names';
import { DatabaseModule } from '../../database.module';
import { EntryPoint } from '../../schemas/entry-point';
import { EntryPointDoc } from '../../schemas/entry-point.schema';
import { EntryPointConverter } from './entry-point.converter';

describe('EntryPointConverter', () => {
  let connection: Connection;
  let entryPtModel: Model<EntryPointDoc>;
  let entryPtCvtr: EntryPointConverter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    entryPtModel = connection.models[SchemaNames.ENTRY_POINT] as Model<EntryPointDoc>;
    entryPtCvtr = module.get<EntryPointConverter>(ConverterNames.ENTRY_POINT);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when converts to document', () => {
    describe('given a facebook entry point', () => {
      const ID = TestUtils.genMongoId();
      const AGENCY_ID = TestUtils.genMongoId();
      const JOB_BOARD_ID = TestUtils.genMongoId();
      let entryPt: FacebookEntryPointImplBusiness;

      beforeEach(() => {
        entryPt = EntryPointFactory.createFacebookEntryPoint({
          createdAt: 100,
          updatedAt: 100,
          id: ID,
          jobBoard: JOB_BOARD_ID,
          pageId: 'pageId',
        });
      });

      it('should convert to document', () => {
        const entryPtDoc = entryPtCvtr.toDocument(entryPt);

        expect(entryPtDoc.createdAt).toEqual(new Date(100));
        expect(entryPtDoc.updatedAt).toEqual(new Date(100));
        expect(entryPtDoc._id).toEqual(new Types.ObjectId(ID));
        expect(entryPtDoc.jobBoard).toEqual(new Types.ObjectId(JOB_BOARD_ID));
        expect(entryPtDoc.kind).toBe(EntryPointKind.FACEBOOK);
        expect(entryPtDoc.facebook.pageId).toBe('pageId');
      });
    });

    describe('given an unsupported type of entry point', () => {
      class Unsupported {}
      const entryPt = new Unsupported();

      it('should throw', () => {
        expect(() => {
          entryPtCvtr.toDocument(entryPt as EntryPointTypeBusiness);
        }).toThrow();
      });
    });
  });

  describe('when converts to domain', () => {
    describe('given a facebook entry point', () => {
      const ID = TestUtils.genMongoId();
      const AGENCY_ID = TestUtils.genMongoId();
      const JOB_BOARD_ID = TestUtils.genMongoId();
      let entryPtDoc: EntryPointDoc;

      beforeEach(() => {
        const entryPt: EntryPoint = {
          createdAt: new Date(100),
          updatedAt: new Date(100),
          _id: new Types.ObjectId(ID),
          jobBoard: new Types.ObjectId(JOB_BOARD_ID),
          kind: EntryPointKind.FACEBOOK,
          facebook: {
            pageId: 'pageId',
          },
        };
        entryPtDoc = new entryPtModel(entryPt);
      });

      it('should convert to domain', () => {
        const entryPt = entryPtCvtr.toDomain(entryPtDoc);

        expect(entryPt.createdAt).toBe(100);
        expect(entryPt.updatedAt).toBe(100);
        expect(entryPt.id).toBe(ID);
        expect(entryPt.jobBoard).toBe(JOB_BOARD_ID);
        expect(entryPt.pageId).toBe('pageId');
      });
    });

    describe('given an unsupported kind of entry point', () => {
      const UNSUPPORTED_KIND = 'UNSUPPORTED';
      let entryPtDoc: EntryPointDoc;

      beforeEach(() => {
        entryPtDoc = new entryPtModel({
          kind: UNSUPPORTED_KIND as EntryPointKind,
        });
      });

      it('should throw', () => {
        expect(() => {
          entryPtCvtr.toDomain(entryPtDoc);
        }).toThrow();
      });
    });
  });
});
