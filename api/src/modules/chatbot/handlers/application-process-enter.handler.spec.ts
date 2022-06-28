import { BusinessError, BusinessErrorCode, MissionFactory, QuickRepliesMessageBusiness, TextMessageBusiness } from '@business';
import { MissionRepository, MissionRepositoryProviderFactory } from '@database';
import { I18nService, I18nServiceProviderFactory } from '@i18n';
import { ActionTestImpl, mockI18nSvc, mockMissionRepo } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';

import { Action } from '../domains/action';
import { ApplicationProcessEnterHandler } from './application-process-enter.handler';

const MISSION_CATEGORY = 'BABY_SITTING';
const MISSION_CODE = 'GO-001';

let handler: ApplicationProcessEnterHandler;
let action: Action;

let mockedI18nSvc: Partial<I18nService>;
let mockedMissionCode: string;
let mockedMissionRepo: Partial<MissionRepository>;

const createAction = (): Action => {
  return (new ActionTestImpl({ missionCode: mockedMissionCode }) as unknown) as Action;
};

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      I18nServiceProviderFactory({
        useValue: mockedI18nSvc,
      }),
      MissionRepositoryProviderFactory({
        useValue: mockedMissionRepo,
      }),
      ApplicationProcessEnterHandler,
    ],
  }).compile();

  handler = module.get<ApplicationProcessEnterHandler>(ApplicationProcessEnterHandler);

  action = createAction();
};

describe('ApplicationProcessEnterHandler', () => {
  beforeEach(async () => {
    mockedI18nSvc = mockI18nSvc();
    mockedMissionCode = MISSION_CODE;
    mockedMissionRepo = mockMissionRepo({
      findByCode: jest.fn().mockResolvedValue(
        MissionFactory.create({
          category: MISSION_CATEGORY,
          code: MISSION_CODE,
        }),
      ),
    });
    await createApp();
  });

  describe(`when enter application process`, () => {
    it(`should create messages`, async () => {
      await handler.handle(action);

      expect(action.messages.length).toBe(2);
      expect((action.messages[0] as TextMessageBusiness).text).toBe(`chatbot.flow.application-process.enter.catch-phrase.${MISSION_CATEGORY}`);
      expect((action.messages[1] as QuickRepliesMessageBusiness).text).toBe('chatbot.flow.application-process.enter.quick-replies.text');
      expect((action.messages[1] as QuickRepliesMessageBusiness).choices[0].text).toBe('chatbot.flow.application-process.enter.quick-replies.choices.0');
      expect((action.messages[1] as QuickRepliesMessageBusiness).choices[1].text).toBe('chatbot.flow.application-process.enter.quick-replies.choices.1');
    });
  });

  describe(`when no mission code param`, () => {
    beforeEach(async () => {
      mockedMissionCode = undefined;
      await createApp();
    });

    it(`should throw business error H01000`, async () => {
      expect.assertions(2);

      try {
        await handler.handle(action);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H01000_MISSING_PARAM);
          expect(ex.message).toContain('missionCode');
        }
      }
    });
  });

  describe(`when no mission found`, () => {
    beforeEach(async () => {
      mockedMissionRepo.findByCode = jest.fn().mockResolvedValue(null);
      await createApp();
    });

    it(`should throw business error H01002`, async () => {
      expect.assertions(2);

      try {
        await handler.handle(action);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H01002_MISSION_NOT_FOUND_BY_CODE);
          expect(ex.message).toContain(MISSION_CODE);
        }
      }
    });
  });
});
