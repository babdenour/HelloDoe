import {
  BusinessError,
  BusinessErrorCode,
  DoerFactory,
  MissionFactory,
  QuizzFactory,
  QuizzService,
  QuizzServiceProviderFactory,
} from '@business';
import {
  MissionRepository,
  MissionRepositoryProviderFactory,
  QuizzRepository,
  QuizzRepositoryProviderFactory,
} from '@database';
import { mockMessagingPlatform, mockMissionRepo, mockQuizzRepo, mockQuizzSvc } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';

import { FollowupEvents } from '../constants/followup-events';
import { Action } from '../domains/action';
import { MessagingPlatform } from '../types/messaging-platform';
import { QuizzEnterHandler } from './quizz-enter.handler';

const MISSION_CODE = 'HD_TEST';

let handler: QuizzEnterHandler;

let action: Action;
let messagingPlatform: MessagingPlatform;

let mockMissionCode: string;
let mockSetContextParameter = jest.fn();

let mockedMissionRepo: Partial<MissionRepository>;
let mockedQuizzRepo: Partial<QuizzRepository>;
let mockedQuizzSvc: Partial<QuizzService>;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      MissionRepositoryProviderFactory({ useValue: mockedMissionRepo }),
      QuizzRepositoryProviderFactory({ useValue: mockedQuizzRepo }),
      QuizzServiceProviderFactory({ useValue: mockedQuizzSvc }),
      QuizzEnterHandler,
    ],
  }).compile();

  handler = module.get<QuizzEnterHandler>(QuizzEnterHandler);

  action = createAction();
  messagingPlatform = mockMessagingPlatform({
    getDoer: jest.fn().mockResolvedValue(DoerFactory.create()),
  });
};

const createAction = (): Action => {
  return ({
    getParameter: () => mockMissionCode,
    setContextParameter: mockSetContextParameter,
  } as unknown) as Action;
};

describe('QuizzEnterHandler', () => {
  beforeEach(async () => {
    mockMissionCode = MISSION_CODE;
    mockSetContextParameter = jest.fn();

    mockedMissionRepo = mockMissionRepo({
      findByCode: jest.fn().mockResolvedValue(MissionFactory.create()),
    });
    mockedQuizzRepo = mockQuizzRepo({
      findByMissionId: jest.fn().mockResolvedValue(QuizzFactory.create()),
    });
    mockedQuizzSvc = mockQuizzSvc({
      hasDoerFinishedQuizz: jest.fn().mockResolvedValue(false),
    });
    await createApp();
  });

  describe(`when start quizz for first time`, () => {
    it(`should redirect to quizz`, async () => {
      await handler.handle(action, messagingPlatform);

      expect(action.followupEvent).toEqual(FollowupEvents.QUIZZ_ONBOARDING);
    });
  });

  describe(`when has already applied`, () => {
    beforeEach(async () => {
      mockedQuizzSvc.hasDoerFinishedQuizz = jest.fn().mockResolvedValue(true);
      await createApp();
    });

    it(`should redirect to outro already applied`, async () => {
      await handler.handle(action, messagingPlatform);

      expect(action.followupEvent).toEqual(FollowupEvents.QUIZZ_OUTRO_ALREADY_APPLIED);
    });
  });

  describe(`when missing mission code`, () => {
    beforeEach(async () => {
      mockMissionCode = undefined;
      await createApp();
    });

    it(`should throw BusinessError H01000`, async () => {
      expect.assertions(2);

      try {
        await handler.handle(action, messagingPlatform);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H01000_MISSING_PARAM);
          expect(ex.message).toContain('missionCode');
        }
      }
    });
  });

  describe(`when mission not found by code`, () => {
    beforeEach(async () => {
      mockedMissionRepo.findByCode = jest.fn().mockResolvedValue(null);
      await createApp();
    });

    it(`should throw BusinessError H01002`, async () => {
      expect.assertions(1);

      try {
        await handler.handle(action, messagingPlatform);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H01002_MISSION_NOT_FOUND_BY_CODE);
        }
      }
    });
  });
});
