import { AccessCardRepositoryBusiness, DoerFactory, DoerImplBsn, EntryPointFactory, EntryPointRepositoryBusiness, EntryPointTypeBusiness } from '@business';
import { DatabaseModule, DoerRepository, RepositoryNames } from '@database';
import { I18nModule } from '@i18n';
import { cleanDatabase, getConnection, mockMessagingPlatform, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { ChatbotModule } from '../chatbot.module';
import { ActionNames } from '../constants/action-names';
import { Action } from '../domains/action';
import { MessagingPlatform } from '../types/messaging-platform';
import { NewUserHandler } from './new-user.handler';

let connection: Connection;
let handler: NewUserHandler;
let accessCardRepo: AccessCardRepositoryBusiness;
let doerRepo: DoerRepository;
let entryPtRepo: EntryPointRepositoryBusiness;

let action: Action;
let mockPsid: string;

let messagingPlatform: MessagingPlatform;
let mockDoer: DoerImplBsn;
let mockEntryPoint: EntryPointTypeBusiness;
let mockGetDoer: jest.Mock;
let mockGetDoerPlatformId: jest.Mock;
let mockGetEntryPoint: jest.Mock;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ChatbotModule, DatabaseModule, I18nModule],
    providers: [NewUserHandler],
  }).compile();

  connection = getConnection(module);
  handler = module.get<NewUserHandler>(NewUserHandler);
  accessCardRepo = module.get<AccessCardRepositoryBusiness>(RepositoryNames.ACCESS_CARD);
  doerRepo = module.get<DoerRepository>(RepositoryNames.DOER);
  entryPtRepo = module.get<EntryPointRepositoryBusiness>(RepositoryNames.ENTRY_POINT);

  action = createAction();
  messagingPlatform = mockMessagingPlatform({
    getDoer: mockGetDoer,
    getDoerPlatformId: mockGetDoerPlatformId,
    getEntryPoint: mockGetEntryPoint,
  });
};

const createAction = (): Action => {
  return {
    name: ActionNames.CREATE_USER,
  } as Action;
};

describe('NewUserHandler', () => {
  beforeEach(async () => {
    mockPsid = '1';

    mockGetDoer = jest.fn().mockImplementation(() => mockDoer);
    mockGetDoerPlatformId = jest.fn().mockImplementation(() => mockPsid);
    mockGetEntryPoint = jest.fn().mockImplementation(() => mockEntryPoint);
    await createApp();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe(`when doer exists`, () => {
    const DOER_ID = TestUtils.genMongoId();

    beforeEach(async () => {
      mockDoer = await doerRepo.save(DoerFactory.create({ id: DOER_ID }));
      await createApp();
    });

    it(`should pass successfully`, async () => {
      await handler.handle(action, messagingPlatform);

      const doers = await doerRepo.findAll();
      expect(doers.length).toBe(1);
      expect(doers[0].id).toBe(DOER_ID);
    });
  });

  describe(`when doer doesn't exist`, () => {
    const ENTRY_PT_ID = TestUtils.genMongoId();

    beforeEach(async () => {
      mockDoer = null;
      mockEntryPoint = await entryPtRepo.save(EntryPointFactory.createFacebookEntryPoint({ id: ENTRY_PT_ID }));
      await createApp();
    });

    it(`should create doer`, async () => {
      await handler.handle(action, messagingPlatform);

      const doers = await doerRepo.findAll();
      expect(doers.length).toBe(1);
    });

    it(`should create access card`, async () => {
      await handler.handle(action, messagingPlatform);

      const [doer] = await doerRepo.findAll();
      const accessCards = await accessCardRepo.findAll();
      expect(accessCards.length).toBe(1);
      expect(accessCards[0].doer).toBe(doer.id);
      expect(accessCards[0].entryPoint).toBe(ENTRY_PT_ID);
      expect(accessCards[0].pageScopeId).toBe(mockPsid);
    });
  });
});
