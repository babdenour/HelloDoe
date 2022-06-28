import { MessageType, QuestionImplBusiness, QuestionMessageBusiness } from '@business';

import { QuestionDto, QuestionMessage } from '../dtos/question.dto';

export class QuestionAdapter {
  public static toApi = (question: QuestionImplBusiness): QuestionDto => {
    return new QuestionDto({
      createdAt: question?.createdAt,
      updatedAt: question?.updatedAt,
      id: question?.id,
      messages: QuestionAdapter.filterMessages(question?.messages),
      tags: question?.tags,
    });
  };

  private static filterMessages(messages?: QuestionMessageBusiness[]): QuestionMessage[] {
    return (messages || []).filter(
      (message: QuestionMessageBusiness) =>
        message.type === MessageType.IMAGE ||
        message.type === MessageType.QUICK_REPLIES ||
        message.type === MessageType.TEXT,
    ) as QuestionMessage[];
  }
}
