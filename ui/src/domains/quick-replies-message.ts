import { MessageType } from '@/types/message-type';
import { v4 as uuidv4 } from 'uuid';

export interface QuickRepliesChoice {
  text: string;
  score: number;
}

export type QuickRepliesMessageParams = Omit<QuickRepliesMessage, 'id' | 'type'>;

export class QuickRepliesMessage {
  readonly type: MessageType.QUICK_REPLIES = MessageType.QUICK_REPLIES;
  readonly id: string;
  text: string;
  choices: QuickRepliesChoice[];

  constructor(message: QuickRepliesMessageParams) {
    this.id = uuidv4();
    this.text = message.text;
    this.choices = message.choices;
  }
}
