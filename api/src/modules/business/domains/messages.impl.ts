import { Mutable } from '@modules/types';
import { truncate } from 'lodash';

import { ButtonType, MessageType } from '../constants/message-type';
import {
  ButtonPostback,
  ButtonWebUrl,
  CardMessage,
  CarouselMessage,
  ImageMessage,
  MessageButton,
  QuickRepliesMessage,
  QuickReplyChoice,
  TextMessage,
} from './messages';

type ExcludeKeyType<T> = Omit<T, 'type'>;

export class ButtonPostbackImpl implements ButtonPostback {
  type: ButtonType.POSTBACK = ButtonType.POSTBACK;
  title: string;
  payload: string;

  constructor(button: ExcludeKeyType<ButtonPostback>) {
    this.title = button.title;
    this.payload = button.payload;
  }
}

export class ButtonWebUrlImpl implements ButtonWebUrl {
  type: ButtonType.WEB_URL = ButtonType.WEB_URL;
  title: string;
  url: string;

  constructor(button: ExcludeKeyType<ButtonWebUrl>) {
    this.title = button.title;
    this.url = button.url;
  }
}

export class CardMessageImpl implements CardMessage {
  type: MessageType.CARD = MessageType.CARD;
  title: string;
  readonly subtitle: string;
  imageUrl: string;
  buttons: MessageButton[];

  private static readonly SUBTITLE_MAX_LENGTH = 70;

  constructor(card: ExcludeKeyType<CardMessage>) {
    this.title = card.title;
    this.setSubtitle(card.subtitle);
    this.imageUrl = card.imageUrl;
    this.buttons = card.buttons;
  }

  public setSubtitle(subtitle: string): void {
    this.asMutable.subtitle = truncate(subtitle, {
      length: CardMessageImpl.SUBTITLE_MAX_LENGTH,
      separator: '',
    });
  }

  private get asMutable(): Mutable<CardMessageImpl> {
    return this as Mutable<CardMessageImpl>;
  }
}

export class CarouselMessageImpl implements CarouselMessage {
  type: MessageType.CAROUSEL = MessageType.CAROUSEL;
  cards: CardMessage[];

  constructor(carousel: ExcludeKeyType<CarouselMessage>) {
    this.cards = carousel.cards;
  }
}

export class ImageMessageImpl implements ImageMessage {
  type: MessageType.IMAGE = MessageType.IMAGE;
  url: string;

  constructor(image: ExcludeKeyType<ImageMessage>) {
    this.url = image.url;
  }
}

export class QuickRepliesMessageImpl implements QuickRepliesMessage {
  type: MessageType.QUICK_REPLIES = MessageType.QUICK_REPLIES;
  text: string;
  choices: QuickReplyChoice[];

  constructor(quickReplies: ExcludeKeyType<QuickRepliesMessage>) {
    this.text = quickReplies.text;
    this.choices = quickReplies.choices;
  }
}

export class TextMessageImpl implements TextMessage {
  type: MessageType.TEXT = MessageType.TEXT;
  text: string;

  constructor(text: ExcludeKeyType<TextMessage>) {
    this.text = text.text;
  }
}
