import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { InjectDispatchService, InjectRequestParser } from './decorators';
import { Action } from './domains/action';
import { RequestParser } from './services/request.parser';
import { ActionDispatcher } from './types/action-dispatcher';
import { Connector } from './types/connector';

@Injectable()
export class ChatbotConnector implements Connector {
  constructor(
    @InjectDispatchService private readonly dispatchService: ActionDispatcher,
    @InjectRequestParser private readonly requestParser: RequestParser,
  ) {}

  public async handleRequest(requestBody: Request['body']): Promise<Request['body']> {
    const { actionConverter, messagingPlatform } = await this.requestParser.parseRequestBody(requestBody);
    const action: Action = actionConverter.fromApi(requestBody);
    await this.dispatchService.dispatchAction(action, messagingPlatform);
    return actionConverter.toApi(action) as Promise<Request['body']>;
  }
}
