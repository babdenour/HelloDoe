import { BusinessError, BusinessErrorCode } from '@business';
import { ActionTestImpl } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';

import { Action } from '../domains/action';
import { IntentRedirectHandler } from './intent-redirect.handler';

const EVENT_NAME = 'EVENT_NAME';

let handler: IntentRedirectHandler;
let action: Action;

let mockedEventName: string;

const createAction = (): Action => {
  return (new ActionTestImpl({ eventName: mockedEventName }) as unknown) as Action;
};

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [IntentRedirectHandler],
  }).compile();

  handler = module.get<IntentRedirectHandler>(IntentRedirectHandler);

  action = createAction();
};

describe('IntentRedirectHandler', () => {
  beforeEach(async () => {
    mockedEventName = EVENT_NAME;
    await createApp();
  });

  describe(`when redirect to intent`, () => {
    it(`should redirect to intent`, async () => {
      await handler.handle(action);

      expect(action.getFollowupEvent()).toEqual(EVENT_NAME);
    });
  });

  describe(`when missing event name`, () => {
    beforeEach(async () => {
      mockedEventName = undefined;
      await createApp();
    });

    it(`should throw business error H01000`, async () => {
      expect.assertions(2);

      try {
        await handler.handle(action);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H01000_MISSING_PARAM);
          expect(ex.message).toContain('eventName');
        }
      }
    });
  });
});
