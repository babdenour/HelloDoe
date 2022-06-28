import { JobBoardImplBusiness, JobBoardRepositoryBusiness } from '@business';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConverterNames } from '../constants/converter-names';
import { SchemaNames } from '../constants/schema-names';
import { JobBoardDoc } from '../schemas/job-board.schema';
import { BaseRepository } from './base.repository';
import { JobBoardConverter } from './converters/job-board.converter';

@Injectable()
export class JobBoardRepositoryImpl
  extends BaseRepository<JobBoardImplBusiness, JobBoardDoc>
  implements JobBoardRepositoryBusiness {
  constructor(
    @InjectModel(SchemaNames.JOB_BOARD) private readonly jobBoardModel: Model<JobBoardDoc>,
    @Inject(ConverterNames.JOB_BOARD) private jobBoardCvtr: JobBoardConverter,
  ) {
    super(jobBoardModel, jobBoardCvtr);
  }
}
