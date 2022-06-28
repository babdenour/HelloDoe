import { QuizzSheetFactory, QuizzSheetImplBusiness } from '@business';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SchemaNames } from '../../constants/schema-names';
import { QuizzSheet } from '../../schemas/quizz-sheet';
import { QuizzSheetDoc } from '../../schemas/quizz-sheet.schema';
import { ConverterUtils } from './converter-utils';
import { Converter } from './types';

@Injectable()
export class QuizzSheetConverter implements Converter<QuizzSheetImplBusiness, QuizzSheetDoc> {
  constructor(@InjectModel(SchemaNames.QUIZZ_SHEET) private readonly quizzSheetModel: Model<QuizzSheetDoc>) {}

  public toDocument = (quizzSheetImpl: QuizzSheetImplBusiness): QuizzSheetDoc => {
    const quizzSheet: QuizzSheet = {
      createdAt: ConverterUtils.getDate(quizzSheetImpl?.createdAt),
      updatedAt: ConverterUtils.getDate(quizzSheetImpl?.updatedAt),
      _id: ConverterUtils.getObjectId(quizzSheetImpl?.id),
      doer: ConverterUtils.getObjectId(quizzSheetImpl?.doer),
      quizz: ConverterUtils.getObjectId(quizzSheetImpl?.quizz),
      questionSheets: ConverterUtils.toArray(quizzSheetImpl?.questionSheets).map(ConverterUtils.getObjectId),
      completedAt: ConverterUtils.getDate(quizzSheetImpl?.completedAt),
      score: quizzSheetImpl?.score,
      isFavorite: quizzSheetImpl?.isFavorite,
      isUnlocked: quizzSheetImpl?.isUnlocked,
      isSeen: quizzSheetImpl?.isSeen,
    };

    return new this.quizzSheetModel(quizzSheet);
  };

  public toDomain = (quizzSheetDoc: QuizzSheetDoc): QuizzSheetImplBusiness => {
    return QuizzSheetFactory.create({
      createdAt: ConverterUtils.getTimestamp(quizzSheetDoc?.createdAt),
      updatedAt: ConverterUtils.getTimestamp(quizzSheetDoc?.updatedAt),
      id: ConverterUtils.getStringId(quizzSheetDoc?._id),
      doer: ConverterUtils.getStringId(quizzSheetDoc?.doer),
      quizz: ConverterUtils.getStringId(quizzSheetDoc?.quizz),
      questionSheets: ConverterUtils.toArray(quizzSheetDoc?.questionSheets).map(ConverterUtils.getStringId),
      completedAt: ConverterUtils.getTimestamp(quizzSheetDoc?.completedAt),
      score: quizzSheetDoc?.score,
      isFavorite: quizzSheetDoc?.isFavorite,
      isUnlocked: quizzSheetDoc?.isUnlocked,
      isSeen: quizzSheetDoc?.isSeen,
    });
  };
}
