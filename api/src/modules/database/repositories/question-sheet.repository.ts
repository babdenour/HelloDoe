import { QuestionSheetImplBusiness } from '@business';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConverterNames } from '../constants/converter-names';
import { SchemaNames } from '../constants/schema-names';
import { QuestionSheetDoc } from '../schemas/question-sheet.schema';
import { BaseRepository } from './base.repository';
import { QuestionSheetConverter } from './converters/question-sheet.converter';

@Injectable()
export class QuestionSheetRepository extends BaseRepository<QuestionSheetImplBusiness, QuestionSheetDoc> {
  constructor(
    @InjectModel(SchemaNames.QUESTION_SHEET) private readonly questionShtModel: Model<QuestionSheetDoc>,
    @Inject(ConverterNames.QUESTION_SHEET) private readonly questionShtCvtr: QuestionSheetConverter,
  ) {
    super(questionShtModel, questionShtCvtr);
  }

  async findAllByDoerIdAndQuizzId(doerId: string, quizzId: string): Promise<QuestionSheetImplBusiness[]> {
    const sheets: QuestionSheetDoc[] = await this.findAllByQuery({ doer: doerId, quizz: quizzId });
    return sheets.map((sheet) => this.questionShtCvtr.toDomain(sheet));
  }
}
