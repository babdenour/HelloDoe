import { TimeTableHourlyVolumeUnit } from '@business';
import { TestUtils } from '@mocks';
import { Body, Controller, HttpStatus, INestApplication, Post, UsePipes } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { ValidationPipe } from '../pipes/validation.pipe';
import { TimeTableParam } from './time-table.param';

const TEST_URL = '/test';

@UsePipes(ValidationPipe())
@Controller(TEST_URL)
class TestController {
  @Post()
  /* eslint-disable @typescript-eslint/no-unused-vars */
  public test(@Body() param: TimeTableParam) {
    // nothing
  }
}

describe('TimeTableParam E2E', () => {
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
    it(`when time table flexible`, () => {
      const timeTableParam: TimeTableParam = {
        beginAt: undefined,
        endAt: undefined,
        duration: 1000,
        hourlyVolume: {
          unit: TimeTableHourlyVolumeUnit.DAY,
          volume: 0,
          flexible: true,
        },
        schedule: {
          slots: [],
          shifts: [],
          flexible: true,
        },
      };

      return request(app.getHttpServer()).post(TEST_URL).send(timeTableParam).expect(HttpStatus.CREATED);
    });

    it(`when time table not flexible`, () => {
      const timeTableParam: TimeTableParam = {
        beginAt: 0,
        endAt: 0,
        duration: 1000,
        hourlyVolume: {
          unit: TimeTableHourlyVolumeUnit.DAY,
          volume: 10,
          flexible: false,
        },
        schedule: {
          slots: [
            {
              id: TestUtils.genMongoId(),
              beginTime: 10,
              endTime: 10,
              flexible: false,
            },
          ],
          shifts: [
            {
              date: 10,
              slots: [TestUtils.genMongoId()],
            },
          ],
          flexible: false,
        },
      };

      return request(app.getHttpServer()).post(TEST_URL).send(timeTableParam).expect(HttpStatus.CREATED);
    });
  });

  describe(`should return 400`, () => {
    it(`when missing hourly volume`, () => {
      const timeTableParam: TimeTableParam = {
        beginAt: 0,
        endAt: 0,
        duration: 1000,
        hourlyVolume: {},
        schedule: {
          slots: [
            {
              beginTime: 10,
              endTime: 10,
              flexible: false,
            },
          ],
          shifts: [
            {
              date: 10,
              slots: [TestUtils.genMongoId()],
            },
          ],
          flexible: false,
        },
      } as TimeTableParam;

      return request(app.getHttpServer()).post(TEST_URL).send(timeTableParam).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when missing schedule`, () => {
      const timeTableParam: TimeTableParam = {
        beginAt: 0,
        endAt: 0,
        duration: 1000,
        hourlyVolume: {
          unit: TimeTableHourlyVolumeUnit.DAY,
          volume: 10,
          flexible: false,
        },
        schedule: {},
      } as TimeTableParam;

      return request(app.getHttpServer()).post(TEST_URL).send(timeTableParam).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when partial slot`, () => {
      const timeTableParam: TimeTableParam = {
        beginAt: 0,
        endAt: 0,
        duration: 1000,
        hourlyVolume: {
          unit: TimeTableHourlyVolumeUnit.DAY,
          volume: 10,
          flexible: false,
        },
        schedule: {
          slots: [
            {
              beginTime: 10,
              flexible: false,
            },
          ],
          shifts: [
            {
              date: 10,
              slots: [TestUtils.genMongoId()],
            },
          ],
          flexible: false,
        },
      } as TimeTableParam;

      return request(app.getHttpServer()).post(TEST_URL).send(timeTableParam).expect(HttpStatus.BAD_REQUEST);
    });

    it(`when partial shift`, () => {
      const timeTableParam: TimeTableParam = {
        beginAt: 0,
        endAt: 0,
        duration: 1000,
        hourlyVolume: {
          unit: TimeTableHourlyVolumeUnit.DAY,
          volume: 10,
          flexible: false,
        },
        schedule: {
          slots: [
            {
              beginTime: 10,
              endTime: 10,
              flexible: false,
            },
          ],
          shifts: [
            {
              slots: [TestUtils.genMongoId()],
            },
          ],
          flexible: false,
        },
      } as TimeTableParam;

      return request(app.getHttpServer()).post(TEST_URL).send(timeTableParam).expect(HttpStatus.BAD_REQUEST);
    });
  });
});
