import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SchemaNames } from './constants/schema-names';
import { AccessCardSchema } from './schemas/access-card.schema';
import { AgencySchema } from './schemas/agency.schema';
import { ClientSchema } from './schemas/client.schema';
import { DoerSchema } from './schemas/doer.schema';
import { EntryPointSchema } from './schemas/entry-point.schema';
import { JobBoardSchema } from './schemas/job-board.schema';
import { MissionSchema } from './schemas/mission.schema';
import { QuestionSheetSchema } from './schemas/question-sheet.schema';
import { QuestionSchema } from './schemas/question.schema';
import { QuizzSheetSchema } from './schemas/quizz-sheet.schema';
import { QuizzSchema } from './schemas/quizz.schema';

export const SchemaModule: DynamicModule = MongooseModule.forFeature([
  { name: SchemaNames.ACCESS_CARD, schema: AccessCardSchema },
  { name: SchemaNames.AGENCY, schema: AgencySchema },
  { name: SchemaNames.CLIENT, schema: ClientSchema },
  { name: SchemaNames.DOER, schema: DoerSchema },
  { name: SchemaNames.ENTRY_POINT, schema: EntryPointSchema },
  { name: SchemaNames.JOB_BOARD, schema: JobBoardSchema },
  { name: SchemaNames.MISSION, schema: MissionSchema },
  { name: SchemaNames.QUESTION, schema: QuestionSchema },
  { name: SchemaNames.QUESTION_SHEET, schema: QuestionSheetSchema },
  { name: SchemaNames.QUIZZ, schema: QuizzSchema },
  { name: SchemaNames.QUIZZ_SHEET, schema: QuizzSheetSchema },
]);
