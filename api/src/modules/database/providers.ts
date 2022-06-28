import { ProviderFactory } from '@modules/provider.factory';

import { ConverterNames } from './constants/converter-names';
import { RepositoryNames } from './constants/repository-names';
import { AccessCardRepositoryImpl } from './repositories/access-card.repository.impl';
import { AgencyRepositoryImpl } from './repositories/agency.repository.impl';
import { ClientRepository } from './repositories/client.repository';
import { AccessCardConverter } from './repositories/converters/access-card.converter';
import { AgencyConverter } from './repositories/converters/agency.converter';
import { ClientConverter } from './repositories/converters/client.converter';
import { DoerConverter } from './repositories/converters/doer.converter';
import { EntryPointConverter } from './repositories/converters/entry-point.converter';
import { JobBoardConverter } from './repositories/converters/job-board.converter';
import { MissionConverter } from './repositories/converters/mission.converter';
import { QuestionMessageConverter } from './repositories/converters/question-message.converter';
import { QuestionSheetConverter } from './repositories/converters/question-sheet.converter';
import { QuestionConverter } from './repositories/converters/question.converter';
import { QuizzSheetConverter } from './repositories/converters/quizz-sheet.converter';
import { QuizzConverter } from './repositories/converters/quizz.converter';
import { DoerRepositoryImpl } from './repositories/doer.repository.impl';
import { EntryPointRepositoryImpl } from './repositories/entry-point.repository.impl';
import { JobBoardRepositoryImpl } from './repositories/job-board.repository.impl';
import { MissionRepository } from './repositories/mission.repository';
import { QuestionSheetRepository } from './repositories/question-sheet.repository';
import { QuestionRepository } from './repositories/question.repository';
import { QuizzSheetRepositoryImpl } from './repositories/quizz-sheet.repository.impl';
import { QuizzRepository } from './repositories/quizz.repository';

export const AccessCardConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.ACCESS_CARD, {
  useClass: AccessCardConverter,
});
export const AccessCardRepositoryProviderFactory = ProviderFactory.createFactory(RepositoryNames.ACCESS_CARD, {
  useClass: AccessCardRepositoryImpl,
});
export const AgencyConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.AGENCY, {
  useClass: AgencyConverter,
});
export const AgencyRepositoryProviderFactory = ProviderFactory.createFactory(RepositoryNames.AGENCY, {
  useClass: AgencyRepositoryImpl,
});
export const ClientConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.CLIENT, {
  useClass: ClientConverter,
});
export const ClientRepositoryProviderFactory = ProviderFactory.createFactory(RepositoryNames.CLIENT, {
  useClass: ClientRepository,
});
export const DoerConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.DOER, {
  useClass: DoerConverter,
});
export const DoerRepositoryProviderFactory = ProviderFactory.createFactory(RepositoryNames.DOER, {
  useClass: DoerRepositoryImpl,
});
export const EntryPointConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.ENTRY_POINT, {
  useClass: EntryPointConverter,
});
export const EntryPointRepositoryProviderFactory = ProviderFactory.createFactory(RepositoryNames.ENTRY_POINT, {
  useClass: EntryPointRepositoryImpl,
});
export const JobBoardConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.JOB_BOARD, {
  useClass: JobBoardConverter,
});
export const JobBoardRepositoryProviderFactory = ProviderFactory.createFactory(RepositoryNames.JOB_BOARD, {
  useClass: JobBoardRepositoryImpl,
});
export const MissionConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.MISSION, {
  useClass: MissionConverter,
});
export const MissionRepositoryProviderFactory = ProviderFactory.createFactory(RepositoryNames.MISSION, {
  useClass: MissionRepository,
});
export const QuestionConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.QUESTION, {
  useClass: QuestionConverter,
});
export const QuestionMessageConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.QUESTION_MESSAGE, {
  useClass: QuestionMessageConverter,
});
export const QuestionRepositoryProviderFactory = ProviderFactory.createFactory(RepositoryNames.QUESTION, {
  useClass: QuestionRepository,
});
export const QuestionSheetConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.QUESTION_SHEET, {
  useClass: QuestionSheetConverter,
});
export const QuestionSheetRepositoryProviderFactory = ProviderFactory.createFactory(RepositoryNames.QUESTION_SHEET, {
  useClass: QuestionSheetRepository,
});
export const QuizzConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.QUIZZ, {
  useClass: QuizzConverter,
});
export const QuizzRepositoryProviderFactory = ProviderFactory.createFactory(RepositoryNames.QUIZZ, {
  useClass: QuizzRepository,
});
export const QuizzSheetConverterProviderFactory = ProviderFactory.createFactory(ConverterNames.QUIZZ_SHEET, {
  useClass: QuizzSheetConverter,
});
export const QuizzSheetRepositoryProviderFactory = ProviderFactory.createFactory(RepositoryNames.QUIZZ_SHEET, {
  useClass: QuizzSheetRepositoryImpl,
});
