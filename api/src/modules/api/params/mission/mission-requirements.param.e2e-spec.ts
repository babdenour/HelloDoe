import { Body, Controller, HttpStatus, INestApplication, Post, UsePipes } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { ValidationPipe } from '../../pipes/validation.pipe';
import { MissionRequirementsParam } from './mission-requirements.param';

const TEST_URL = '/test';

@UsePipes(ValidationPipe())
@Controller(TEST_URL)
class TestController {
  @Post()
  /* eslint-disable @typescript-eslint/no-unused-vars */
  public test(@Body() param: MissionRequirementsParam) {
    // nothing
  }
}

describe('MissionRequirementsParam E2E', () => {
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
    it(`when requirements specified`, () => {
      const requirementsParam: MissionRequirementsParam = {
        attributes: ['attribute'],
        skills: ['skill'],
        tools: ['tools'],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(requirementsParam).expect(HttpStatus.CREATED);
    });

    it(`when requirements empty`, () => {
      const requirementsParam: MissionRequirementsParam = {
        attributes: [],
        skills: [],
        tools: [],
      };

      return request(app.getHttpServer()).post(TEST_URL).send(requirementsParam).expect(HttpStatus.CREATED);
    });
  });
});
