import { mockMessagingPlatform } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';

import { FollowupEvents } from '../constants/followup-events';
import { Action } from '../domains/action';
import { MessagingPlatform } from '../types/messaging-platform';
import { PageRedirectHandler } from './page-redirect.handler';

const REDIRECT_INTENT = 'INTENT';

let handler: PageRedirectHandler;
let action: Action;
let messagingPlatform: MessagingPlatform;

let mockRedirectIntent: string;

const createAction = (): Action => {
  return ({
    getParameter: () => mockRedirectIntent,
  } as unknown) as Action;
};

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [PageRedirectHandler],
  }).compile();

  handler = module.get<PageRedirectHandler>(PageRedirectHandler);

  action = createAction();
  messagingPlatform = mockMessagingPlatform({
    getPageId: jest.fn(),
  });
};

describe('PageRedirectHandler', () => {
  beforeEach(async () => {
    mockRedirectIntent = REDIRECT_INTENT;
    await createApp();
  });

  describe(`when redirect intent found`, () => {
    it(`should redirect to intent`, async () => {
      await handler.handle(action, messagingPlatform);

      expect(action.followupEvent).toEqual(REDIRECT_INTENT);
    });
  });

  describe(`when no redirect intent found`, () => {
    beforeEach(async () => {
      mockRedirectIntent = undefined;
      await createApp();
    });

    it(`should redirect to fallback`, async () => {
      await handler.handle(action, messagingPlatform);

      expect(action.followupEvent).toEqual(FollowupEvents.FALLBACK);
    });
  });
});
