import { MessageTypeApi } from '@api/message-type.api';

export interface ImageMessageApi {
  type: MessageTypeApi.IMAGE;
  url: string;
}

export interface QuickReplyChoiceApi {
  text: string;
  score: number;
}

export interface QuickRepliesMessageApi {
  type: MessageTypeApi.QUICK_REPLIES;
  text: string;
  choices: QuickReplyChoiceApi[];
}

export interface TextMessageApi {
  type: MessageTypeApi.TEXT;
  text: string;
}

export type QuestionMessageApi = ImageMessageApi | QuickRepliesMessageApi | TextMessageApi;
