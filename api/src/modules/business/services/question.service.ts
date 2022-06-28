import {
  InjectQuestionRepository,
  InjectQuestionSheetRepository,
  InjectQuizzRepository,
  QuestionRepository,
  QuestionSheetRepository,
  QuizzRepository,
} from '@database';
import { Injectable } from '@nestjs/common';

import { QuestionSheetImpl } from '../domains/quizz/question-sheet.impl';
import { QuestionImpl } from '../domains/quizz/question.impl';

@Injectable()
export class QuestionService {
  constructor(
    @InjectQuestionRepository private readonly questionRepo: QuestionRepository,
    @InjectQuestionSheetRepository private readonly questionSheetRepo: QuestionSheetRepository,
    @InjectQuizzRepository private readonly quizzRepo: QuizzRepository,
  ) {}

  public async doesQuestionExistById(id: string): Promise<boolean> {
    const question = await this.questionRepo.findById(id);
    return question != null;
  }

  public async getUnansweredQuestions(doerId: string, quizzId: string): Promise<QuestionImpl[]> {
    const { questions } = await this.quizzRepo.findByIdWithQuestions(quizzId);
    const sheets: QuestionSheetImpl[] = await this.questionSheetRepo.findAllByDoerIdAndQuizzId(doerId, quizzId);

    const sheetsMap: Map<string, QuestionSheetImpl> = sheets.reduce(
      (acc: Map<string, QuestionSheetImpl>, sheet: QuestionSheetImpl) => {
        acc.set(sheet.question, sheet);
        return acc;
      },
      new Map<string, QuestionSheetImpl>(),
    );
    const questionleftList: QuestionImpl[] = questions.filter((question: QuestionImpl) => !sheetsMap.has(question.id));

    return questionleftList;
  }
}
