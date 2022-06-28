import { BusinessError, BusinessErrorCode, ClientFactory, MissionFactory, MissionTask } from '@business';
import { MissionRepository, MissionRepositoryProviderFactory } from '@database';
import { I18nService, I18nServiceProviderFactory } from '@i18n';
import { mockButtonPostbackSvc, mockI18nSvc, mockMissionRepo, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';

import { Action } from '../domains/action';
import { ButtonPostbackService, ButtonPostbackServiceProviderFactory } from '../services/button-postback.service';
import { MissionGetMoreInfoTasksHandler } from './mission-get-more-info-tasks.handler';

let handler: MissionGetMoreInfoTasksHandler;
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
      MissionGetMoreInfoTasksHandler,
    ],
  }).compile();

  action = createAction();

  handler = module.get<MissionGetMoreInfoTasksHandler>(MissionGetMoreInfoTasksHandler);
};

describe('MissionGetMoreInfoTasksHandler', () => {
  beforeEach(async () => {
    mockedButtonPostbackSvc = mockButtonPostbackSvc();
    mockedI18nSvc = mockI18nSvc();
    mockedMissionRepo = mockMissionRepo();
    await createApp();
  });

  describe(`when create message flow`, () => {
    const MISSION = MissionFactory.create();
    const CLIENT = ClientFactory.create();

    it(`should create 3 messages`, async () => {
      const messages = await handler.createMessageFlow(MISSION, CLIENT);

      expect(messages.length).toBe(1);
    });
  });

  describe(`when create task message`, () => {
    const TASK = MissionTask.CATERING_SERVICE;
    const MISSION = MissionFactory.create({
      tasks: [TASK],
    });
    const CLIENT = ClientFactory.create();

    it(`should translate right text`, async () => {
      const message = await handler.createTasksMessage(MISSION, CLIENT);

      expect(message.text).toBe(`chatbot.mission.tasks.intro\nmission.task.text.${TASK}`);
    });
  });

  describe(`when create quick replies choices`, () => {
    const MISSION = MissionFactory.create();

    it(`should translate right text`, async () => {
      const replies = await handler.createQuickRepliesChoices(MISSION);

      expect(replies[0].text).toBe('chatbot.actions.apply');
      expect(replies[1].text).toBe('chatbot.actions.other-missions');
    });

    it(`should create right number of choices`, async () => {
      const replies = await handler.createQuickRepliesChoices(MISSION);

      expect(replies.length).toBe(2);
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
