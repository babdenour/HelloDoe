import { Quizz } from '../domains/quizz/quizz';
import { QuizzImpl } from '../domains/quizz/quizz.impl';

export class QuizzFactory {
  static create(args?: Partial<Quizz>): QuizzImpl {
    const now = Date.now();
    const quizz: Quizz = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id,
      mission: args?.mission,
      questions: args?.questions || [],
    };

    return new QuizzImpl(quizz);
  }
}
