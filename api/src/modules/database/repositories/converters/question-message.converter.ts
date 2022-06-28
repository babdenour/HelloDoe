import { MessagesFactory, MessageType, QuestionMessageBusiness } from '@business';
import { Injectable } from '@nestjs/common';

import { QuestionMessage } from '../../schemas/question';
import { ConverterUtils } from './converter-utils';
import { Converter } from './types';

@Injectable()
export class QuestionMessageConverter implements Converter<QuestionMessageBusiness, QuestionMessage> {
  public toDocument = (messageBusiness: QuestionMessageBusiness): QuestionMessage => {
    const type = messageBusiness.type;
    switch (messageBusiness.type) {
      case MessageType.TEXT:
        return {
          kind: MessageType.TEXT,
          text: messageBusiness.text,
        };
      case MessageType.IMAGE:
        return {
          kind: MessageType.IMAGE,
          url: messageBusiness.url,
        };
      case MessageType.QUICK_REPLIES:
        return {
          kind: MessageType.QUICK_REPLIES,
          text: messageBusiness.text,
          choices: messageBusiness.choices,
        };
      default:
        throw new Error(`could not convert message of type ${type}`);
    }
  };

  public toDomain = (message: QuestionMessage): QuestionMessageBusiness => {
    const kind = message.kind;
    switch (message.kind) {
      case MessageType.TEXT:
        return MessagesFactory.createText({ text: message.text });
      case MessageType.IMAGE:
        return MessagesFactory.createImage({ url: message.url });
      case MessageType.QUICK_REPLIES:
        return MessagesFactory.createQuickReplies({
          text: message.text,
          choices: ConverterUtils.toArray(message.choices),
        });
      default:
        throw new Error(`could not convert message of kind ${kind}`);
    }
  };
}
