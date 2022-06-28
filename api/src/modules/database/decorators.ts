import { Inject } from '@nestjs/common';

import { RepositoryNames } from './constants/repository-names';

export const InjectAccessCardRepository = Inject(RepositoryNames.ACCESS_CARD);
export const InjectAgencyRepository = Inject(RepositoryNames.AGENCY);
export const InjectClientRepository = Inject(RepositoryNames.CLIENT);
export const InjectDoerRepository = Inject(RepositoryNames.DOER);
export const InjectEntryPointRepository = Inject(RepositoryNames.ENTRY_POINT);
export const InjectJobBoardRepository = Inject(RepositoryNames.JOB_BOARD);
export const InjectMissionRepository = Inject(RepositoryNames.MISSION);
export const InjectQuestionRepository = Inject(RepositoryNames.QUESTION);
export const InjectQuestionSheetRepository = Inject(RepositoryNames.QUESTION_SHEET);
export const InjectQuizzRepository = Inject(RepositoryNames.QUIZZ);
export const InjectQuizzSheetRepository = Inject(RepositoryNames.QUIZZ_SHEET);
