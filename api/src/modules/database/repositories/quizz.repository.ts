import { QuestionImplBusiness, QuizzImplBusiness } from '@business';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ConverterNames } from '../constants/converter-names';
import { SchemaNames } from '../constants/schema-names';
import { BaseRepository } from '../repositories/base.repository';
import { QuestionDoc } from '../schemas/question.schema';
import { QuizzDoc } from '../schemas/quizz.schema';
import { QuestionConverter } from './converters/question.converter';
import { QuizzConverter } from './converters/quizz.converter';

@Injectable()
export class QuizzRepository extends BaseRepository<QuizzImplBusiness, QuizzDoc> {
  constructor(
    @InjectModel(SchemaNames.QUIZZ) private readonly quizzModel: Model<QuizzDoc>,
    @Inject(ConverterNames.QUESTION) private readonly questionConverter: QuestionConverter,
    @Inject(ConverterNames.QUIZZ) private readonly quizzConverter: QuizzConverter,
  ) {
    super(quizzModel, quizzConverter);
  }

  public async findByIdWithQuestions(
    id: string,
  ): Promise<{ quizz: QuizzImplBusiness; questions: QuestionImplBusiness[] }> {
    const quizz: QuizzDoc = await this.findByQuery('_id', id, ['questions']);
    const questions = ((quizz?.questions || []) as unknown) as QuestionDoc[];

    if (quizz) {
      quizz.questions = questions.map((question: QuestionDoc) => question._id as Types.ObjectId);
    }

    return {
      quizz: this.convertIfNotNull(quizz),
      questions: questions.map((question: QuestionDoc) => this.questionConverter.toDomain(question)),
    };
  }

  public async findByMissionId(missionId: string): Promise<QuizzImplBusiness | null> {
    const quizz: QuizzDoc = await this.findByQuery('mission', missionId);
    return this.convertIfNotNull(quizz);
  }

  public async findByMissionIdWithQuestions(
    missionId: string,
  ): Promise<{ quizz: QuizzImplBusiness; questions: QuestionImplBusiness[] }> {
    const quizz: QuizzDoc = await this.findByQuery('mission', missionId, ['questions']);
    const questions = ((quizz?.questions || []) as unknown) as QuestionDoc[];

    if (quizz) {
      quizz.questions = questions.map((question: QuestionDoc) => question._id as Types.ObjectId);
    }

    return {
      quizz: this.convertIfNotNull(quizz),
      questions: questions.map((question: QuestionDoc) => this.questionConverter.toDomain(question)),
    };
  }
}
