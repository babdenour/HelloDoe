import { QuestionFactory, QuestionImplBusiness } from '@business';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConverterNames } from '../../constants/converter-names';
import { SchemaNames } from '../../constants/schema-names';
import { Question } from '../../schemas/question';
import { QuestionDoc } from '../../schemas/question.schema';
import { ConverterUtils as CvtrUtils } from './converter-utils';
import { QuestionMessageConverter } from './question-message.converter';
import { Converter } from './types';

@Injectable()
export class QuestionConverter implements Converter<QuestionImplBusiness, QuestionDoc> {
  constructor(
    @InjectModel(SchemaNames.QUESTION) private readonly questionModel: Model<QuestionDoc>,
    @Inject(ConverterNames.QUESTION_MESSAGE) private readonly messageConverter: QuestionMessageConverter,
  ) {}

  public toDocument = (questionImpl: QuestionImplBusiness): QuestionDoc => {
    const question: Question = {
      createdAt: CvtrUtils.getDate(questionImpl?.createdAt),
      updatedAt: CvtrUtils.getDate(questionImpl?.updatedAt),
      _id: CvtrUtils.getObjectId(questionImpl?.id),
      messages: CvtrUtils.toArray(questionImpl?.messages).map((message) => this.messageConverter.toDocument(message)),
      tags: CvtrUtils.toArray(questionImpl?.tags),
    };

    return new this.questionModel(question);
  };

  public toDomain = (questionDoc: QuestionDoc): QuestionImplBusiness => {
    return QuestionFactory.create({
      createdAt: CvtrUtils.getTimestamp(questionDoc?.createdAt),
      updatedAt: CvtrUtils.getTimestamp(questionDoc?.updatedAt),
      id: CvtrUtils.getStringId(questionDoc?._id),
      messages: CvtrUtils.toArray(questionDoc?.messages).map((message) => this.messageConverter.toDomain(message)),
      tags: CvtrUtils.toArray(questionDoc?.tags),
    });
  };
}
