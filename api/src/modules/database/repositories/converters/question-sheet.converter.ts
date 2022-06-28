import { QuestionSheetFactory, QuestionSheetImplBusiness } from '@business';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SchemaNames } from '../../constants/schema-names';
import { QuestionSheet } from '../../schemas/question-sheet';
import { QuestionSheetDoc } from '../../schemas/question-sheet.schema';
import { ConverterUtils } from './converter-utils';
import { Converter } from './types';

@Injectable()
export class QuestionSheetConverter implements Converter<QuestionSheetImplBusiness, QuestionSheetDoc> {
  constructor(@InjectModel(SchemaNames.QUESTION_SHEET) private readonly questionSheetModel: Model<QuestionSheetDoc>) {}

  public toDocument = (questionSheetImpl: QuestionSheetImplBusiness): QuestionSheetDoc => {
    const questionSheet: QuestionSheet = {
      createdAt: ConverterUtils.getDate(questionSheetImpl?.createdAt),
      updatedAt: ConverterUtils.getDate(questionSheetImpl?.updatedAt),
      _id: ConverterUtils.getObjectId(questionSheetImpl?.id),
      question: ConverterUtils.getObjectId(questionSheetImpl?.question),
      doer: ConverterUtils.getObjectId(questionSheetImpl?.doer),
      quizz: ConverterUtils.getObjectId(questionSheetImpl?.quizz),
      answer: questionSheetImpl?.answer,
      score: questionSheetImpl?.score,
    };

    return new this.questionSheetModel(questionSheet);
  };

  public toDomain = (questionSheetDoc: QuestionSheetDoc): QuestionSheetImplBusiness => {
    return QuestionSheetFactory.create({
      createdAt: ConverterUtils.getTimestamp(questionSheetDoc?.createdAt),
      updatedAt: ConverterUtils.getTimestamp(questionSheetDoc?.updatedAt),
      id: ConverterUtils.getStringId(questionSheetDoc?._id),
      question: ConverterUtils.getStringId(questionSheetDoc?.question),
      doer: ConverterUtils.getStringId(questionSheetDoc?.doer),
      quizz: ConverterUtils.getStringId(questionSheetDoc?.quizz),
      answer: questionSheetDoc?.answer,
      score: questionSheetDoc?.score,
    });
  };
}
