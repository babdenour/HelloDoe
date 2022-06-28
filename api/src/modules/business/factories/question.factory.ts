import { Question } from '../domains/quizz/question';
import { QuestionImpl } from '../domains/quizz/question.impl';

export class QuestionFactory {
  static create(args?: Partial<Question>): QuestionImpl {
    const now = Date.now();
    const quizz: Question = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id,
      messages: args?.messages || [],
      tags: args?.tags || [],
    };

    return new QuestionImpl(quizz);
  }
}
