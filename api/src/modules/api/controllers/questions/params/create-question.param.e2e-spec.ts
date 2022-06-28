import { MessageType } from '@business';
import { Body, Controller, HttpStatus, INestApplication, Post, UsePipes } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateQuestionParams } from './create-question.params';

const TEST_URL = '/test';

@UsePipes(ValidationPipe())
@Controller(TEST_URL)
class TestController {
  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public test(@Body() param: CreateQuestionParams) {
    // nothing
  }
}

describe('CreateQuestionParams E2E', () => {
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
    it(`when no messages and one tag`, () => {
      const createQuestionsParams: CreateQuestionParams = {
        messages: [],
        tags: ['tag'],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(createQuestionsParams).expect(HttpStatus.CREATED);
    });

    it(`when different types of messages and tags`, () => {
      const createQuestionsParams: CreateQuestionParams = {
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

      return request(app.getHttpServer()).post(TEST_URL).send(createQuestionsParams).expect(HttpStatus.CREATED);
    });
  });

  describe(`should return 400`, () => {
    it(`when no tags`, () => {
      const createQuestionsParams: CreateQuestionParams = {
        messages: [],
        tags: [],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(createQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when quick replies message with insufficient choices`, () => {
      const createQuestionsParams: CreateQuestionParams = {
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

      return request(app.getHttpServer()).post(TEST_URL).send(createQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when quick replies message with no choices`, () => {
      const createQuestionsParams: CreateQuestionParams = {
        messages: [
          {
            type: MessageType.QUICK_REPLIES,
            text: 'text',
            choices: [],
          },
        ],
        tags: [],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(createQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when quick replies message with malformed choices`, () => {
      const createQuestionsParams: CreateQuestionParams = {
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
      } as CreateQuestionParams;

      return request(app.getHttpServer()).post(TEST_URL).send(createQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when unsupported message type`, () => {
      const createQuestionsParams: CreateQuestionParams = ({
        messages: [
          {
            type: 'unsupported',
            text: 'text',
          },
        ],
        tags: [],
      } as unknown) as CreateQuestionParams;

      return request(app.getHttpServer()).post(TEST_URL).send(createQuestionsParams).expect(HttpStatus.BAD_REQUEST);
    });
  });
});
