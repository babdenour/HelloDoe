import { Question } from '@domains/question';

export class QuestionFactory {
  public static create(args?: Partial<Question>): Question {
    const question: Question = {
      createdAt: args?.createdAt || 0,
      updatedAt: args?.updatedAt || 0,
      id: args?.id,
      messages: args?.messages || [],
      tags: args?.tags || [],
      type: args?.type,
    };

    return new Question(question);
  }
}
