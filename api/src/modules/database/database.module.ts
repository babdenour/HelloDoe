import { NodeEnv } from '@modules/node-env';
import { Global, Module } from '@nestjs/common';

import { MongooseMockModuleProvider } from './mongoose-mock.module';
import { MongooseModuleProvider } from './mongoose.module';
import {
  AccessCardConverterProviderFactory,
  AccessCardRepositoryProviderFactory,
  AgencyConverterProviderFactory,
  AgencyRepositoryProviderFactory,
  ClientConverterProviderFactory,
  ClientRepositoryProviderFactory,
  DoerConverterProviderFactory,
  DoerRepositoryProviderFactory,
  EntryPointConverterProviderFactory,
  EntryPointRepositoryProviderFactory,
  JobBoardConverterProviderFactory,
  JobBoardRepositoryProviderFactory,
  MissionConverterProviderFactory,
  MissionRepositoryProviderFactory,
  QuestionConverterProviderFactory,
  QuestionMessageConverterProviderFactory,
  QuestionRepositoryProviderFactory,
  QuestionSheetConverterProviderFactory,
  QuestionSheetRepositoryProviderFactory,
  QuizzConverterProviderFactory,
  QuizzRepositoryProviderFactory,
  QuizzSheetConverterProviderFactory,
  QuizzSheetRepositoryProviderFactory,
} from './providers';
import { SchemaModule } from './schema.module';

const AccessCardConverterProvider = AccessCardConverterProviderFactory();
const AccessCardRepositoryProvider = AccessCardRepositoryProviderFactory();
const AgencyConverterProvider = AgencyConverterProviderFactory();
const AgencyRepositoryProvider = AgencyRepositoryProviderFactory();
const ClientConverterProvider = ClientConverterProviderFactory();
const ClientRepositoryProvider = ClientRepositoryProviderFactory();
const DoerConverterProvider = DoerConverterProviderFactory();
const DoerRepositoryProvider = DoerRepositoryProviderFactory();
const EntryPointConverterProvider = EntryPointConverterProviderFactory();
const EntryPointRepositoryProvider = EntryPointRepositoryProviderFactory();
const JobBoardConverterProvider = JobBoardConverterProviderFactory();
const JobBoardRepositoryProvider = JobBoardRepositoryProviderFactory();
const MissionConverterProvider = MissionConverterProviderFactory();
const MissionRepositoryProvider = MissionRepositoryProviderFactory();
const QuestionConverterProvider = QuestionConverterProviderFactory();
const QuestionMessageConverterProvider = QuestionMessageConverterProviderFactory();
const QuestionRepositoryProvider = QuestionRepositoryProviderFactory();
const QuestionSheetConverterProvider = QuestionSheetConverterProviderFactory();
const QuestionSheetRepositoryProvider = QuestionSheetRepositoryProviderFactory();
const QuizzConverterProvider = QuizzConverterProviderFactory();
const QuizzRepositoryProvider = QuizzRepositoryProviderFactory();
const QuizzSheetConverterProvider = QuizzSheetConverterProviderFactory();
const QuizzSheetRepositoryProvider = QuizzSheetRepositoryProviderFactory();

@Global()
@Module({
  imports: [
    process.env.NODE_ENV !== NodeEnv.TEST ? MongooseModuleProvider() : MongooseMockModuleProvider(),
    SchemaModule,
  ],
  providers: [
    // Converters
    AccessCardConverterProvider,
    AgencyConverterProvider,
    ClientConverterProvider,
    DoerConverterProvider,
    EntryPointConverterProvider,
    JobBoardConverterProvider,
    MissionConverterProvider,
    QuestionConverterProvider,
    QuestionMessageConverterProvider,
    QuestionSheetConverterProvider,
    QuizzConverterProvider,
    QuizzSheetConverterProvider,

    // Repositories
    AccessCardRepositoryProvider,
    AgencyRepositoryProvider,
    ClientRepositoryProvider,
    DoerRepositoryProvider,
    EntryPointRepositoryProvider,
    JobBoardRepositoryProvider,
    MissionRepositoryProvider,
    QuestionRepositoryProvider,
    QuestionSheetRepositoryProvider,
    QuizzRepositoryProvider,
    QuizzSheetRepositoryProvider,
  ],
  exports: [
    // Repositories
    AccessCardRepositoryProvider,
    AgencyRepositoryProvider,
    ClientRepositoryProvider,
    DoerRepositoryProvider,
    EntryPointRepositoryProvider,
    JobBoardRepositoryProvider,
    MissionRepositoryProvider,
    QuestionRepositoryProvider,
    QuestionSheetRepositoryProvider,
    QuizzRepositoryProvider,
    QuizzSheetRepositoryProvider,
  ],
})
export class DatabaseModule {}
