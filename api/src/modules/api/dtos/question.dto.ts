import { MessageType } from '@business';

export interface ImageMessage {
  type: MessageType.IMAGE;
  url: string;
}

export interface QuickReplyChoice {
  text: string;
  score: number;
}

export interface QuickRepliesMessage {
  type: MessageType.QUICK_REPLIES;
  text: string;
  choices: QuickReplyChoice[];
}

export interface TextMessage {
  type: MessageType.TEXT;
  text: string;
}

export type QuestionMessage = ImageMessage | QuickRepliesMessage | TextMessage;

export class QuestionDto {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  readonly messages: QuestionMessage[];
  readonly tags: string[];

  constructor(question: QuestionDto) {
    this.createdAt = question.createdAt;
    this.updatedAt = question.updatedAt;
    this.id = question.id;
    this.messages = question.messages;
    this.tags = question.tags;
  }
}
