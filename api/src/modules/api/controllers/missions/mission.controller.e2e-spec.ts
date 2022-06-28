import {
  ClientBusinessImpl,
  ClientFactory,
  ContractType,
  MissionBusinessImpl,
  MissionFactory,
  MissionStatus,
  MissionTask,
  QuestionFactory,
  QuizzFactory,
  TimeTableHourlyVolumeUnit,
} from '@business';
import {
  ClientRepository,
  DatabaseModule,
  MissionRepository,
  QuestionRepository,
  QuizzRepository,
  RepositoryNames,
} from '@database';
import { I18nModule } from '@i18n';
import { cleanDatabase, getConnection, getRepository, TestUtils, TokenFactory } from '@mocks';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { MissionAdapter } from '../../adapters/mission.adapter';
import { ApiModule } from '../../api.module';
import { AddCandidatesDto } from '../../controllers/missions/dtos/add-candidates.dto';
import { GetResourceResponse } from '../../controllers/responses/get-resource.response';
import { MissionDateParam } from '../../params/mission/mission-date.param';
import { TimeTableParam } from '../../params/time-table.param';
import { CreateWithoutPaymentParams } from './params/create-without-payment.params';

const BASE_URL = '/api/v2/missions';

const WRONG_ID = '123456123456123456123456';

let app: INestApplication;
let connection: Connection;
let clientRepository: ClientRepository;
let missionRepo: MissionRepository;
let questionRepo: QuestionRepository;
let quizzRepo: QuizzRepository;
let tokenFactory: TokenFactory;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ApiModule, DatabaseModule, I18nModule],
  }).compile();

  connection = getConnection(module);
  clientRepository = getRepository('client', module);
  missionRepo = getRepository('mission', module);
  questionRepo = module.get<QuestionRepository>(RepositoryNames.QUESTION);
  quizzRepo = module.get<QuizzRepository>(RepositoryNames.QUIZZ);
  tokenFactory = new TokenFactory(module);

  app = module.createNestApplication();
  await app.init();
};

