import { ButtonType, MessageType } from '../constants/message-type';

export interface TextMessage {
  type: MessageType.TEXT;
  text: string;
}

export interface ImageMessage {
  type: MessageType.IMAGE;
  url: string;
}

export interface QuickReplyChoice {
  text: string;
  postback?: string;
  score: number;
}

export interface QuickRepliesMessage {
  type: MessageType.QUICK_REPLIES;
  text: string;
  choices: QuickReplyChoice[];
}

export interface ButtonPostback {
  type: ButtonType.POSTBACK;
  title: string;
  payload: string;
}

export interface ButtonWebUrl {
  type: ButtonType.WEB_URL;
  title: string;
  url: string;
}

export type MessageButton = ButtonPostback | ButtonWebUrl;

export interface CardMessage {
  type: MessageType.CARD;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttons: MessageButton[];
}

export interface CarouselMessage {
  type: MessageType.CAROUSEL;
  cards: CardMessage[];
}

export type QuestionMessage = CardMessage | CarouselMessage | ImageMessage | QuickRepliesMessage | TextMessage;
