import { ProviderFactory } from '@modules/provider.factory';

import { ServiceNames } from './constants/service-names';
import { UseCaseNames } from './constants/use-case-names';
import { AgencyService } from './services/agency.service';
import { DoerService } from './services/doer.service';
import { MissionService } from './services/mission.service';
import { QuestionService } from './services/question.service';
import { QuizzSheetService } from './services/quizz-sheet.service';
import { QuizzService } from './services/quizz.service';
import { TimeTableService } from './services/time-table.service';
import { CheckoutFulfillUnlockDoersUseCase } from './use-cases/checkout-fulfill-unlock-doers.use-case';
import { CheckoutSessionCreateUseCase } from './use-cases/checkout-session-create.use-case';
import { CreateQuizzUseCase } from './use-cases/create-quizz.use-case';
import { MissionSetFavoriteDoerUseCase } from './use-cases/mission-set-favorite-doer.use-case';
import { MissionSetSeenCandidateUseCase } from './use-cases/mission-set-seen-candidate.use-case';
import { MissionTimeTableUpdateUseCase } from './use-cases/mission-time-table-update.use-case';
import { MissionUpdateUseCase } from './use-cases/mission-update.use-case';
import { MissionValidateUseCase } from './use-cases/mission-validate.use-case';
import { QuizzUpdateUseCase } from './use-cases/quizz-update.use-case';

// Services
export const AgencyServiceProviderFactory = ProviderFactory.createFactory(ServiceNames.AGENCY, {
  useClass: AgencyService,
});
export const DoerServiceProviderFactory = ProviderFactory.createFactory(ServiceNames.DOER, {
  useClass: DoerService,
});
export const MissionServiceProviderFactory = ProviderFactory.createFactory(ServiceNames.MISSION, {
  useClass: MissionService,
});
export const QuestionServiceProviderFactory = ProviderFactory.createFactory(ServiceNames.QUESTION, {
  useClass: QuestionService,
});
export const QuizzServiceProviderFactory = ProviderFactory.createFactory(ServiceNames.QUIZZ, {
  useClass: QuizzService,
});
export const QuizzSheetServiceProviderFactory = ProviderFactory.createFactory(ServiceNames.QUIZZ_SHEET, {
  useClass: QuizzSheetService,
});
export const TimeTableServiceProviderFactory = ProviderFactory.createFactory(ServiceNames.TIME_TABLE, {
  useClass: TimeTableService,
});

// Use cases
export const CheckoutFulfillUnlockDoersUseCaseProviderFactory = ProviderFactory.createFactory(UseCaseNames.CHECKOUT_FULFILL_UNLOCK_DOERS, {
  useClass: CheckoutFulfillUnlockDoersUseCase,
});
export const CheckoutSessionCreateUseCaseProviderFactory = ProviderFactory.createFactory(UseCaseNames.CHECKOUT_SESSION_CREATE, {
  useClass: CheckoutSessionCreateUseCase,
});
export const CreateQuizzUseCaseProviderFactory = ProviderFactory.createFactory(UseCaseNames.CREATE_QUIZZ, {
  useClass: CreateQuizzUseCase,
});
export const MissionSetFavoriteDoerUseCaseProviderFactory = ProviderFactory.createFactory(UseCaseNames.MISSION_SET_FAVORITE_DOER, {
  useClass: MissionSetFavoriteDoerUseCase,
});
export const MissionSetSeenCandidateUseCaseProviderFactory = ProviderFactory.createFactory(UseCaseNames.MISSION_SET_SEEN_CANDIDATE, {
  useClass: MissionSetSeenCandidateUseCase,
});
export const MissionTimeTableUpdateUseCaseProviderFactory = ProviderFactory.createFactory(UseCaseNames.MISSION_TIME_TABLE_UPDATE, {
  useClass: MissionTimeTableUpdateUseCase,
});
export const MissionUpdateUseCaseProviderFactory = ProviderFactory.createFactory(UseCaseNames.MISSION_UPDATE, {
  useClass: MissionUpdateUseCase,
});
export const MissionValidateUseCaseProviderFactory = ProviderFactory.createFactory(UseCaseNames.MISSION_VALIDATE, {
  useClass: MissionValidateUseCase,
});
export const QuizzUpdateUseCaseProviderFactory = ProviderFactory.createFactory(UseCaseNames.QUIZZ_UPDATE, {
  useClass: QuizzUpdateUseCase,
});
