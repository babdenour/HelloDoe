import { MessageType, QuestionFactory, QuestionImplBusiness } from '@business';
import { DatabaseModule, QuestionRepository, RepositoryNames } from '@database';
import { I18nModule } from '@i18n';
import { TokenFactory } from '@mocks/auth';
import { cleanDatabase, getConnection } from '@mocks/database-utils';
import { TestUtils } from '@mocks/test-utils';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { ApiModule } from '../../api.module';
import { CreateQuestionParams } from './params/create-question.params';
import { UpdateQuestionParams } from './params/update-question.params';

const BASE_URL = '/api/v2/questions';

describe('QuestionsController E2E', () => {
  let app: INestApplication;
  let connection: Connection;
  let tokenFactory: TokenFactory;
  let questionRepo: QuestionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiModule, DatabaseModule, I18nModule],
    }).compile();

    connection = getConnection(module);
    tokenFactory = new TokenFactory(module);
    questionRepo = module.get<QuestionRepository>(RepositoryNames.QUESTION);

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/POST create question', () => {
    const TESTED_URL = `${BASE_URL}`;

    describe('if user is authorized', () => {
      const createQuestionParams: CreateQuestionParams = {
        messages: [
          {
            type: MessageType.QUICK_REPLIES,
            text: 'text',
            choices: [
              { text: 'choice1', score: 1 },
              { text: 'choice2', score: 2 },
            ],
          },
          {
            type: MessageType.TEXT,
            text: 'text',
          },
        ],
        tags: ['tag1', 'tag2'],
      };

      it(`should create question`, () => {
        return request(app.getHttpServer())
          .post(TESTED_URL)
          .send(createQuestionParams)
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(201)
          .expect((res: request.Response) => {
            expect(res.body.success).toBe(true);
            expect(res.body.data.messages).toEqual([
              {
                type: MessageType.QUICK_REPLIES,
                text: 'text',
                choices: [
                  { text: 'choice1', score: 1 },
                  { text: 'choice2', score: 2 },
                ],
              },
              {
                type: MessageType.TEXT,
                text: 'text',
              },
            ]);
            expect(res.body.data.tags).toEqual(['tag1', 'tag2']);
          });
      });
    });
  });

  describe('/PUT update question', () => {
    const TESTED_URL = `${BASE_URL}`;

    describe('if user is authorized', () => {
      describe('if question exists', () => {
        const QUESTION_ID = TestUtils.genMongoId();

        const updateQuestionParams: UpdateQuestionParams = {
          id: QUESTION_ID,
          messages: [
            {
              type: MessageType.QUICK_REPLIES,
              text: 'text',
              choices: [
                { text: 'choice1', score: 1 },
                { text: 'choice2', score: 2 },
              ],
            },
            {
              type: MessageType.TEXT,
              text: 'text',
            },
          ],
          tags: ['tag1', 'tag2'],
        };

        beforeEach(async () => {
          await questionRepo.save(
            QuestionFactory.create({
              id: QUESTION_ID,
            }),
          );
        });

        it(`should update question`, () => {
          return request(app.getHttpServer())
            .put(TESTED_URL)
            .send(updateQuestionParams)
            .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
            .expect(200)
            .expect((res: request.Response) => {
              expect(res.body.success).toBe(true);
              expect(res.body.data.id).toEqual(QUESTION_ID);
              expect(res.body.data.messages).toEqual([
                {
                  type: MessageType.QUICK_REPLIES,
                  text: 'text',
                  choices: [
                    { text: 'choice1', score: 1 },
                    { text: 'choice2', score: 2 },
                  ],
                },
                {
                  type: MessageType.TEXT,
                  text: 'text',
                },
              ]);
              expect(res.body.data.tags).toEqual(['tag1', 'tag2']);
            });
        });
      });

      describe('if question does not exist', () => {
        const QUESTION_ID = TestUtils.genMongoId();

        const updateQuestionParams: UpdateQuestionParams = {
          id: QUESTION_ID,
          messages: [],
          tags: ['tag'],
        };

        it(`should return 404`, () => {
          return request(app.getHttpServer()).put(TESTED_URL).send(updateQuestionParams).auth(tokenFactory.getAdminToken(), { type: 'bearer' }).expect(404);
        });
      });
    });
  });

  describe('/GET questions by tags', () => {
    const TESTED_URL = ({ tag }: { tag: string }) => `${BASE_URL}/tags/${tag}`;
    const TAG = 'tag';
    const QUESTION_ID_0 = TestUtils.genMongoId();
    const QUESTION_ID_1 = TestUtils.genMongoId();

    beforeEach(async () => {
      await questionRepo.save(
        QuestionFactory.create({
          id: QUESTION_ID_0,
          tags: [TAG, 'other tag'],
        }),
      );
      await questionRepo.save(
        QuestionFactory.create({
          id: QUESTION_ID_1,
          tags: [TAG],
        }),
      );
      await questionRepo.save(QuestionFactory.create());
    });

    describe('if user is authorized', () => {
      it(`should get questions by tags`, () => {
        return request(app.getHttpServer())
          .get(TESTED_URL({ tag: TAG }))
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(200)
          .expect((res: request.Response) => {
            expect(res.body.success).toBe(true);
            expect(res.body.data.questions[0].id).toBe(QUESTION_ID_0);
            expect(res.body.data.questions[1].id).toBe(QUESTION_ID_1);
            expect(res.body.data.page).toBe(1);
            expect(res.body.data.pageCount).toBe(1);
          });
      });
    });
  });

  describe('/GET all question tags', () => {
    const TESTED_URL = `${BASE_URL}/tags`;
    const QUESTION_TAGS = [['tag0', 'tag1'], ['tag1', 'tag2'], []];

    beforeEach(async () => {
      await Promise.all(QUESTION_TAGS.map((tags: string[]) => questionRepo.save(QuestionFactory.create({ tags }))));
    });

    describe('if user is authorized', () => {
      it(`should get all question tags`, () => {
        return request(app.getHttpServer())
          .get(TESTED_URL)
          .auth(tokenFactory.getAdminToken(), { type: 'bearer' })
          .expect(200)
          .expect((res: request.Response) => {
            expect(res.body.success).toBe(true);
            expect(res.body.data.tags).toEqual(['tag0', 'tag1', 'tag2']);
          });
      });
    });
  });
});
