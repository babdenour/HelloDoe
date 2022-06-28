import { AgencyFactory, AgencyImplBusiness } from '@business';
import { cleanDatabase, getConnection, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model, Types } from 'mongoose';

import { ConverterNames } from '../../constants/converter-names';
import { SchemaNames } from '../../constants/schema-names';
import { DatabaseModule } from '../../database.module';
import { Agency } from '../../schemas/agency';
import { AgencyDoc } from '../../schemas/agency.schema';
import { AgencyConverter } from './agency.converter';

describe('AgencyConverter', () => {
  let connection: Connection;
  let agencyModel: Model<AgencyDoc>;
  let agencyCvtr: AgencyConverter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    agencyModel = connection.models[SchemaNames.AGENCY] as Model<AgencyDoc>;
    agencyCvtr = module.get<AgencyConverter>(ConverterNames.AGENCY);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when converts to document', () => {
    describe('given an agency', () => {
      const ID = TestUtils.genMongoId();
      let agency: AgencyImplBusiness;

      beforeEach(() => {
        agency = AgencyFactory.create({
          createdAt: 100,
          updatedAt: 100,
          id: ID,
          name: 'name',
        });
      });

      it('should convert to document', () => {
        const agencyDoc = agencyCvtr.toDocument(agency);

        expect(agencyDoc.createdAt).toEqual(new Date(100));
        expect(agencyDoc.updatedAt).toEqual(new Date(100));
        expect(agencyDoc._id).toEqual(new Types.ObjectId(ID));
        expect(agencyDoc.name).toBe('name');
      });
    });
  });

  describe('when converts to domain', () => {
    describe('given an agency', () => {
      const ID = TestUtils.genMongoId();
      let agencyDoc: AgencyDoc;

      beforeEach(() => {
        const agency: Agency = {
          createdAt: new Date(100),
          updatedAt: new Date(100),
          _id: new Types.ObjectId(ID),
          name: 'name',
        };
        agencyDoc = new agencyModel(agency);
      });

      it('should convert to domain', () => {
        const agency = agencyCvtr.toDomain(agencyDoc);

        expect(agency.createdAt).toBe(100);
        expect(agency.updatedAt).toBe(100);
        expect(agency.id).toBe(ID);
        expect(agency.name).toBe('name');
      });
    });
  });
});
