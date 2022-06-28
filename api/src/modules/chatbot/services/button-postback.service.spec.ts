import { Test, TestingModule } from '@nestjs/testing';

import { ButtonPostbackService } from './button-postback.service';

describe('ButtonPostbackService', () => {
  let postbckSvc: ButtonPostbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ButtonPostbackService],
      exports: [ButtonPostbackService],
    }).compile();

    postbckSvc = module.get<ButtonPostbackService>(ButtonPostbackService);
  });

  it(`should build enter application process postback`, () => {
    const MISSION_CODE: string = 'MISSION_CODE';

    expect(postbckSvc.buildEnterApplicationProcessPostback(MISSION_CODE)).toBe(`application-process-enter-${MISSION_CODE}`);
  });

  it(`should build get next missions postback`, () => {
    expect(postbckSvc.buildGetNextMissionsPostback()).toBe(`missions/get`);
  });

  it(`should build quizz enter postback`, () => {
    const MISSION_CODE: string = 'MISSION_CODE';

    expect(postbckSvc.buildQuizzEnterPostback(MISSION_CODE)).toBe(`quizz-enter-${MISSION_CODE}`);
  });

  it(`should build get more info about mission postback`, () => {
    const MISSION_ID: string = 'MISSION_ID';

    expect(postbckSvc.buildGetMoreInfoAboutMissionPostback(MISSION_ID)).toBe(`missions/id/${MISSION_ID}/more-info/get`);
  });

  it(`should build get more info about mission tasks postback`, () => {
    const MISSION_ID: string = 'MISSION_ID';

    expect(postbckSvc.buildGetMoreInfoAboutMissionTasksPostback(MISSION_ID)).toBe(`missions/id/${MISSION_ID}/more-info/tasks/get`);
  });
});
