import { QuestionSheetRepository, QuizzSheetRepository, RepositoryNames } from '@database';
import { Inject, Injectable } from '@nestjs/common';

import { QuestionSheetImpl } from '../domains/quizz/question-sheet.impl';
import { QuizzSheetImpl } from '../domains/quizz/quizz-sheet.impl';

@Injectable()
export class QuizzSheetService {
  constructor(
    @Inject(RepositoryNames.QUESTION_SHEET) private readonly questionSheetRepo: QuestionSheetRepository,
    @Inject(RepositoryNames.QUIZZ_SHEET) private readonly quizzSheetRepo: QuizzSheetRepository,
  ) {}

  public async computeResults(doerId: string, quizzId: string): Promise<QuizzSheetImpl> {
    const quizzSheet: QuizzSheetImpl = await this.quizzSheetRepo.findByDoerIdAndQuizzIdOrCreate(doerId, quizzId);
    const questionSheets: QuestionSheetImpl[] = await this.questionSheetRepo.findAllByDoerIdAndQuizzId(doerId, quizzId);

    const score =
      questionSheets
        .map((sheet: QuestionSheetImpl) => sheet.score)
        .reduce((sum: number, score: number) => sum + score, 0) / questionSheets.length;

    quizzSheet.completedAt = Date.now();
    quizzSheet.questionSheets = questionSheets.map((sheet: QuestionSheetImpl) => sheet.question);
    quizzSheet.score = score;

    const savedQuizzSheet: QuizzSheetImpl = await this.quizzSheetRepo.save(quizzSheet);
    return savedQuizzSheet;
  }
}
