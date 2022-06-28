import { MessageType } from '@business';
import { Types } from 'mongoose';

export interface TextMessage {
  kind: MessageType.TEXT;
  text: string;
}

export interface ImageMessage {
  kind: MessageType.IMAGE;
  url: string;
}

export interface QuickReplyChoice {
  text: string;
  postback?: string;
  score: number;
}

export interface QuickRepliesMessage {
  kind: MessageType.QUICK_REPLIES;
  text: string;
  choices: QuickReplyChoice[];
}

export type QuestionMessage = TextMessage | ImageMessage | QuickRepliesMessage;

export interface Question {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  messages: QuestionMessage[];
  tags: string[];
}
