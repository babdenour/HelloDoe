import {
  AgencyFactory,
  AgencyRepositoryBusiness,
  BusinessError,
  BusinessErrorCode,
  BusinessModule,
  ButtonPostbackImplBusiness,
  CarouselMessageImplBusiness,
  DoerFactory,
  DoerImplBsn,
  EntryPointFactory,
  FacebookEntryPointImplBusiness,
  JobBoardFactory,
  JobBoardRepositoryBusiness,
  MissionFactory,
  MissionStatus,
  QuestionMessageBusiness,
  QuizzFactory,
} from '@business';
import { ButtonType } from '@business/constants/message-type';
import { ServiceNames } from '@chatbot/constants/service-names';
import { ButtonPostbackService, ButtonPostbackServiceProviderFactory } from '@chatbot/services/button-postback.service';
import { ConfigModule } from '@config';
import { DoerRepository, MissionRepository, QuizzRepository, RepositoryNames } from '@database';
import { I18nModule } from '@i18n';
import { cleanDatabase, getConnection, mockMessagingPlatform, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { ChatbotModule } from '../chatbot.module';
import { Action } from '../domains/action';
import { MessagingPlatform } from '../types/messaging-platform';
import { MissionGetListHandler } from './mission-get-list.handler';

let connection: Connection;
let handler: MissionGetListHandler;
let agencyRepo: AgencyRepositoryBusiness;
let doerRepo: DoerRepository;
let jobBoardRepo: JobBoardRepositoryBusiness;
let missionRepo: MissionRepository;
let quizzRepo: QuizzRepository;
let postbkSvc: ButtonPostbackService;

let action: Action;
let mockPsid: string;
let mockMessages: QuestionMessageBusiness[];

let messagingPlatform: MessagingPlatform;
let mockDoer: DoerImplBsn;
let mockEntryPoint: FacebookEntryPointImplBusiness;

const AGENCY_1_ID = TestUtils.genMongoId();
const AGENCY_2_ID = TestUtils.genMongoId();
const JOB_BOARD_ID = TestUtils.genMongoId();

// TODO: mock dependencies instead of connecting to test database
const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [BusinessModule, ChatbotModule, ConfigModule, I18nModule],
    providers: [ButtonPostbackServiceProviderFactory(), MissionGetListHandler],
    exports: [MissionGetListHandler],
  }).compile();

  connection = getConnection(module);
  handler = module.get<MissionGetListHandler>(MissionGetListHandler);
  agencyRepo = module.get<AgencyRepositoryBusiness>(RepositoryNames.AGENCY);
  doerRepo = module.get<DoerRepository>(RepositoryNames.DOER);
  jobBoardRepo = module.get<JobBoardRepositoryBusiness>(RepositoryNames.JOB_BOARD);
  missionRepo = module.get<MissionRepository>(RepositoryNames.MISSION);
  quizzRepo = module.get<QuizzRepository>(RepositoryNames.QUIZZ);
  postbkSvc = module.get<ButtonPostbackService>(ServiceNames.BUTTON_POSTBACK_SERVICE);

  action = createAction();
  messagingPlatform = mockMessagingPlatform({
    getDoer: jest.fn().mockImplementation(() => mockDoer),
    getDoerPlatformId: jest.fn().mockImplementation(() => mockPsid),
    getEntryPoint: jest.fn().mockImplementation(() => mockEntryPoint),
  });

  await Promise.all([
    agencyRepo.save(
      AgencyFactory.create({
        id: AGENCY_1_ID,
        name: 'Agency 1',
      }),
    ),
    agencyRepo.save(
      AgencyFactory.create({
        id: AGENCY_2_ID,
        name: 'Agency 2',
      }),
    ),
    jobBoardRepo.save(
      JobBoardFactory.create({
        id: JOB_BOARD_ID,
        missionSources: [AGENCY_1_ID],
      }),
    ),
  ]);
};

const createAction = (): Action => {
  return ({
    messages: mockMessages,
  } as unknown) as Action;
};

