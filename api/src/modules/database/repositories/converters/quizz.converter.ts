import { QuizzFactory, QuizzImplBusiness } from '@business';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SchemaNames } from '../../constants/schema-names';
import { Quizz } from '../../schemas/quizz';
import { QuizzDoc } from '../../schemas/quizz.schema';
import { ConverterUtils } from './converter-utils';
import { Converter } from './types';

@Injectable()
export class QuizzConverter implements Converter<QuizzImplBusiness, QuizzDoc> {
  constructor(
    @InjectModel(SchemaNames.QUIZZ)
    private readonly quizzModel: Model<QuizzDoc>,
  ) {}

  public toDocument = (quizzImpl: QuizzImplBusiness): QuizzDoc => {
    const quizz: Quizz = {
      createdAt: ConverterUtils.getDate(quizzImpl?.createdAt),
      updatedAt: ConverterUtils.getDate(quizzImpl?.updatedAt),
      _id: ConverterUtils.getObjectId(quizzImpl?.id),
      mission: ConverterUtils.getObjectId(quizzImpl?.mission),
      questions: quizzImpl?.questions?.map(ConverterUtils.getObjectId),
    };

    return new this.quizzModel(quizz);
  };

  public toDomain = (quizzDoc: QuizzDoc): QuizzImplBusiness => {
    return QuizzFactory.create({
      createdAt: ConverterUtils.getTimestamp(quizzDoc?.createdAt),
      updatedAt: ConverterUtils.getTimestamp(quizzDoc?.updatedAt),
      id: ConverterUtils.getStringId(quizzDoc?._id),
      mission: ConverterUtils.getStringId(quizzDoc?.mission),
      questions: quizzDoc?.questions?.map(ConverterUtils.getStringId),
    });
  };
}
