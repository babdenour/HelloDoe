import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Request } from 'express';

import { DialogflowActionConverter } from '../chatbot-platforms/dialogflow/converters/dialogflow-action.converter';
import { DialogflowRequest } from '../chatbot-platforms/dialogflow/types/dialogflow-request';
import { ActionConverterNotFoundError } from '../errors/action-converter-not-found.error';
import { MessagingPlatformPayload } from '../messaging-platforms';
import { FacebookMessenger } from '../messaging-platforms/facebook-messenger/facebook-messenger';
import { ActionConverter } from '../types/action-converter';
import { MessagingPlatform } from '../types/messaging-platform';

@Injectable()
export class RequestParser {
  constructor(private readonly moduleRef: ModuleRef) {}

  public async parseRequestBody(
    requestBody: Request['body'],
  ): Promise<{ actionConverter: ActionConverter; messagingPlatform: MessagingPlatform }> {
    const actionConverter: ActionConverter = this.getActionConverter(requestBody);
    const messagingPlatform: MessagingPlatform = await this.getMessagingPlatform(requestBody);

    return { actionConverter, messagingPlatform };
  }

  private getActionConverter(requestBody: Request['body']): ActionConverter {
    if (this.isDialogflow(requestBody)) {
      return new DialogflowActionConverter();
    }

    throw new ActionConverterNotFoundError(JSON.stringify(requestBody));
  }

  private async getMessagingPlatform(requestBody: Request['body']): Promise<MessagingPlatform> {
    const messagingPayload = this.getMessagingPlatformPayload(requestBody);

    if (this.isFacebook(messagingPayload)) {
      const platform: FacebookMessenger = await this.moduleRef.create(FacebookMessenger);
      await platform.init(messagingPayload);
      return platform;
    }

    throw new Error(`Could not find messaging platform for ${JSON.stringify(requestBody)}`);
  }

  private getMessagingPlatformPayload(requestBody: Request['body']): MessagingPlatformPayload {
    if (this.isDialogflow(requestBody)) {
      return (requestBody as DialogflowRequest).originalDetectIntentRequest.payload;
    }

    throw new Error(`Could not find messaging platform payload for ${JSON.stringify(requestBody)}`);
  }

  private isDialogflow(requestBody: Request['body']): boolean {
    return !!requestBody.responseId && !!requestBody.queryResult && !!requestBody.originalDetectIntentRequest;
  }

  private isFacebook(payload: MessagingPlatformPayload): boolean {
    return !!payload?.data?.sender?.id && !!payload?.data?.recipient?.id;
  }
}
