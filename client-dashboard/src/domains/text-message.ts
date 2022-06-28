import { MessageType } from '@/types/message-type';
import { v4 as uuidv4 } from 'uuid';

export type TextMessageParams = Omit<TextMessage, 'id' | 'type'>;

export class TextMessage {
  readonly type: MessageType.TEXT = MessageType.TEXT;
  readonly id: string;
  text: string;

  constructor(message: TextMessageParams) {
    this.id = uuidv4();
    this.text = message.text;
  }
}
