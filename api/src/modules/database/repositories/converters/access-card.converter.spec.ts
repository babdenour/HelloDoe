import { AccessCardFactory, AccessCardTypeBusiness, FacebookAccessCardImplBusiness } from '@business';
import { cleanDatabase, getConnection, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model, Types } from 'mongoose';

import { AccessCardKind } from '../../constants/access-card-kind';
import { ConverterNames } from '../../constants/converter-names';
import { SchemaNames } from '../../constants/schema-names';
import { DatabaseModule } from '../../database.module';
import { AccessCard } from '../../schemas/access-card';
import { AccessCardDoc } from '../../schemas/access-card.schema';
import { AccessCardConverter } from './access-card.converter';

describe('AccessCardConverter', () => {
  let connection: Connection;
  let accessCardModel: Model<AccessCardDoc>;
  let accessCardCvtr: AccessCardConverter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    accessCardModel = connection.models[SchemaNames.ACCESS_CARD] as Model<AccessCardDoc>;
    accessCardCvtr = module.get<AccessCardConverter>(ConverterNames.ACCESS_CARD);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when converts to document', () => {
    describe('given a facebook access card', () => {
      const ID = TestUtils.genMongoId();
      const ENTRY_POINT_ID = TestUtils.genMongoId();
      const DOER_ID = TestUtils.genMongoId();
      let accessCard: FacebookAccessCardImplBusiness;

      beforeEach(() => {
        accessCard = AccessCardFactory.createFacebookAccessCard({
          createdAt: 100,
          updatedAt: 100,
          id: ID,
          entryPoint: ENTRY_POINT_ID,
          doer: DOER_ID,
          pageScopeId: 'pageScopeId',
        });
      });

      it('should convert to document', () => {
        const accessCardDoc = accessCardCvtr.toDocument(accessCard);

        expect(accessCardDoc.createdAt).toEqual(new Date(100));
        expect(accessCardDoc.updatedAt).toEqual(new Date(100));
        expect(accessCardDoc._id).toEqual(new Types.ObjectId(ID));
        expect(accessCardDoc.entryPoint).toEqual(new Types.ObjectId(ENTRY_POINT_ID));
        expect(accessCardDoc.doer).toEqual(new Types.ObjectId(DOER_ID));
        expect(accessCardDoc.kind).toBe(AccessCardKind.FACEBOOK);
        expect(accessCardDoc.facebook.pageScopeId).toBe('pageScopeId');
      });
    });

    describe('given an unsupported type of access card', () => {
      class Unsupported {}
      const accessCard = new Unsupported();

      it('should throw', () => {
        expect(() => {
          accessCardCvtr.toDocument(accessCard as AccessCardTypeBusiness);
        }).toThrow();
      });
    });
  });

  describe('when converts to domain', () => {
    describe('given a facebook access card', () => {
      const ID = TestUtils.genMongoId();
      const ENTRY_POINT_ID = TestUtils.genMongoId();
      const DOER_ID = TestUtils.genMongoId();
      let accessCardDoc: AccessCardDoc;

      beforeEach(() => {
        const accessCard: AccessCard = {
          createdAt: new Date(100),
          updatedAt: new Date(100),
          _id: new Types.ObjectId(ID),
          entryPoint: new Types.ObjectId(ENTRY_POINT_ID),
          doer: new Types.ObjectId(DOER_ID),
          kind: AccessCardKind.FACEBOOK,
          facebook: {
            pageScopeId: 'pageScopeId',
          },
        };
        accessCardDoc = new accessCardModel(accessCard);
      });

      it('should convert to domain', () => {
        const accessCard = accessCardCvtr.toDomain(accessCardDoc);

        expect(accessCard.createdAt).toBe(100);
        expect(accessCard.updatedAt).toBe(100);
        expect(accessCard.id).toBe(ID);
        expect(accessCard.entryPoint).toBe(ENTRY_POINT_ID);
        expect(accessCard.doer).toBe(DOER_ID);
        expect(accessCard.pageScopeId).toBe('pageScopeId');
      });
    });

    describe('given an unsupported kind of access card', () => {
      const UNSUPPORTED_KIND = 'UNSUPPORTED';
      let accessCardDoc: AccessCardDoc;

      beforeEach(() => {
        accessCardDoc = new accessCardModel({
          kind: UNSUPPORTED_KIND as AccessCardKind,
        });
      });

      it('should throw', () => {
        expect(() => {
          accessCardCvtr.toDomain(accessCardDoc);
        }).toThrow();
      });
    });
  });
});
