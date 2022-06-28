import { MissionFactory, QuestionFactory, QuizzFactory } from '@business';
import { DatabaseModule, MissionRepository, QuestionRepository, QuizzRepository, RepositoryNames } from '@database';
import { I18nModule } from '@i18n';
import { TokenFactory } from '@mocks/auth';
import { cleanDatabase, getConnection } from '@mocks/database-utils';
import { TestUtils } from '@mocks/test-utils';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { ApiModule } from '../../api.module';
import { CreateQuizzParams } from './params/create-quizz.params';
import { UpdateQuizzParams } from './params/update-quizz.params';

const BASE_URL = '/api/v2/quizzes';

describe('QuizzesController E2E', () => {
  let app: INestApplication;
  let connection: Connection;
  let tokenFactory: TokenFactory;
  let missionRepo: MissionRepository;
  let questionRepo: QuestionRepository;
  let quizzRepo: QuizzRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiModule, DatabaseModule, I18nModule],
    }).compile();

    connection = getConnection(module);
    tokenFactory = new TokenFactory(module);
    missionRepo = module.get<MissionRepository>(RepositoryNames.MISSION);
    questionRepo = module.get<QuestionRepository>(RepositoryNames.QUESTION);
    quizzRepo = module.get<QuizzRepository>(RepositoryNames.QUIZZ);

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/POST create quizz', () => {
    const TESTED_URL = `${BASE_URL}`;
    const MISSION_ID = '111111111111111111111111';

    beforeEach(async () => {
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID,
        }),
      );
    });

    describe('if user is authorized', () => {
      const createQuizzParams: CreateQuizzParams = {
        missionId: MISSION_ID,
      };

      it(`should create quizz`, () => {
        return request(app.getHttpServer())
          .post(TESTED_URL)
          .send(createQuizzParams)
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

  describe('/PUT update quizz', () => {
    const TESTED_URL = ({ quizzId }: { quizzId: string }) => `${BASE_URL}/${quizzId}`;
    const QUIZZ_ID = TestUtils.genMongoId();
    const MISSION_ID = TestUtils.genMongoId();
    const QUESTION_0_ID = TestUtils.genMongoId();
    const QUESTION_1_ID = TestUtils.genMongoId();
    const QUESTION_IDS = [QUESTION_0_ID, QUESTION_1_ID];

    beforeEach(async () => {
      const creatingQuestions: Promise<any>[] = QUESTION_IDS.map((questionId: string) =>
        questionRepo.save(
          QuestionFactory.create({
            id: questionId,
          }),
        ),
      );
      await Promise.all([
        quizzRepo.save(
          QuizzFactory.create({
            id: QUIZZ_ID,
            questions: QUESTION_IDS,
          }),
        ),
        missionRepo.save(
          MissionFactory.create({
            id: MISSION_ID,
          }),
        ),
        ...creatingQuestions,
      ]);
    });

    describe('if user is authorized', () => {
      const updateQuizzParams: UpdateQuizzParams = {
        id: QUIZZ_ID,
        mission: MISSION_ID,
        questions: QUESTION_IDS,
      };

      it(`should update quizz`, () => {
        return request(app.getHttpServer())
          .put(TESTED_URL({ quizzId: QUIZZ_ID }))
          .send(updateQuizzParams)
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(200)
          .expect((res: request.Response) => {
            expect(res.body.success).toBe(true);
            expect(res.body.data.quizz.id).toBe(QUIZZ_ID);
            expect(res.body.data.quizz.mission).toBe(MISSION_ID);
            expect(res.body.data.quizz.questions).toEqual(QUESTION_IDS);
            expect(res.body.data.questions[0].id).toEqual(QUESTION_0_ID);
            expect(res.body.data.questions[1].id).toEqual(QUESTION_1_ID);
          });
      });
    });

    describe('if quizz ids dont match', () => {
      const WRONG_QUIZZ_ID = TestUtils.genMongoId();

      const updateQuizzParams: UpdateQuizzParams = {
        id: QUIZZ_ID,
        mission: MISSION_ID,
        questions: QUESTION_IDS,
      };

      it(`should return bad request`, () => {
        return request(app.getHttpServer())
          .put(TESTED_URL({ quizzId: WRONG_QUIZZ_ID }))
          .send(updateQuizzParams)
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(400);
      });
    });
  });
});
