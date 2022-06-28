import {
  ButtonPostback,
  ButtonWebUrl,
  CardMessage,
  CarouselMessage,
  ImageMessage,
  QuickRepliesMessage,
  QuickReplyChoice,
  TextMessage,
} from '../domains/messages';
import {
  ButtonPostbackImpl,
  ButtonWebUrlImpl,
  CardMessageImpl,
  CarouselMessageImpl,
  ImageMessageImpl,
  QuickRepliesMessageImpl,
  TextMessageImpl,
} from '../domains/messages.impl';

type ExcludeKeyType<T> = Omit<T, 'type'>;

export class MessagesFactory {
  static createButtonPostback(args?: Partial<ExcludeKeyType<ButtonPostback>>): ButtonPostbackImpl {
    const card: ExcludeKeyType<ButtonPostback> = {
      title: args?.title,
      payload: args?.payload,
    };
    return new ButtonPostbackImpl(card);
  }

  static createButtonWebUrl(args?: Partial<ExcludeKeyType<ButtonWebUrl>>): ButtonWebUrlImpl {
    const card: ExcludeKeyType<ButtonWebUrl> = {
      title: args?.title,
      url: args?.url,
    };
    return new ButtonWebUrlImpl(card);
  }

  static createCard(args?: Partial<ExcludeKeyType<CardMessage>>): CardMessageImpl {
    const card: ExcludeKeyType<CardMessage> = {
      title: args?.title,
      subtitle: args?.subtitle,
      imageUrl: args?.imageUrl,
      buttons: args?.buttons,
    };
    return new CardMessageImpl(card);
  }

  static createCarousel(args?: Partial<ExcludeKeyType<CarouselMessage>>): CarouselMessageImpl {
    const carousel: ExcludeKeyType<CarouselMessage> = {
      cards: args?.cards,
    };
    return new CarouselMessageImpl(carousel);
  }

  static createImage(args?: Partial<ExcludeKeyType<ImageMessage>>): ImageMessageImpl {
    const image: ExcludeKeyType<ImageMessage> = {
      url: args?.url ?? '',
    };
    return new ImageMessageImpl(image);
  }

  static createQuickReplies(args?: Partial<ExcludeKeyType<QuickRepliesMessage>>): QuickRepliesMessageImpl {
    const quickReplies: ExcludeKeyType<QuickRepliesMessage> = {
      text: args?.text,
      choices: (args?.choices || []).map((choice) => this.createQuickRepliesChoice(choice)),
    };
    return new QuickRepliesMessageImpl(quickReplies);
  }

  static createQuickRepliesChoice(args?: Partial<QuickReplyChoice>): QuickReplyChoice {
    return {
      text: args?.text || '',
      postback: args?.postback,
      score: args?.score,
    };
  }

  static createText(args?: Partial<ExcludeKeyType<TextMessage>>): TextMessageImpl {
    const text: ExcludeKeyType<TextMessage> = {
      text: args?.text,
    };
    return new TextMessageImpl(text);
  }
}
