import { QuestionMessage } from '@/types/question-message';
import { MessageTypeApi } from '@api/message-type.api';
import { QuestionMessageApi } from '@api/messages.api';
import { ImageMessageFactory } from '@factories/image-message.factory';
import { QuickRepliesMessageFactory } from '@factories/quick-replies-message.factory';
import { TextMessageFactory } from '@factories/text-message.factory';

export class MessagesConverter {
  public toDomain(messageApi: QuestionMessageApi): QuestionMessage {
    const type = messageApi.type;
    if (messageApi.type === MessageTypeApi.IMAGE) {
      return ImageMessageFactory.create(messageApi);
    } else if (messageApi.type === MessageTypeApi.QUICK_REPLIES) {
      return QuickRepliesMessageFactory.create(messageApi);
    } else if (messageApi.type === MessageTypeApi.TEXT) {
      return TextMessageFactory.create(messageApi);
    }

    throw new Error(`Message api type ${type} not handled`);
  }

  public maptoDomain(messageApis: QuestionMessageApi[]): QuestionMessage[] {
    return messageApis.map((messageApi: QuestionMessageApi) => this.toDomain(messageApi));
  }
}
