import {
  MissionRepository,
  MissionRepositoryProviderFactory,
  QuizzRepository,
  QuizzRepositoryProviderFactory,
  QuizzSheetRepositoryProviderFactory,
} from '@database';
import { mockMissionRepo, mockPaymentClt, mockQuizzRepo, mockQuizzSheetRepo, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentClientProviderFactory } from '@payment';

import { UseCaseNames } from '../constants/use-case-names';
import { ClientFactory } from '../factories/client.factory';
import { MissionFactory } from '../factories/mission.factory';
import { QuizzSheetFactory } from '../factories/quizz-sheet.factory';
import { QuizzFactory } from '../factories/quizz.factory';
import { PaymentClient } from '../interfaces/payment/payment.client';
import { ProductIds } from '../interfaces/payment/product-ids';
import { CheckoutSessionCreateUseCaseProviderFactory } from '../providers';
import { QuizzSheetRepository } from '../repositories/quizz-sheet.repository';
import { CheckoutSessionCreateUseCase } from './checkout-session-create.use-case';

const CheckoutSessionCreateUseCaseProvider = CheckoutSessionCreateUseCaseProviderFactory();

let useCase: CheckoutSessionCreateUseCase;

let mockedMissionRepo: Partial<MissionRepository>;
let mockedPaymentClient: Partial<PaymentClient>;
let mockedQuizzRepo: Partial<QuizzRepository>;
let mockedQuizzSheetRepo: Partial<QuizzSheetRepository>;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      MissionRepositoryProviderFactory({ useValue: mockedMissionRepo }),
      PaymentClientProviderFactory({ useValue: mockedPaymentClient }),
      QuizzRepositoryProviderFactory({ useValue: mockedQuizzRepo }),
      QuizzSheetRepositoryProviderFactory({ useValue: mockedQuizzSheetRepo }),
      CheckoutSessionCreateUseCaseProvider,
    ],
    exports: [CheckoutSessionCreateUseCaseProvider],
  }).compile();

  useCase = module.get<CheckoutSessionCreateUseCase>(UseCaseNames.CHECKOUT_SESSION_CREATE);
};

const PRODUCT_ID = ProductIds.CONTACT_DOER;
const CLIENT_EMAIL = 'happy.client@gmail.com';
const MISSION_ID = TestUtils.genMongoId();
const MISSION_CODE = 'code';
const QUIZZ_ID = TestUtils.genMongoId();
const DOER_ID_0 = TestUtils.genMongoId();
const DOER_ID_1 = TestUtils.genMongoId();

describe('CheckoutSessionCreateUseCase', () => {
  beforeEach(async () => {
    mockedMissionRepo = mockMissionRepo({
      findByIdWithClient: jest.fn().mockImplementation(() =>
        MissionFactory.create({
          id: MISSION_ID,
          code: MISSION_CODE,
          client: ClientFactory.create({
            contact: ClientFactory.createClientContact({
              email: CLIENT_EMAIL,
            }),
          }),
        }),
      ),
    });
    mockedPaymentClient = mockPaymentClt({
      createCheckoutSession: jest.fn().mockImplementation(() => ({ sessionId: 'sessionId' })),
    });
    mockedQuizzRepo = mockQuizzRepo({
      findByMissionId: jest.fn().mockResolvedValue(() =>
        QuizzFactory.create({
          id: QUIZZ_ID,
        }),
      ),
    });
    mockedQuizzSheetRepo = mockQuizzSheetRepo({
      findAllByQuizzIdAndIsFavorite: jest.fn().mockResolvedValue([
        QuizzSheetFactory.create({
          doer: DOER_ID_0,
        }),
        QuizzSheetFactory.create({
          doer: DOER_ID_1,
        }),
      ]),
    });
    await createApp();
  });

  describe('when happy path', () => {
    it('should pass on right params', async () => {
      await useCase.run(PRODUCT_ID, MISSION_ID);

      expect(mockedPaymentClient.createCheckoutSession).toHaveBeenCalledWith(
        PRODUCT_ID,
        CLIENT_EMAIL,
        MISSION_ID,
        MISSION_CODE,
        [DOER_ID_0, DOER_ID_1],
      );
    });
  });
});
