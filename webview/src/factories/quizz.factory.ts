import { Quizz } from '@domains/quizz';

export class QuizzFactory {
  public static create(args?: Partial<Quizz>): Quizz {
    const quizz: Quizz = {
      createdAt: args?.createdAt || 0,
      updatedAt: args?.updatedAt || 0,
      id: args?.id,
      mission: args?.mission,
      questions: args?.questions || [],
    };

    return new Quizz(quizz);
  }
}
