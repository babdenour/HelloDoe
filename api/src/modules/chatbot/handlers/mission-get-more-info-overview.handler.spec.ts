import {
  BusinessError,
  BusinessErrorCode,
  ClientFactory,
  ContractType,
  MissionFactory,
  TimeTableFactory,
} from '@business';
import { MissionRepository, MissionRepositoryProviderFactory } from '@database';
import { I18nService, I18nServiceProviderFactory } from '@i18n';
import { mockButtonPostbackSvc, mockI18nSvc, mockMissionRepo, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';

import { Action } from '../domains/action';
import { ButtonPostbackService, ButtonPostbackServiceProviderFactory } from '../services/button-postback.service';
import { MissionGetMoreInfoOverviewHandler } from './mission-get-more-info-overview.handler';

let handler: MissionGetMoreInfoOverviewHandler;
let action: Action;

let mockedButtonPostbackSvc: Partial<ButtonPostbackService>;
let mockedI18nSvc: Partial<I18nService>;
let mockedMissionRepo: Partial<MissionRepository>;

const MISSION_ID = TestUtils.genMongoId();

const createAction = (): Action => {
  return ({
    getParameter: jest.fn().mockImplementation(() => MISSION_ID),
  } as unknown) as Action;
};

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ButtonPostbackServiceProviderFactory({
        useValue: mockedButtonPostbackSvc,
      }),
      I18nServiceProviderFactory({
        useValue: mockedI18nSvc,
      }),
      MissionRepositoryProviderFactory({
        useValue: mockedMissionRepo,
      }),
      MissionGetMoreInfoOverviewHandler,
    ],
  }).compile();

  action = createAction();

  handler = module.get<MissionGetMoreInfoOverviewHandler>(MissionGetMoreInfoOverviewHandler);
};

describe('MissionGetMoreInfoOverviewHandler', () => {
  beforeEach(async () => {
    mockedButtonPostbackSvc = mockButtonPostbackSvc();
    mockedI18nSvc = mockI18nSvc();
    mockedMissionRepo = mockMissionRepo();
    await createApp();
  });

  describe(`when create message flow`, () => {
    const MISSION = MissionFactory.create({
      timeTable: TimeTableFactory.create({
        duration: 1000,
      }),
    });
    const CLIENT = ClientFactory.create();

    it(`should create 3 messages`, async () => {
      const messages = await handler.createMessageFlow(MISSION, CLIENT);

      expect(messages.length).toBe(2);
    });
  });

  describe(`when create job overview text`, () => {
    const CATEGORY = 'ARGICULTURAL_EMPLOYEE';
    const MISSION = MissionFactory.create({
      category: CATEGORY,
    });
    const CLIENT = ClientFactory.create();

    it(`should translate right text`, async () => {
      const text = await handler.createJobOverviewText(MISSION, CLIENT);

      expect(text).toBe(
        `mission.category.text.${CATEGORY} mission.category.emoji.${CATEGORY}\nchatbot.mission.more-info.overview.job`,
      );
    });
  });

  describe(`when create contract overview text`, () => {
    const MISSION = MissionFactory.create({
      timeTable: TimeTableFactory.create({
        duration: 1000,
      }),
    });

    it(`should translate right text`, async () => {
      const text = await handler.createContractOverviewText(MISSION);

      expect(text).toBe('chatbot.mission.more-info.overview.contract');
    });
  });

  describe(`when create hourly volume defined overview text`, () => {
    const MISSION = MissionFactory.create();

    it(`should translate right text`, async () => {
      const text = await handler.createHourlyVolumeDefinedOverviewText(MISSION);

      expect(text).toBe('chatbot.mission.more-info.overview.hourly-volume.defined');
    });
  });

  describe(`when create hourly volume flexible overview text`, () => {
    it(`should translate right text`, async () => {
      const text = await handler.createHourlyVolumeFlexibleOverviewText();

      expect(text).toBe('chatbot.mission.more-info.overview.hourly-volume.flexible');
    });
  });

  describe(`when create address text`, () => {
    const MISSION = MissionFactory.create();

    it(`should translate right text`, async () => {
      const text = await handler.createAddressText(MISSION);

      expect(text).toBe('chatbot.mission.more-info.mission-address');
    });
  });

  describe(`when create pay per hour text`, () => {
    const MISSION = MissionFactory.create({
      contractType: ContractType.CDD,
      timeTable: TimeTableFactory.create({ duration: 1000 }),
    });

    it(`should translate right text`, async () => {
      const text = await handler.createPayPerHourText(MISSION);

      expect(text).toBe('chatbot.mission.more-info.pay.per-pay-unit\nchatbot.mission.more-info.pay.recap-total');
    });
  });

  describe(`when create pay per mission text`, () => {
    const MISSION = MissionFactory.create({
      contractType: ContractType.CDD,
      timeTable: TimeTableFactory.create({ duration: 1000 }),
    });

    it(`should translate right text`, async () => {
      const text = await handler.createPayPerMissionText(MISSION);

      expect(text).toBe('chatbot.mission.more-info.pay.per-pay-unit\nchatbot.mission.more-info.pay.recap-total');
    });
  });

  describe(`when create pay per hour or mission text`, () => {
    const MISSION = MissionFactory.create();

    it(`should translate right text`, async () => {
      const text = await handler.createPayPerHourOrMissionText(MISSION);

      expect(text).toBe('chatbot.mission.more-info.pay.per-pay-unit');
    });
  });

  describe(`when create quick replies choices`, () => {
    const MISSION = MissionFactory.create();

    it(`should translate right text`, async () => {
      const replies = await handler.createQuickRepliesChoices(MISSION);

      expect(replies[0].text).toBe('chatbot.actions.apply');
      expect(replies[1].text).toBe('chatbot.actions.more-info');
      expect(replies[2].text).toBe('chatbot.actions.other-missions');
    });

    it(`should create right number of choices`, async () => {
      const replies = await handler.createQuickRepliesChoices(MISSION);

      expect(replies.length).toBe(3);
    });
  });

  describe(`when mission not found`, () => {
    beforeEach(async () => {
      mockedMissionRepo.findByIdWithClient = jest.fn().mockResolvedValue(null);
      await createApp();
    });

    it(`should throw business error H00007`, async () => {
      expect.assertions(2);

      try {
        await handler.handle(action);
      } catch (ex) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00007_MISSION_NOT_FOUND);
          expect(ex.message).toContain(MISSION_ID);
        }
      }
    });
  });
});
