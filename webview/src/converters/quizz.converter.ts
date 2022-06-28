import { Quizz } from '@domains/quizz';
import { QuizzApi } from '@api/quizz.api';

export class QuizzConverter {
  public toDomain(args?: Partial<QuizzApi>): Quizz {
    const quizz: Quizz = {
      createdAt: args?.createdAt || 0,
      updatedAt: args?.updatedAt || 0,
      id: args?.id,
      mission: args?.mission,
      questions: args?.questions,
    };

    return new Quizz(quizz);
  }
}