describe('MissionsController E2E', () => {
  beforeAll(async () => {
    await createApp();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/GET all missions', () => {
    const TESTED_URL = `${BASE_URL}`;
    let missions: MissionBusinessImpl[];

    beforeEach(async () => {
      const MISSION_1 = await missionRepo.save(MissionFactory.create({ code: '1' }));
      const MISSION_2 = await missionRepo.save(MissionFactory.create({ code: '2' }));
      missions = await Promise.all([MISSION_1, MISSION_2]);
    });

    it(`should get all missions`, () => {
      const expected = {
        success: true,
        data: missions.map(MissionAdapter.toApi),
      };

      return request(app.getHttpServer())
        .get(TESTED_URL)
        .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
        .expect(200)
        .expect(JSON.stringify(expected));
    });
  });

  describe('/GET a mission', () => {
    const TESTED_URL = ({ missionId }: { missionId: string }) => `${BASE_URL}/${missionId}/`;

    describe('if mission exists', () => {
      let missionId: string;
      let mission: MissionBusinessImpl;

      beforeEach(async () => {
        mission = await missionRepo.save(MissionFactory.create());
        missionId = mission.id;
      });

      it(`should get the mission`, () => {
        const expected = new GetResourceResponse(MissionAdapter.toApi(mission));

        return request(app.getHttpServer())
          .get(TESTED_URL({ missionId }))
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(200)
          .expect(JSON.stringify(expected));
      });
    });

    describe('if mission has client', () => {
      let clientId: string;
      let missionId: string;
      let client: ClientBusinessImpl;
      let mission: MissionBusinessImpl;

      beforeEach(async () => {
        client = ClientFactory.create();
        client = await clientRepository.save(client);
        clientId = client.id;
        mission = MissionFactory.create();
        mission.client = client;
        mission = await missionRepo.save(mission);
        missionId = mission.id;
      });

      it(`should populate client`, () => {
        return request(app.getHttpServer())
          .get(TESTED_URL({ missionId }))
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(200)
          .expect((res: request.Response) => {
            expect(res.body.data.clientId.id).toBe(clientId);
          });
      });
    });

    describe('if mission does not exist', () => {
      it(`should return resource not found`, () => {
        return request(app.getHttpServer())
          .get(TESTED_URL({ missionId: WRONG_ID }))
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(404);
      });
    });
  });

  describe('/POST createWithoutPayment', () => {
    const AGENCY = TestUtils.genMongoId();
    const ATTRIBUTES: string[] = ['attribute'];
    const CATEGORY = 'CATEGORY';
    const CODE = 'CODE';
    const COMPANY_ADDRESS = 'COMPANY_ADDRESS';
    const COMPANY_NAME = 'COMPANY_NAME';
    const COMPANY_SIREN = 'COMPANY_SIREN';
    const CONTACT_EMAIL = 'CONTACT_EMAIL';
    const CONTACT_FIRSTNAME = 'CONTACT_FIRSTNAME';
    const CONTACT_LASTNAME = 'CONTACT_LASTNAME';
    const CONTACT_PHONE = 'CONTACT_PHONE';
    const CONTRACT_TYPE: ContractType = ContractType.TEMPORARY;
    const DATES: MissionDateParam[] = [];
    const DESCRIPTION = 'DESCRIPTION';
    const DISTRICT = 19;
    const DOERS_COUNT = 10;
    const LOCATION = 'LOCATION';
    const PRICE = 15;
    const SKILLS: string[] = ['skill'];
    const TASKS: MissionTask[] = [MissionTask.CATERING_SERVICE];
    const TIME_TABLE: TimeTableParam = {
      beginAt: 10,
      endAt: 100,
      duration: 90,
    } as TimeTableParam;
    const TOOLS: string[] = ['tool'];
    let body: CreateWithoutPaymentParams;

    beforeEach(() => {
      body = new CreateWithoutPaymentParams();
      body.agency = AGENCY;
      body.attributes = ATTRIBUTES;
      body.category = CATEGORY;
      body.code = CODE;
      body.companyAddress = COMPANY_ADDRESS;
      body.companyName = COMPANY_NAME;
      body.companySiren = COMPANY_SIREN;
      body.contactEmail = CONTACT_EMAIL;
      body.contactFirstName = CONTACT_FIRSTNAME;
      body.contactLastName = CONTACT_LASTNAME;
      body.contactPhone = CONTACT_PHONE;
      body.contractType = CONTRACT_TYPE;
      body.dates = DATES;
      body.description = DESCRIPTION;
      body.district = DISTRICT;
      body.doersCount = DOERS_COUNT;
      body.location = LOCATION;
      body.price = PRICE;
      body.skills = SKILLS;
      body.tasks = TASKS;
      body.timeTable = TIME_TABLE;
      body.tools = TOOLS;
    });

    const TESTED_URL = `${BASE_URL}`;

    it(`should create mission`, () => {
      return request(app.getHttpServer())
        .post(TESTED_URL)
        .send(body)
        .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
        .expect(200)
        .expect((res: request.Response) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.agency).toBe(AGENCY);
          expect(res.body.data.address).toBe(LOCATION);
          expect(res.body.data.amount).toBe(PRICE);
          expect(res.body.data.category).toBe(CATEGORY);
          expect(res.body.data.clientId.address).toBe(COMPANY_ADDRESS);
          expect(res.body.data.clientId.companyName).toBe(COMPANY_NAME);
          expect(res.body.data.clientId.siren).toBe(COMPANY_SIREN);
          expect(res.body.data.clientId.contact.email).toBe(CONTACT_EMAIL);
          expect(res.body.data.clientId.contact.firstName).toBe(CONTACT_FIRSTNAME);
          expect(res.body.data.clientId.contact.lastName).toBe(CONTACT_LASTNAME);
          expect(res.body.data.clientId.contact.phone).toBe(CONTACT_PHONE);
          expect(res.body.data.code).toBe(CODE);
          expect(res.body.data.contractType).toBe(CONTRACT_TYPE);
          expect(res.body.data.dates).toEqual(DATES);
          expect(res.body.data.description).toBe(DESCRIPTION);
          expect(res.body.data.district).toBe(DISTRICT);
          expect(res.body.data.nbWorkers).toBe(DOERS_COUNT);
          expect(res.body.data.requirements.attributes).toEqual(ATTRIBUTES);
          expect(res.body.data.requirements.skills).toEqual(SKILLS);
          expect(res.body.data.requirements.tools).toEqual(TOOLS);
          expect(res.body.data.status).toEqual(MissionStatus.FOR_VALIDATION);
          expect(res.body.data.tasks).toEqual(TASKS);
          expect(res.body.data.timeTable.beginAt).toBe(10);
          expect(res.body.data.timeTable.endAt).toBe(100);
          expect(res.body.data.timeTable.duration).toBe(90);
        });
    });
  });

  describe('/POST add candidates', () => {
    let body: AddCandidatesDto;

    beforeEach(() => {
      body = {
        candidates: [WRONG_ID],
      };
    });

    const TESTED_URL = ({ missionId }: { missionId: string }) => `${BASE_URL}/${missionId}/candidates`;

    describe('when add a candidate', () => {
      const id = WRONG_ID;

      beforeEach(async () => {
        await missionRepo.save(MissionFactory.create({ id }));
      });

      it(`should add candidate`, () => {
        return request(app.getHttpServer())
          .post(TESTED_URL({ missionId: id }))
          .send(body)
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(200)
          .expect(JSON.stringify({ success: true }));
      });
    });

    describe('when mission does not exist', () => {
      it(`should return failure`, () => {
        return request(app.getHttpServer())
          .post(TESTED_URL({ missionId: '111111111111111111111111' }))
          .send(body)
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(200)
          .expect(
            JSON.stringify({
              success: false,
              error: 'Mission could not be found',
            }),
          );
      });
    });
  });

  describe('/PUT update time table', () => {
    const BEGIN_AT = 10;
    const END_AT = 100;
    const DURATION = 90;
    const HOURLY_VOLUME_UNIT = TimeTableHourlyVolumeUnit.WEEK;
    const HOURLY_VOLUME_VOLUME = 10;
    const HOURLY_VOLUME_FLEXIBLE = false;
    const SCHEDULE_FLEXIBLE = true;
    let body: TimeTableParam;

    beforeEach(() => {
      body = {
        beginAt: BEGIN_AT,
        endAt: END_AT,
        duration: DURATION,
        hourlyVolume: {
          unit: HOURLY_VOLUME_UNIT,
          volume: HOURLY_VOLUME_VOLUME,
          flexible: HOURLY_VOLUME_FLEXIBLE,
        },
        schedule: {
          slots: [],
          shifts: [],
          flexible: SCHEDULE_FLEXIBLE,
        },
      };
    });

    const TESTED_URL = ({ missionId }: { missionId: string }) => `${BASE_URL}/${missionId}/time-table`;

    describe('when update time table', () => {
      const MISSION_ID = TestUtils.genMongoId();

      beforeEach(async () => {
        await missionRepo.save(
          MissionFactory.create({
            id: MISSION_ID,
          }),
        );
      });

      it(`should update time table`, () => {
        return request(app.getHttpServer())
          .put(TESTED_URL({ missionId: MISSION_ID }))
          .send(body)
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(200)
          .expect((res: request.Response) => {
            expect(res.body.success).toBe(true);
            expect(res.body.data.id).toBe(MISSION_ID);
            expect(res.body.data.timeTable.beginAt).toBe(BEGIN_AT);
            expect(res.body.data.timeTable.endAt).toBe(END_AT);
            expect(res.body.data.timeTable.duration).toBe(DURATION);
            expect(res.body.data.timeTable.hourlyVolume.unit).toBe(HOURLY_VOLUME_UNIT);
            expect(res.body.data.timeTable.hourlyVolume.volume).toBe(HOURLY_VOLUME_VOLUME);
            expect(res.body.data.timeTable.hourlyVolume.flexible).toBe(HOURLY_VOLUME_FLEXIBLE);
            expect(res.body.data.timeTable.schedule.slots).toEqual([]);
            expect(res.body.data.timeTable.schedule.shifts).toEqual([]);
            expect(res.body.data.timeTable.schedule.flexible).toBe(SCHEDULE_FLEXIBLE);
          });
      });
    });

    describe('when mission does not exist', () => {
      it(`should return 404`, () => {
        return request(app.getHttpServer())
          .put(TESTED_URL({ missionId: TestUtils.genMongoId() }))
          .send(body)
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(404);
      });
    });
  });

  describe('/GET quizz', () => {
    const TESTED_URL = ({ missionId }: { missionId: string }) => `${BASE_URL}/${missionId}/quizz`;

    describe('if quizz exists', () => {
      const MISSION_ID = TestUtils.genMongoId();
      const QUESTION_IDS = [TestUtils.genMongoId(), TestUtils.genMongoId(), TestUtils.genMongoId()];

      beforeEach(async () => {
        await missionRepo.save(MissionFactory.create({ id: MISSION_ID }));
        await Promise.all(
          QUESTION_IDS.map((questionId: string, idx: number) =>
            questionRepo.save(
              QuestionFactory.create({
                id: questionId,
                tags: [`tag${idx}`],
              }),
            ),
          ),
        );
        await quizzRepo.save(
          QuizzFactory.create({
            mission: MISSION_ID,
            questions: QUESTION_IDS,
          }),
        );
      });

      it(`should return quizz`, () => {
        return request(app.getHttpServer())
          .get(TESTED_URL({ missionId: MISSION_ID }))
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(200)
          .expect((res: request.Response) => {
            expect(res.body.success).toBe(true);
            expect(res.body.data.quizz.mission).toBe(MISSION_ID);
            expect(res.body.data.quizz.questions).toEqual(QUESTION_IDS);
            expect(res.body.data.questions[0].tags).toEqual(['tag0']);
            expect(res.body.data.questions[1].tags).toEqual(['tag1']);
            expect(res.body.data.questions[2].tags).toEqual(['tag2']);
          });
      });
    });

    describe('if quizz does not exist', () => {
      const MISSION_ID = TestUtils.genMongoId();

      it(`should return 404`, () => {
        return request(app.getHttpServer())
          .get(TESTED_URL({ missionId: MISSION_ID }))
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(404);
      });
    });
  });

  describe('/POST create quizz', () => {
    const TESTED_URL = ({ missionId }: { missionId: string }) => `${BASE_URL}/${missionId}/quizz`;
    const MISSION_ID = '000000000000000000000000';

    beforeEach(async () => {
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID,
        }),
      );
    });

    describe('if user is authorized', () => {
      it(`should create quizz`, () => {
        return request(app.getHttpServer())
          .post(TESTED_URL({ missionId: MISSION_ID }))
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(201)
          .expect((res: request.Response) => {
            expect(res.body.success).toBe(true);
            expect(res.body.data.mission).toBe(MISSION_ID);
            expect(res.body.data.questions).toEqual([]);
          });
      });
    });
  });
});
