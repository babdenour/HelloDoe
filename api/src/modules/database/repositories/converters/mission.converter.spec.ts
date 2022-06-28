/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ClientBusinessImpl, ClientFactory, DoerFactory, DoerImplBsn, MissionBusinessImpl, MissionFactory } from '@business';
import { cleanDatabase, getConnection, getConverter, getModel, getRepository, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model, Types } from 'mongoose';

import { DatabaseModule } from '../../database.module';
import { MissionConverter } from '../../repositories/converters/mission.converter';
import { Mission } from '../../schemas/mission';
import { MissionDocument } from '../../schemas/mission.schema';
import { ClientRepository } from '../client.repository';
import { DoerRepositoryImpl } from '../doer.repository.impl';
import { MissionRepository } from '../mission.repository';

describe('MissionConverter', () => {
  let missionRepository: MissionRepository;
  let missionModel: Model<MissionDocument>;
  let clientRepository: ClientRepository;
  let doerRepository: DoerRepositoryImpl;
  let connection: Connection;
  let missionConverter: MissionConverter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    missionModel = getModel('mission', connection);
    missionRepository = getRepository('mission', module);
    clientRepository = getRepository('client', module);
    doerRepository = getRepository('doer', module);
    missionConverter = getConverter('mission', module);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when converts to document', () => {
    const ID = TestUtils.genMongoId();
    const AGENCY_ID = TestUtils.genMongoId();
    let mission: MissionBusinessImpl;

    beforeEach(() => {
      mission = MissionFactory.create({
        createdAt: 100,
        updatedAt: 100,
        id: ID,
        agency: AGENCY_ID,
      });
    });

    it('should convert to document', () => {
      const missionDoc = missionConverter.toDocument(mission);

      expect(missionDoc.createdAt).toEqual(new Date(100));
      expect(missionDoc.updatedAt).toEqual(new Date(100));
      expect(missionDoc._id).toEqual(new Types.ObjectId(ID));
      expect(missionDoc.agency).toEqual(new Types.ObjectId(AGENCY_ID));
    });
  });

  describe('when converts to domain', () => {
    const ID = TestUtils.genMongoId();
    const AGENCY_ID = TestUtils.genMongoId();
    let missionDoc: MissionDocument;

    beforeEach(() => {
      const mission: Partial<Mission> = {
        createdAt: new Date(100),
        updatedAt: new Date(100),
        _id: new Types.ObjectId(ID),
        agency: new Types.ObjectId(AGENCY_ID),
      };
      missionDoc = new missionModel(mission);
    });

    it('should convert to domain', () => {
      const mission = missionConverter.toDomain(missionDoc);

      expect(mission.createdAt).toEqual(100);
      expect(mission.updatedAt).toEqual(100);
      expect(mission.id).toEqual(ID);
      expect(mission.agency).toEqual(AGENCY_ID);
    });
  });

  describe('when converts with client', () => {
    describe('given a mission with client not populated', () => {
      const missionId = '111111111111111111111111';
      const clientId = '222222222222222222222222';

      beforeEach(async () => {
        const client = ClientFactory.create({
          id: clientId,
        });
        const mission = MissionFactory.create({
          id: missionId,
          client: clientId,
        });
        await Promise.all([missionRepository.save(mission), clientRepository.save(client)]);
      });

      it('should convert client to string', async () => {
        const doc = await missionModel.findOne({
          _id: missionId,
        });

        const mission = missionConverter.toDomain(doc);

        expect(mission.client).toBe(clientId);
      });
    });

    describe('given a mission with client populated', () => {
      const missionId = '111111111111111111111111';
      const clientId = '222222222222222222222222';

      beforeEach(async () => {
        const client = ClientFactory.create({
          id: clientId,
        });
        const mission = MissionFactory.create({
          id: missionId,
          client: clientId,
        });
        await Promise.all([missionRepository.save(mission), clientRepository.save(client)]);
      });

      it('should convert client to domain', async () => {
        const doc = await missionModel
          .findById({
            _id: missionId,
          })
          .populate('clientId')
          .exec();

        const mission = missionConverter.toDomain(doc) as MissionBusinessImpl<ClientBusinessImpl>;

        expect(mission.client instanceof ClientBusinessImpl).toBe(true);
        expect(mission.client.id).toBe(clientId);
      });
    });
  });

  describe('when converts with applicants', () => {
    describe('given a mission with applicants not populated', () => {
      const doer1Id = '222222222222222222222222';
      const doer2Id = '333333333333333333333333';
      const missionId = '111111111111111111111111';

      beforeEach(async () => {
        const doer1 = DoerFactory.create({ id: doer1Id });
        const doer2 = DoerFactory.create({ id: doer2Id });
        const mission = MissionFactory.create({
          id: missionId,
          applicants: [doer1, doer2],
        });
        await Promise.all([missionRepository.save(mission), doerRepository.save(doer1), doerRepository.save(doer2)]);
      });

      it('should convert applicants to string', async () => {
        const doc = await missionModel.findOne({
          _id: missionId,
        });

        const mission = missionConverter.toDomain(doc);

        expect(mission.applicants[0]).toBe(doer1Id);
        expect(mission.applicants[1]).toBe(doer2Id);
      });
    });

    describe('given a mission with applicants populated', () => {
      const doer1Id = '222222222222222222222222';
      const doer2Id = '333333333333333333333333';
      const missionId = '111111111111111111111111';

      beforeEach(async () => {
        const doer1 = DoerFactory.create({ id: doer1Id });
        const doer2 = DoerFactory.create({ id: doer2Id });
        const mission = MissionFactory.create({
          id: missionId,
          applicants: [doer1, doer2],
        });
        await Promise.all([missionRepository.save(mission), doerRepository.save(doer1), doerRepository.save(doer2)]);
      });

      it('should convert applicants to domain', async () => {
        const doc = await missionModel
          .findById({
            _id: missionId,
          })
          .populate('applicants')
          .exec();

        const mission = missionConverter.toDomain(doc);

        expect(mission.applicants[0] instanceof DoerImplBsn).toBe(true);
        expect((mission.applicants[0] as DoerImplBsn).id).toBe(doer1Id);
        expect((mission.applicants[1] as DoerImplBsn).id).toBe(doer2Id);
      });
    });
  });
});
