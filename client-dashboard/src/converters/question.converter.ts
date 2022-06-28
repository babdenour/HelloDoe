import { QuestionApi, QuestionTypeApi } from '@api/question.api';
import { MessagesConverter } from '@converters/messages.converter';
import { Question, QuestionType } from '@domains/question';

export class QuestionConverter {
  constructor(private readonly messagesConv: MessagesConverter) {}

  public toDomain(questionApi: QuestionApi): Question {
    const question: Question = {
      createdAt: questionApi?.createdAt || 0,
      updatedAt: questionApi?.updatedAt || 0,
      id: questionApi?.id,
      messages: this.messagesConv.maptoDomain(questionApi?.messages || []),
      tags: questionApi?.tags || [],
      type: this.typeToDomain(questionApi?.type),
    };

    return new Question(question);
  }

  public maptoDomain(questionApis: QuestionApi[]): Question[] {
    return questionApis.map((questionApi: QuestionApi) => this.toDomain(questionApi));
  }

  public typeToDomain(typeApi: QuestionTypeApi): QuestionType {
    const type: QuestionType = QuestionType[typeApi];

    if (!type) {
      throw new Error(`Unhandled question type api ${typeApi}`);
    }

    return type;
  }

  public typeToApi(type: QuestionType): QuestionTypeApi {
    const typeApi: QuestionTypeApi = QuestionTypeApi[type];

    if (!typeApi) {
      throw new Error(`Unhandled question type ${type}`);
    }

    return typeApi;
  }
}
