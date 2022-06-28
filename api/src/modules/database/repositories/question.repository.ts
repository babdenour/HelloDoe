import { QuestionImplBusiness } from '@business';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConverterNames } from '../constants/converter-names';
import { SchemaNames } from '../constants/schema-names';
import { Question } from '../schemas/question';
import { QuestionDoc } from '../schemas/question.schema';
import { BaseRepository } from './base.repository';
import { QuestionConverter } from './converters/question.converter';

@Injectable()
export class QuestionRepository extends BaseRepository<QuestionImplBusiness, QuestionDoc> {
  constructor(
    @InjectModel(SchemaNames.QUESTION) private readonly questionMdl: Model<QuestionDoc>,
    @Inject(ConverterNames.QUESTION) private readonly questionCvtr: QuestionConverter,
  ) {
    super(questionMdl, questionCvtr);
  }

  async findByTag(tag: string): Promise<QuestionImplBusiness[]> {
    const questions: Question[] = await this.questionMdl
      .find({ tags: { $in: [tag] } })
      .lean()
      .exec();

    return questions.map((question) => this.questionCvtr.toDomain(question as any));
  }

  async findAllTags(): Promise<string[]> {
    const [data] = await this.questionMdl.aggregate<{ tags: string[] }>([
      {
        $group: {
          _id: null,
          tags: { $push: '$tags' },
        },
      },
      {
        $project: {
          _id: 0,
          tags: {
            $setUnion: {
              $reduce: {
                input: '$tags',
                initialValue: [],
                in: { $concatArrays: ['$$value', '$$this'] },
              },
            },
          },
        },
      },
    ]);

    return data ? data.tags : [];
  }
}
