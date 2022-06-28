import {
  ButtonPostbackImplBusiness,
  ButtonWebUrlImplBusiness,
  CardMessageImplBusiness,
  CarouselMessageImplBusiness,
  ImageMessageImplBusiness,
  MessageButtonBusiness,
  MessageType,
  QuestionMessageBusiness,
  TextMessageImplBusiness,
} from '@business';
import { Action } from '@chatbot/domains/action';
import { ActionConverter } from '@chatbot/types/action-converter';
import { Request } from 'express';

import { DialogflowActionImpl } from '../domains/dialogflow-action.impl';
import { DialogflowRequest } from '../types/dialogflow-request';
import {
  ButtonType,
  DialogflowResponse,
  FollowupEventInput,
  FulfillmentMessages,
  OutputContext,
} from '../types/dialogflow-response';

export class DialogflowActionConverter implements ActionConverter {
  public canConvert(requestBody: Request['body']): boolean {
    return !!requestBody.responseId && !!requestBody.queryResult && !!requestBody.originalDetectIntentRequest;
  }

  public fromApi(requestBody: Request['body']): Action {
    return new DialogflowActionImpl((requestBody as unknown) as DialogflowRequest);
  }

  public toApi(action: Action): DialogflowResponse {
    return {
      ...this.followupEventToApi(action),
      ...this.outputContextsToApi(action),
      ...this.messagesToApi(action),
    };
  }

  private followupEventToApi(action: Action): { followupEventInput?: FollowupEventInput } {
    return action.followupEvent
      ? {
          followupEventInput: {
            name: action.followupEvent,
          },
        }
      : {};
  }

  private outputContextsToApi(action: Action): { outputContexts?: OutputContext[] } {
    return {
      outputContexts: action.getContexts(),
    };
  }

  private messagesToApi(action: Action): { fulfillmentMessages?: FulfillmentMessages[] } {
    return action.messages.length > 0
      ? {
          fulfillmentMessages: action.messages.map((message) => this.messageToApi(message)),
        }
      : {};
  }

  private messageToApi(message: QuestionMessageBusiness): FulfillmentMessages {
    const type = message.type;
    if (message instanceof ImageMessageImplBusiness) {
      return {
        payload: {
          facebook: {
            attachment: {
              type: 'image',
              payload: {
                url: message.url,
                is_reusable: true,
              },
            },
          },
        },
      };
    } else if (message.type === MessageType.QUICK_REPLIES) {
      return {
        payload: {
          facebook: {
            text: message.text,
            quick_replies: message.choices.map((choice) => ({
              content_type: 'text',
              title: choice.text,
              payload: choice.postback || choice.text,
            })),
          },
        },
      };
    } else if (message instanceof CarouselMessageImplBusiness) {
      return {
        payload: {
          facebook: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'generic',
                elements: message.cards.map((card: CardMessageImplBusiness) => ({
                  title: card.title,
                  subtitle: card.subtitle,
                  image_url: card.imageUrl,
                  buttons: card.buttons.map((button: MessageButtonBusiness) => this.buttonToApi(button)),
                })),
              },
            },
          },
        },
      };
    } else if (message instanceof TextMessageImplBusiness) {
      return {
        payload: {
          facebook: {
            text: message.text,
          },
        },
      };
    }

    throw new Error(`message type '${type}' not handled`);
  }

  private buttonToApi(button: MessageButtonBusiness): ButtonType {
    if (button instanceof ButtonPostbackImplBusiness) {
      return {
        type: 'postback',
        title: button.title,
        payload: button.payload,
      };
    } else if (button instanceof ButtonWebUrlImplBusiness) {
      return {
        type: 'web_url',
        title: button.title,
        url: button.url,
      };
    }

    throw new Error(`button type '${button.type}' not handled`);
  }
}
