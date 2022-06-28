import { JobBoardFactory, JobBoardImplBusiness } from '@business';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SchemaNames } from '../../constants/schema-names';
import { JobBoard } from '../../schemas/job-board';
import { JobBoardDoc } from '../../schemas/job-board.schema';
import { ConverterUtils } from './converter-utils';
import { Converter } from './types';

@Injectable()
export class JobBoardConverter implements Converter<JobBoardImplBusiness, JobBoardDoc> {
  constructor(@InjectModel(SchemaNames.JOB_BOARD) private readonly jobBoardModel: Model<JobBoardDoc>) {}

  public toDocument = (jobBoardImpl: JobBoardImplBusiness): JobBoardDoc => {
    const jobBoard: JobBoard = {
      createdAt: ConverterUtils.getDate(jobBoardImpl?.createdAt),
      updatedAt: ConverterUtils.getDate(jobBoardImpl?.updatedAt),
      _id: ConverterUtils.getObjectId(jobBoardImpl?.id),
      name: jobBoardImpl?.name,
      missionSources: ConverterUtils.toArray(jobBoardImpl?.missionSources).map(ConverterUtils.getObjectId),
    };

    return new this.jobBoardModel(jobBoard);
  };

  public toDomain = (jobBoardDoc: JobBoardDoc): JobBoardImplBusiness => {
    return JobBoardFactory.create({
      createdAt: ConverterUtils.getTimestamp(jobBoardDoc?.createdAt),
      updatedAt: ConverterUtils.getTimestamp(jobBoardDoc?.updatedAt),
      id: ConverterUtils.getStringId(jobBoardDoc?._id),
      name: jobBoardDoc?.name,
      missionSources: ConverterUtils.toArray(jobBoardDoc?.missionSources).map(ConverterUtils.getStringId),
    });
  };
}
