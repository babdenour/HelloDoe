import { QuizzSheetFactory, QuizzSheetImplBusiness, QuizzSheetRepositoryBusiness } from '@business';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConverterNames } from '../constants/converter-names';
import { SchemaNames } from '../constants/schema-names';
import { QuizzSheetDoc } from '../schemas/quizz-sheet.schema';
import { BaseRepository } from './base.repository';
import { QuizzSheetConverter } from './converters/quizz-sheet.converter';

@Injectable()
export class QuizzSheetRepositoryImpl extends BaseRepository<QuizzSheetImplBusiness, QuizzSheetDoc> implements QuizzSheetRepositoryBusiness {
  constructor(@InjectModel(SchemaNames.QUIZZ_SHEET) private readonly quizzShtMdl: Model<QuizzSheetDoc>, @Inject(ConverterNames.QUIZZ_SHEET) quizzShtCvtr: QuizzSheetConverter) {
    super(quizzShtMdl, quizzShtCvtr);
  }

  public async countFavoriteByQuizzId(quizzId: string): Promise<number> {
    const count: number = await this.quizzShtMdl
      .countDocuments({
        quizz: this.toObjectId(quizzId),
        isFavorite: true,
      })
      .exec();

    return count;
  }

  public async findAllByQuizzIdAndIsFavorite(quizzId: string, isFavorite: boolean): Promise<QuizzSheetImplBusiness[]> {
    const sheets: QuizzSheetDoc[] = await this.findAllByQuery({ quizz: this.toObjectId(quizzId), isFavorite });

    return this.convertArray(sheets);
  }

  public async findAllSortedByIsUnlockedDescAndScoreDescGreaterThanWithPagination(quizzId: string, pageIdx: number, pageSize: number): Promise<QuizzSheetImplBusiness[]> {
    const countToSkip: number = pageIdx * pageSize;
    const filteredSheets: QuizzSheetDoc[] = await this.quizzShtMdl
      .find({ quizz: this.toObjectId(quizzId) })
      .sort('-isUnlocked -isFavorite -score completedAt')
      .skip(countToSkip)
      .limit(pageSize)
      .exec();

    return this.convertArray(filteredSheets);
  }

  public async findByQuizzIdAndDoerId(quizzId: string, doerId: string): Promise<QuizzSheetImplBusiness | null> {
    const quizzSheet: QuizzSheetDoc = await this.findByQuery({
      doer: doerId,
      quizz: quizzId,
    });

    return this.convertIfNotNull(quizzSheet);
  }

  public findByDoerIdAndQuizzIdOrCreate = async (doerId: string, quizzId: string): Promise<QuizzSheetImplBusiness> => {
    let quizzSheet: QuizzSheetImplBusiness = await this.findByQuizzIdAndDoerId(quizzId, doerId);
    if (!quizzSheet) {
      const newQuizzSheet: QuizzSheetImplBusiness = QuizzSheetFactory.create({
        doer: doerId,
        quizz: quizzId,
      });
      quizzSheet = await this.save(newQuizzSheet);
    }

    return quizzSheet;
  };

  public async updateAllIsFavoriteByQuizzIdAndDoerIdIn(quizzId: string, doerIds: string[], isFavorite: boolean): Promise<void> {
    await this.quizzShtMdl
      .updateMany(
        {
          quizz: this.toObjectId(quizzId),
          doer: { $in: this.toArrayObjectId(doerIds) },
        },
        {
          $set: {
            isFavorite,
          },
        },
      )
      .exec();
  }

  public async updateAllIsUnlockedByQuizzIdAndDoerIdIn(quizzId: string, doerIds: string[], isUnlocked: boolean): Promise<void> {
    await this.quizzShtMdl
      .updateMany(
        {
          quizz: this.toObjectId(quizzId),
          doer: { $in: this.toArrayObjectId(doerIds) },
        },
        {
          $set: {
            isUnlocked,
          },
        },
      )
      .exec();
  }

  public async updateIsFavoriteByQuizzIdAndDoerId(quizzId: string, doerId: string, isFavorite: boolean): Promise<QuizzSheetImplBusiness> {
    const sheet: QuizzSheetDoc = await this.quizzShtMdl
      .findOneAndUpdate(
        {
          quizz: this.toObjectId(quizzId),
          doer: this.toObjectId(doerId),
        },
        {
          $set: {
            isFavorite,
          },
        },
        { new: true },
      )
      .exec();

    return this.convertIfNotNull(sheet);
  }

  public async updateIsSeenByQuizzIdAndDoerId(quizzId: string, doerId: string, isSeen: boolean): Promise<QuizzSheetImplBusiness> {
    const sheet: QuizzSheetDoc = await this.quizzShtMdl
      .findOneAndUpdate(
        {
          quizz: this.toObjectId(quizzId),
          doer: this.toObjectId(doerId),
        },
        {
          $set: {
            isSeen,
          },
        },
        { new: true },
      )
      .exec();

    return this.convertIfNotNull(sheet);
  }
}
