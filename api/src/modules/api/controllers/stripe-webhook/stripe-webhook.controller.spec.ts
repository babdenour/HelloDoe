import { CheckoutFulfillUnlockDoersUseCase, CheckoutFulfillUnlockDoersUseCaseProviderFactory } from '@business';
import { ConfigModule } from '@config';
import { TestUtils } from '@mocks';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StripeSdkProviderFactory } from '@sdk/stripe';
import { TokenModule } from '@token';
import { Request as RequestExpress } from 'express';

import { EventNames } from './event-names';
import { RequestBody } from './request-body';
import { StripeWebhookController } from './stripe-webhook.controller';

let stripeWebhkCtrl: StripeWebhookController;

let mockCheckoutFulfillUnlockDoersUseCase: Partial<CheckoutFulfillUnlockDoersUseCase>;
let mockConstructEvent: jest.Mock;

const REQUEST_HEADERS = {
  'stripe-signature': 'stripe-signature',
};
let REQUEST: RequestExpress;

const CLIENT_EMAIL = 'happy.client@gmail.com';
const MISSION_ID = TestUtils.genMongoId();
const MISSION_CODE = 'code';
const DOER_ID_0 = TestUtils.genMongoId();
const DOER_ID_1 = TestUtils.genMongoId();
const DOER_ID_2 = TestUtils.genMongoId();

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule, TokenModule],
    providers: [
      CheckoutFulfillUnlockDoersUseCaseProviderFactory({ useValue: mockCheckoutFulfillUnlockDoersUseCase }),
      StripeSdkProviderFactory({
        useValue: {
          webhooks: {
            constructEvent: mockConstructEvent,
          },
        },
      }),
      StripeWebhookController,
    ],
  }).compile();

  stripeWebhkCtrl = module.get<StripeWebhookController>(StripeWebhookController);
};

const createCheckoutFulfillUnlockDoersUseCaseMock = (): Partial<CheckoutFulfillUnlockDoersUseCase> => {
  return {
    run: jest.fn(),
  };
};

describe('StripeWebhookController', () => {
  beforeEach(async () => {
    REQUEST = ({
      headers: REQUEST_HEADERS,
    } as unknown) as RequestExpress;
    mockCheckoutFulfillUnlockDoersUseCase = createCheckoutFulfillUnlockDoersUseCaseMock();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    mockConstructEvent = jest.fn().mockImplementation((body) => body);
    await createApp();
  });

  describe('when handle checkout session completed event', () => {
    beforeEach(() => {
      const body: Partial<RequestBody> = {
        type: EventNames.CHECKOUT_SESSION_COMPLETED,
        data: {
          object: {
            customer_email: CLIENT_EMAIL,
            metadata: {
              missionId: MISSION_ID,
              missionCode: MISSION_CODE,
              doerIds0: `${DOER_ID_0},${DOER_ID_1}`,
              doerIds1: `${DOER_ID_2}`,
            },
          },
        },
      };
      REQUEST.body = body;
    });

    it('should pass on right params', async () => {
      await stripeWebhkCtrl.handleRequest(REQUEST);

      expect(mockCheckoutFulfillUnlockDoersUseCase.run).toHaveBeenCalledWith(MISSION_ID, [
        DOER_ID_0,
        DOER_ID_1,
        DOER_ID_2,
      ]);
    });
  });

  describe('when build event fails', () => {
    beforeEach(async () => {
      mockConstructEvent = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await createApp();
    });

    it('should throw bad request exception', async () => {
      await expect(stripeWebhkCtrl.handleRequest(REQUEST)).rejects.toThrow(BadRequestException);
    });
  });
});
