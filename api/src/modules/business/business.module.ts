import { ConfigModule } from '@config';
import { Module, Provider } from '@nestjs/common';
import { PaymentModule } from '@payment';

import {
  AgencyServiceProviderFactory,
  CheckoutFulfillUnlockDoersUseCaseProviderFactory,
  CheckoutSessionCreateUseCaseProviderFactory,
  CreateQuizzUseCaseProviderFactory,
  DoerServiceProviderFactory,
  MissionServiceProviderFactory,
  MissionSetFavoriteDoerUseCaseProviderFactory,
  MissionSetSeenCandidateUseCaseProviderFactory,
  MissionTimeTableUpdateUseCaseProviderFactory,
  MissionUpdateUseCaseProviderFactory,
  MissionValidateUseCaseProviderFactory,
  QuestionServiceProviderFactory,
  QuizzServiceProviderFactory,
  QuizzSheetServiceProviderFactory,
  QuizzUpdateUseCaseProviderFactory,
  TimeTableServiceProviderFactory,
} from './providers';
import { CandidateServiceProviderFactory } from './services/candidate.service';
import { DoerVideoCvBatchInitUseCaseProviderFactory } from './use-cases/doer-video-cv-init-batch.use-case';

// Services
const AgencyServiceProvider: Provider = AgencyServiceProviderFactory();
const CandidateServiceProvider: Provider = CandidateServiceProviderFactory();
const DoerServiceProvider: Provider = DoerServiceProviderFactory();
const MissionServiceProvider: Provider = MissionServiceProviderFactory();
const QuestionServiceProvider: Provider = QuestionServiceProviderFactory();
const QuizzServiceProvider: Provider = QuizzServiceProviderFactory();
const QuizzSheetServiceProvider: Provider = QuizzSheetServiceProviderFactory();
const TimeTableServiceProvider: Provider = TimeTableServiceProviderFactory();

// Use cases
const CheckoutFulfillUnlockDoersUseCaseProvider: Provider = CheckoutFulfillUnlockDoersUseCaseProviderFactory();
const CheckoutSessionCreateUseCaseProvider: Provider = CheckoutSessionCreateUseCaseProviderFactory();
const CreateQuizzUseCaseProvider: Provider = CreateQuizzUseCaseProviderFactory();
const DoerVideoCvBatchInitUseCaseProvider: Provider = DoerVideoCvBatchInitUseCaseProviderFactory();
const MissionSetFavoriteDoerUseCaseProvider: Provider = MissionSetFavoriteDoerUseCaseProviderFactory();
const MissionSetSeenCandidateUseCaseProvider: Provider = MissionSetSeenCandidateUseCaseProviderFactory();
const MissionTimeTableUpdateUseCaseProvider: Provider = MissionTimeTableUpdateUseCaseProviderFactory();
const MissionUpdateUseCaseProvider: Provider = MissionUpdateUseCaseProviderFactory();
const MissionValidateUseCaseProvider: Provider = MissionValidateUseCaseProviderFactory();
const QuizzUpdateUseCaseProvider: Provider = QuizzUpdateUseCaseProviderFactory();

@Module({
  imports: [ConfigModule, PaymentModule],
  providers: [
    // Services
    AgencyServiceProvider,
    CandidateServiceProvider,
    DoerServiceProvider,
    MissionServiceProvider,
    QuestionServiceProvider,
    QuizzServiceProvider,
    QuizzSheetServiceProvider,
    TimeTableServiceProvider,

    // Use cases
    CheckoutFulfillUnlockDoersUseCaseProvider,
    CheckoutSessionCreateUseCaseProvider,
    CreateQuizzUseCaseProvider,
    DoerVideoCvBatchInitUseCaseProvider,
    MissionSetFavoriteDoerUseCaseProvider,
    MissionSetSeenCandidateUseCaseProvider,
    MissionTimeTableUpdateUseCaseProvider,
    MissionUpdateUseCaseProvider,
    MissionValidateUseCaseProvider,
    QuizzUpdateUseCaseProvider,
  ],
  exports: [
    // Services
    AgencyServiceProvider,
    CandidateServiceProvider,
    DoerServiceProvider,
    MissionServiceProvider,
    QuestionServiceProvider,
    QuizzServiceProvider,
    QuizzSheetServiceProvider,
    TimeTableServiceProvider,

    // Use cases
    CheckoutFulfillUnlockDoersUseCaseProvider,
    CheckoutSessionCreateUseCaseProvider,
    CreateQuizzUseCaseProvider,
    DoerVideoCvBatchInitUseCaseProvider,
    MissionSetFavoriteDoerUseCaseProvider,
    MissionSetSeenCandidateUseCaseProvider,
    MissionTimeTableUpdateUseCaseProvider,
    MissionUpdateUseCaseProvider,
    MissionValidateUseCaseProvider,
    QuizzUpdateUseCaseProvider,
  ],
})
export class BusinessModule {}
