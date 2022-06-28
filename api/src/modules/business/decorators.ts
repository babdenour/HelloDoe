import { Inject } from '@nestjs/common';

import { ServiceNames } from './constants/service-names';
import { UseCaseNames } from './constants/use-case-names';

// Services
export const InjectAgencyService = Inject(ServiceNames.AGENCY);
export const InjectDoerService = Inject(ServiceNames.DOER);
export const InjectMissionService = Inject(ServiceNames.MISSION);
export const InjectQuestionService = Inject(ServiceNames.QUESTION);
export const InjectQuizzService = Inject(ServiceNames.QUIZZ);
export const InjectTimeTableService = Inject(ServiceNames.TIME_TABLE);

// Use cases
export const InjectCheckoutFulfillUnlockDoersUseCase = Inject(UseCaseNames.CHECKOUT_FULFILL_UNLOCK_DOERS);
export const InjectCheckoutSessionCreateUseCase = Inject(UseCaseNames.CHECKOUT_SESSION_CREATE);
export const InjectCreateQuizzUseCase = Inject(UseCaseNames.CREATE_QUIZZ);
export const InjectMissionSetFavoriteDoerUseCase = Inject(UseCaseNames.MISSION_SET_FAVORITE_DOER);
export const InjectMissionSetSeenCandidateUseCase = Inject(UseCaseNames.MISSION_SET_SEEN_CANDIDATE);
export const InjectMissionTimeTableUpdateUseCase = Inject(UseCaseNames.MISSION_TIME_TABLE_UPDATE);
export const InjectMissionUpdateUseCase = Inject(UseCaseNames.MISSION_UPDATE);
export const InjectMissionValidateUseCase = Inject(UseCaseNames.MISSION_VALIDATE);
export const InjectQuizzUpdateUseCase = Inject(UseCaseNames.QUIZZ_UPDATE);