describe('MissionGetListHandler', () => {
  beforeEach(async () => {
    mockPsid = '1';
    mockMessages = [];

    mockEntryPoint = EntryPointFactory.createFacebookEntryPoint({
      jobBoard: JOB_BOARD_ID,
    });

    await createApp();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe(`when some missions not seen`, () => {
    const DOER_ID = TestUtils.genMongoId();

    beforeEach(async () => {
      mockDoer = await doerRepo.save(
        DoerFactory.create({
          id: DOER_ID,
        }),
      );
      await Promise.all([
        await missionRepo.save(
          MissionFactory.create({
            code: '1',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
            description: 'mission agency 1',
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '2',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
            seenBy: [DOER_ID],
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '3',
            agency: AGENCY_1_ID,
            status: MissionStatus.ON_GOING,
            seenBy: [],
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '4',
            agency: AGENCY_2_ID,
            status: MissionStatus.BEING_PREPARED,
            description: 'mission agency 2',
          }),
        ),
      ]);
      await createApp();
    });

    it(`should return missions`, async () => {
      await handler.handle(action, messagingPlatform);

      expect(action.messages.length).toBe(1);
      expect(action.messages[0] instanceof CarouselMessageImplBusiness).toBe(true);
      expect((action.messages[0] as CarouselMessageImplBusiness).cards.length).toBe(1);
    });

    it(`should only return missions with the right agency`, async () => {
      await handler.handle(action, messagingPlatform);

      expect((action.messages[0] as CarouselMessageImplBusiness).cards.length).toBe(1);
    });
  });

  describe(`if mission has quizz`, () => {
    const MISSION_ID = TestUtils.genMongoId();
    const MISSION_CODE = 'code';
    const DOER_ID = TestUtils.genMongoId();

    beforeEach(async () => {
      mockDoer = await doerRepo.save(
        DoerFactory.create({
          id: DOER_ID,
        }),
      );
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID,
          agency: AGENCY_1_ID,
          code: MISSION_CODE,
          status: MissionStatus.BEING_PREPARED,
        }),
      );
      await quizzRepo.save(
        QuizzFactory.create({
          mission: MISSION_ID,
        }),
      );
      await createApp();
    });

    it(`should show button to enter application process and get more info`, async () => {
      await handler.handle(action, messagingPlatform);

      const buttons = (action.messages[0] as CarouselMessageImplBusiness).cards[0].buttons as ButtonPostbackImplBusiness[];
      expect(buttons[0].type).toBe(ButtonType.POSTBACK);
      expect(buttons[0].title).toBe(`Postuler`);
      expect(buttons[0].payload).toBe(postbkSvc.buildEnterApplicationProcessPostback(MISSION_CODE));
      expect(buttons[1].type).toBe(ButtonType.POSTBACK);
      expect(buttons[1].title).toBe(`En savoir +`);
      expect(buttons[1].payload).toBe(postbkSvc.buildGetMoreInfoAboutMissionPostback(MISSION_ID));
    });
  });

  describe(`when too much missions not seen`, () => {
    beforeEach(async () => {
      mockDoer = await doerRepo.save(DoerFactory.create());
      await Promise.all([
        await missionRepo.save(
          MissionFactory.create({
            code: '1',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '2',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '3',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '4',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '5',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '6',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
          }),
        ),
      ]);
      await createApp();
    });

    it(`should limit number of missions displayed`, async () => {
      await handler.handle(action, messagingPlatform);

      expect((action.messages[0] as CarouselMessageImplBusiness).cards.length).toBe(4);
    });
  });

  describe(`when all missions seen`, () => {
    const DOER_ID = TestUtils.genMongoId();

    beforeEach(async () => {
      mockDoer = await doerRepo.save(
        DoerFactory.create({
          id: DOER_ID,
        }),
      );
      await Promise.all([
        await missionRepo.save(
          MissionFactory.create({
            code: '1',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
            seenBy: [DOER_ID],
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '2',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
            seenBy: [DOER_ID],
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '3',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
            seenBy: [DOER_ID],
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '4',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
            seenBy: [DOER_ID],
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '5',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
            seenBy: [DOER_ID],
          }),
        ),
        await missionRepo.save(
          MissionFactory.create({
            code: '6',
            agency: AGENCY_1_ID,
            status: MissionStatus.BEING_PREPARED,
            seenBy: [DOER_ID],
          }),
        ),
      ]);
      await createApp();
    });

    it(`should display missions once again`, async () => {
      await handler.handle(action, messagingPlatform);

      expect((action.messages[0] as CarouselMessageImplBusiness).cards.length).toBe(4);
    });
  });

  describe(`when doer not found`, () => {
    beforeEach(async () => {
      mockDoer = null;
      await createApp();
    });

    it(`should throw BusinessError H01001`, async () => {
      expect.assertions(1);

      try {
        await handler.handle(action, messagingPlatform);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H01001_DOER_NOT_FOUND);
        }
      }
    });
  });
});
