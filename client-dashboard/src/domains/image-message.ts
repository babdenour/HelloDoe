import { MessageType } from '@/types/message-type';
import { v4 as uuidv4 } from 'uuid';

export type ImageMessageParams = Omit<ImageMessage, 'id' | 'type'>;

export class ImageMessage {
  readonly type: MessageType.IMAGE = MessageType.IMAGE;
  readonly id: string;
  url: string;

  constructor(message: ImageMessageParams) {
    this.id = uuidv4();
    this.url = message.url;
  }
}
