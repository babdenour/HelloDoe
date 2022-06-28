import { BusinessError, BusinessErrorCode, DoerFactory, DoerImplBsn } from '@business';
import { DoerRepository, RepositoryNames } from '@database';
import { I18nModule } from '@i18n';
import { cleanDatabase, getConnection, mockMessagingPlatform, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { ChatbotModule } from '../chatbot.module';
import { ActionNames } from '../constants/action-names';
import { Action } from '../domains/action';
import { MessagingPlatform } from '../types/messaging-platform';
import { ProfileUpdateHandler } from './profile-update.handler';

let connection: Connection;
let doerRepo: DoerRepository;
let handler: ProfileUpdateHandler;
let action: Action;
let messagingPlatform: MessagingPlatform;

let mockPsid: string;
let mockParamAttribute: string;
let mockParamValue: string;

let mockDoer: DoerImplBsn;
let mockGetDoer: jest.Mock;
let mockGetDoerPlatformId: jest.Mock;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ChatbotModule, I18nModule],
    providers: [ProfileUpdateHandler],
  }).compile();

  connection = getConnection(module);
  handler = module.get<ProfileUpdateHandler>(ProfileUpdateHandler);
  doerRepo = module.get<DoerRepository>(RepositoryNames.DOER);
  action = createAction();
  messagingPlatform = mockMessagingPlatform({
    getDoer: mockGetDoer,
    getDoerPlatformId: mockGetDoerPlatformId,
  });
};

const createAction = (): Action => {
  return {
    name: ActionNames.PROFILE_UPDATE,
    getParameter: (param: string) => {
      if (param === 'attribute') {
        return mockParamAttribute;
      }

      return mockParamValue;
    },
  } as Action;
};

describe('ProfileUpdateHandler', () => {
  beforeEach(async () => {
    mockPsid = '1';
    mockParamAttribute = 'FIRST_NAME';
    mockParamValue = 'firstName';
    mockGetDoer = jest.fn().mockImplementation(() => mockDoer);
    mockGetDoerPlatformId = jest.fn().mockImplementation(() => mockPsid);
    await createApp();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe(`when handle action`, () => {
    const DOER_ID = TestUtils.genMongoId();
    const ATTRIBUTE_FIRST_NAME = 'FIRST_NAME';
    const VALUE_FIRST_NAME = 'firstName';

    beforeEach(async () => {
      mockDoer = await doerRepo.save(DoerFactory.create({ id: DOER_ID }));
      mockParamAttribute = ATTRIBUTE_FIRST_NAME;
      mockParamValue = VALUE_FIRST_NAME;
      await createApp();
    });

    it(`should update doer profile`, async () => {
      await handler.handle(action, messagingPlatform);

      const doer = await doerRepo.findById(DOER_ID);
      expect(doer.profile.firstName).toBe(VALUE_FIRST_NAME);
    });
  });

  describe(`when doer not found`, () => {
    beforeEach(async () => {
      mockDoer = null;
      await createApp();
    });

    it(`should throw BusinessError H01001`, async () => {
      expect.assertions(2);

      try {
        await handler.handle(action, messagingPlatform);
      } catch (e) {
        if (e instanceof BusinessError) {
          expect(e.code).toBe(BusinessErrorCode.H01001_DOER_NOT_FOUND);
          expect(e.message).toContain(mockPsid);
        }
      }
    });
  });

  describe(`when non updatable attribue`, () => {
    const NON_UPDATABLE_ATTRIBUTE = 'NON_UPDATABLE_ATTRIBUTE';

    beforeEach(async () => {
      mockDoer = await doerRepo.save(DoerFactory.create());
      mockParamAttribute = NON_UPDATABLE_ATTRIBUTE;
      await createApp();
    });

    it(`should throw BusinessError H01003`, async () => {
      expect.assertions(2);

      try {
        await handler.handle(action, messagingPlatform);
      } catch (e) {
        if (e instanceof BusinessError) {
          expect(e.code).toBe(BusinessErrorCode.H01003_PARAM_INVALID);
          expect(e.message).toContain(NON_UPDATABLE_ATTRIBUTE);
        }
      }
    });
  });

  describe(`when non updatable attribue`, () => {
    beforeEach(async () => {
      mockDoer = await doerRepo.save(DoerFactory.create());
      mockParamValue = undefined;
      await createApp();
    });

    it(`should throw BusinessError H01000`, async () => {
      expect.assertions(2);

      try {
        await handler.handle(action, messagingPlatform);
      } catch (e) {
        if (e instanceof BusinessError) {
          expect(e.code).toBe(BusinessErrorCode.H01000_MISSING_PARAM);
          expect(e.message).toContain('value');
        }
      }
    });
  });
});
