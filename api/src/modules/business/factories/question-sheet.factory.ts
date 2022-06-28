import { QuestionSheet } from '../domains/quizz/question-sheet';
import { QuestionSheetImpl } from '../domains/quizz/question-sheet.impl';

export class QuestionSheetFactory {
  static create(args?: Partial<QuestionSheet>): QuestionSheetImpl {
    const now = Date.now();
    const questionSheet: QuestionSheet = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id,
      question: args?.question,
      doer: args?.doer,
      quizz: args?.quizz,
      answer: args?.answer,
      score: args?.score,
    };

    return new QuestionSheetImpl(questionSheet);
  }
}
