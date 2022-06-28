import { QuizzRepository, QuizzRepositoryProviderFactory, QuizzSheetRepositoryProviderFactory } from '@database';
import { mockQuizzRepo, mockQuizzSheetRepo, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';

import { UseCaseNames } from '../constants/use-case-names';
import { QuizzFactory } from '../factories/quizz.factory';
import { CheckoutFulfillUnlockDoersUseCaseProviderFactory } from '../providers';
import { QuizzSheetRepository } from '../repositories/quizz-sheet.repository';
import { CheckoutFulfillUnlockDoersUseCase } from './checkout-fulfill-unlock-doers.use-case';

const CheckoutFulfillUnlockDoersUseCaseProvider = CheckoutFulfillUnlockDoersUseCaseProviderFactory();

let useCase: CheckoutFulfillUnlockDoersUseCase;

let mockedQuizzRepo: Partial<QuizzRepository>;
let mockedQuizzSheetRepo: Partial<QuizzSheetRepository>;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      QuizzRepositoryProviderFactory({ useValue: mockedQuizzRepo }),
      QuizzSheetRepositoryProviderFactory({ useValue: mockedQuizzSheetRepo }),
      CheckoutFulfillUnlockDoersUseCaseProvider,
    ],
    exports: [CheckoutFulfillUnlockDoersUseCaseProvider],
  }).compile();

  useCase = module.get<CheckoutFulfillUnlockDoersUseCase>(UseCaseNames.CHECKOUT_FULFILL_UNLOCK_DOERS);
};

describe('CheckoutFulfillUnlockDoersUseCase', () => {
  beforeEach(async () => {
    mockedQuizzRepo = mockQuizzRepo();
    mockedQuizzSheetRepo = mockQuizzSheetRepo();
    await createApp();
  });

  describe('when happy path', () => {
    const MISSION_ID = TestUtils.genMongoId();
    const QUIZZ_ID = TestUtils.genMongoId();
    const DOER_ID_0 = TestUtils.genMongoId();
    const DOER_ID_1 = TestUtils.genMongoId();

    beforeEach(async () => {
      mockedQuizzRepo.findByMissionId = jest.fn().mockImplementation(() => QuizzFactory.create({ id: QUIZZ_ID }));
      await createApp();
    });

    it('should pass on right params', async () => {
      await useCase.run(MISSION_ID, [DOER_ID_0, DOER_ID_1]);

      expect(mockedQuizzSheetRepo.updateAllIsUnlockedByQuizzIdAndDoerIdIn).toHaveBeenCalledWith(
        QUIZZ_ID,
        [DOER_ID_0, DOER_ID_1],
        true,
      );
      expect(mockedQuizzSheetRepo.updateAllIsFavoriteByQuizzIdAndDoerIdIn).toHaveBeenCalledWith(
        QUIZZ_ID,
        [DOER_ID_0, DOER_ID_1],
        false,
      );
    });
  });
});
