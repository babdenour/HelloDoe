import { MessageType } from '@business';
import { TestUtils } from '@mocks/test-utils';
import { Body, Controller, HttpStatus, INestApplication, Post, UsePipes } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { ValidationPipe } from '../../../pipes/validation.pipe';
import { UpdateQuestionParams } from './update-question.params';

const TEST_URL = '/test';

@UsePipes(ValidationPipe())
@Controller(TEST_URL)
class TestController {
  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public test(@Body() param: UpdateQuestionParams) {
    // nothing
  }
}

describe('UpdateQuestionParams E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`should pass`, () => {
    it(`when happy path`, () => {
      const updateQuestionsParams: UpdateQuestionParams = {
        id: TestUtils.genMongoId(),
        messages: [],
        tags: ['tag'],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(updateQuestionsParams).expect(HttpStatus.CREATED);
    });

    it(`when different types of messages and tags`, () => {
      const updateQuestionsParams: UpdateQuestionParams = {
        id: TestUtils.genMongoId(),
        messages: [
          {
            type: MessageType.IMAGE,
            url: 'https://google.com/image',
          },
          {
            type: MessageType.QUICK_REPLIES,
            text: 'text',
            choices: [
              {
                text: 'text',
                score: 5,
              },
              {
                text: 'text',
                score: 5,
              },
            ],
          },
          {
            type: MessageType.TEXT,
            text: 'text',
          },
        ],
        tags: ['tag0', 'tag1'],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(updateQuestionsParams).expect(HttpStatus.CREATED);
    });
  });

  describe(`should return 400`, () => {
    it(`when no id`, () => {
      const updateQuestionsParams: UpdateQuestionParams = {
        id: undefined,
        messages: [],
        tags: ['tag'],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(updateQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when id not mongo id`, () => {
      const updateQuestionsParams: UpdateQuestionParams = {
        id: 'not mongo id',
        messages: [],
        tags: ['tag'],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(updateQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when no tags`, () => {
      const updateQuestionsParams: UpdateQuestionParams = {
        id: TestUtils.genMongoId(),
        messages: [],
        tags: [],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(updateQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when quick replies message with insufficient choices`, () => {
      const updateQuestionsParams: UpdateQuestionParams = {
        id: TestUtils.genMongoId(),
        messages: [
          {
            type: MessageType.QUICK_REPLIES,
            text: 'text',
            choices: [
              {
                text: 'text',
                score: 5,
              },
            ],
          },
        ],
        tags: [],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(updateQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when quick replies message with no choices`, () => {
      const updateQuestionsParams: UpdateQuestionParams = {
        id: TestUtils.genMongoId(),
        messages: [
          {
            type: MessageType.QUICK_REPLIES,
            text: 'text',
            choices: [],
          },
        ],
        tags: [],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(updateQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when quick replies message with malformed choices`, () => {
      const updateQuestionsParams: UpdateQuestionParams = {
        id: TestUtils.genMongoId(),
        messages: [
          {
            type: MessageType.QUICK_REPLIES,
            text: 'text',
            choices: [
              {
                text: 'text',
              },
              {
                text: 'text',
                score: 5,
              },
            ],
          },
        ],
        tags: [],
      } as UpdateQuestionParams;

      return request(app.getHttpServer()).post(TEST_URL).send(updateQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when unsupported message type`, () => {
      const updateQuestionsParams: UpdateQuestionParams = ({
        id: TestUtils.genMongoId(),
        messages: [
          {
            type: 'unsupported',
            text: 'text',
          },
        ],
        tags: [],
      } as unknown) as UpdateQuestionParams;

      return request(app.getHttpServer()).post(TEST_URL).send(updateQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });
  });
});
