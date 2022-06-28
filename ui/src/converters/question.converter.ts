import { QuestionApi } from '@api/question.api';
import { MessagesConverter } from '@converters/messages.converter';
import { Question } from '@domains/question';

export class QuestionConverter {
  constructor(private readonly messagesConv: MessagesConverter) {}

  public toDomain(questionApi: QuestionApi): Question {
    const question: Question = {
      createdAt: questionApi?.createdAt || 0,
      updatedAt: questionApi?.updatedAt || 0,
      id: questionApi?.id,
      messages: this.messagesConv.maptoDomain(questionApi?.messages || []),
      tags: questionApi?.tags || [],
    };

    return new Question(question);
  }

  public maptoDomain(questionApis: QuestionApi[]): Question[] {
    return questionApis.map((questionApi: QuestionApi) => this.toDomain(questionApi));
  }
}
