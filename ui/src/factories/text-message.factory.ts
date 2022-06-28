import { TextMessage, TextMessageParams } from '@domains/text-message';

export class TextMessageFactory {
  public static create(args?: Partial<TextMessageParams>): TextMessage {
    const textMessage: TextMessageParams = {
      text: args?.text || '',
    };

    return new TextMessage(textMessage);
  }
}
