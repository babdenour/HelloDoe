import { ClientBusinessImpl, ClientFactory, DoerFactory, DoerImplBsn, MissionBusinessImpl, MissionFactory, MissionStatus } from '@business';
import { cleanDatabase, getConnection, getRepository, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { RepositoryNames } from '../constants/repository-names';
import { DatabaseModule } from '../database.module';
import { ClientRepository } from './client.repository';
import { DoerRepositoryImpl } from './doer.repository.impl';
import { MissionRepository } from './mission.repository';

let missionRepo: MissionRepository;
let clientRepository: ClientRepository;
let doerRepo: DoerRepositoryImpl;
let connection: Connection;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [DatabaseModule],
  }).compile();

  connection = getConnection(module);
  clientRepository = getRepository('client', module);
  doerRepo = module.get<DoerRepositoryImpl>(RepositoryNames.DOER);
  missionRepo = getRepository('mission', module);
};

describe('MissionRepository', () => {
  beforeEach(async () => {
    await createApp();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('findByIdWithClient', () => {
    describe('if mission exists', () => {
      const id = '123456123456123456123456';
      const description = 'a description';
      let mission;

      beforeEach(async () => {
        mission = MissionFactory.create({
          id,
          description,
        });
        await missionRepo.save(mission);
      });

      it('should find by id', async () => {
        const mission = await missionRepo.findByIdWithClient(id);

        expect(mission.id).toBe(id);
        expect(mission.description).toBe(description);
      });
    });

    describe('if mission has client', () => {
      const CLIENT_ID = '111111111111111111111111';
      const MISSION_ID = '123456123456123456123456';
      let client: ClientBusinessImpl;
      let mission: MissionBusinessImpl;

      beforeEach(async () => {
        client = ClientFactory.create({ id: CLIENT_ID });
        client = await clientRepository.save(client);
        mission = MissionFactory.create({ id: MISSION_ID });
        mission.client = client;
        mission = await missionRepo.save(mission);
      });

      it('should populate client', async () => {
        const mission: MissionBusinessImpl<ClientBusinessImpl> = (await missionRepo.findByIdWithClient(MISSION_ID)) as MissionBusinessImpl<ClientBusinessImpl>;

        expect(mission.client.id).toBe(CLIENT_ID);
      });
    });
  });

  describe('when save a mission', () => {
    describe('if referenced schemas are objects', () => {
      let mission: MissionBusinessImpl;

      beforeEach(() => {
        mission = MissionFactory.create({
          client: ClientFactory.create(),
          applicants: [DoerFactory.create()],
          hired: [DoerFactory.create()],
          seenBy: [DoerFactory.create()],
        });
      });

      it('should return referenced schemas as objects', async () => {
        mission = await missionRepo.save(mission);

        expect(mission.client instanceof ClientBusinessImpl).toBe(true);
        expect(mission.applicants[0] instanceof DoerImplBsn).toBe(true);
        expect(mission.hired[0] instanceof DoerImplBsn).toBe(true);
        expect(mission.seenBy[0] instanceof DoerImplBsn).toBe(true);
      });
    });

    describe('if code already exists', () => {
      const CODE = 'code';
      const MISSION = MissionFactory.create({ code: CODE });

      beforeEach(async () => {
        await missionRepo.save(MISSION);
      });

      it('should raise error', async () => {
        await expect(missionRepo.save(MISSION)).rejects.toThrow();
      });
    });
  });

  describe('when find by status being prepared and not seen by doer and agency in', () => {
    const DOER_ID = TestUtils.genMongoId();
    const MISSION_1_ID = TestUtils.genMongoId();
    const MISSION_2_ID = TestUtils.genMongoId();
    const AGENCY_1_ID = TestUtils.genMongoId();
    const AGENCY_2_ID = TestUtils.genMongoId();
    const AGENCY_3_ID = TestUtils.genMongoId();

    beforeEach(async () => {
      await doerRepo.save(
        DoerFactory.create({
          id: DOER_ID,
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_1_ID,
          code: '1',
          agency: AGENCY_1_ID,
          status: MissionStatus.BEING_PREPARED,
          seenBy: [],
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_2_ID,
          code: '2',
          agency: AGENCY_2_ID,
          status: MissionStatus.BEING_PREPARED,
          seenBy: [],
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          agency: AGENCY_3_ID,
          code: '3',
          status: MissionStatus.BEING_PREPARED,
          seenBy: [],
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          agency: AGENCY_1_ID,
          code: '4',
          seenBy: [DOER_ID],
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          agency: AGENCY_1_ID,
          code: '5',
          status: MissionStatus.ON_GOING,
        }),
      );
    });

    it('should find missions', async () => {
      const missions: MissionBusinessImpl[] = await missionRepo.findByStatusBeingPreparedAndNotSeenByDoerAndAgencyIn(DOER_ID, [AGENCY_1_ID, AGENCY_2_ID]);

      expect(missions.length).toBe(2);
      expect(missions[0].id).toBe(MISSION_1_ID);
      expect(missions[0].agency).toBe(AGENCY_1_ID);
      expect(missions[0].status).toBe(MissionStatus.BEING_PREPARED);
      expect(missions[0].seenBy).toEqual([]);
      expect(missions[1].id).toBe(MISSION_2_ID);
      expect(missions[1].agency).toBe(AGENCY_2_ID);
      expect(missions[1].status).toBe(MissionStatus.BEING_PREPARED);
      expect(missions[1].seenBy).toEqual([]);
    });
  });

  describe('when find by id and client id', () => {
    const MISSION_ID = TestUtils.genMongoId();
    const MISSION_OTHER_ID = TestUtils.genMongoId();
    const CLIENT_ID = TestUtils.genMongoId();
    const CLIENT_OTHER_ID = TestUtils.genMongoId();

    beforeEach(async () => {
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID,
          client: CLIENT_OTHER_ID,
          code: '1',
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_OTHER_ID,
          client: CLIENT_ID,
          code: '2',
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID,
          client: CLIENT_ID,
          code: '3',
        }),
      );
    });

    it('should find missions', async () => {
      const mission: MissionBusinessImpl = await missionRepo.findByIdAndClientId(MISSION_ID, CLIENT_ID);

      expect(mission.id).toBe(MISSION_ID);
      expect(mission.client).toBe(CLIENT_ID);
    });
  });

  describe('when add doer in seen by for missions', () => {
    const MISSION_ID_0 = TestUtils.genMongoId();
    const MISSION_ID_1 = TestUtils.genMongoId();
    const MISSION_ID_2 = TestUtils.genMongoId();

    const DOER_ID = TestUtils.genMongoId();
    const OTHER_DOER_ID = TestUtils.genMongoId();

    beforeEach(async () => {
      await doerRepo.save(
        DoerFactory.create({
          id: DOER_ID,
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID_0,
          code: '1',
          seenBy: [],
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID_1,
          code: '2',
          seenBy: [OTHER_DOER_ID],
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID_2,
          code: '3',
          seenBy: [DOER_ID],
        }),
      );
    });

    it('should add doer in seen by for missions', async () => {
      await missionRepo.addDoerInSeenByForMissions(DOER_ID, [MISSION_ID_0, MISSION_ID_1, MISSION_ID_2]);

      const missions: MissionBusinessImpl[] = await missionRepo.findAll();

      expect(missions[0].seenBy).toEqual([DOER_ID]);
      expect(missions[1].seenBy).toEqual([OTHER_DOER_ID, DOER_ID]);
      expect(missions[2].seenBy).toEqual([DOER_ID]);
    });
  });

  describe('when remove doer from seen by by status being prepared', () => {
    const DOER_ID = TestUtils.genMongoId();
    const OTHER_DOER_ID = TestUtils.genMongoId();
    const AGENCY_1_ID = TestUtils.genMongoId();
    const AGENCY_2_ID = TestUtils.genMongoId();

    beforeEach(async () => {
      await doerRepo.save(
        DoerFactory.create({
          id: DOER_ID,
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          code: '1',
          agency: AGENCY_1_ID,
          status: MissionStatus.BEING_PREPARED,
          seenBy: [DOER_ID, OTHER_DOER_ID],
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          code: '2',
          agency: AGENCY_1_ID,
          status: MissionStatus.BEING_PREPARED,
          seenBy: [DOER_ID],
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          code: '3',
          agency: AGENCY_1_ID,
          status: MissionStatus.BEING_PREPARED,
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          code: '4',
          agency: AGENCY_2_ID,
          status: MissionStatus.BEING_PREPARED,
          seenBy: [DOER_ID, OTHER_DOER_ID],
        }),
      );
    });

    it('should remove doer from seen by', async () => {
      await missionRepo.removeDoerFromSeenByByStatusBeingPreparedAndAgencyIn(DOER_ID, [AGENCY_1_ID]);

      const missions: MissionBusinessImpl[] = await missionRepo.findAll();

      expect(missions[0].seenBy).toEqual([OTHER_DOER_ID]);
      expect(missions[1].seenBy).toEqual([]);
      expect(missions[2].seenBy).toEqual([]);
      expect(missions[3].seenBy).toEqual([DOER_ID, OTHER_DOER_ID]);
    });
  });
});
