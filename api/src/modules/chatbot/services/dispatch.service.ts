import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { Action } from '../domains/action';
import { ActionHandlerNotFoundError } from '../errors/action-handler-not-found.error';
import { HANDLER_METADATA_KEY } from '../handler.decorator';
import { ActionDispatcher } from '../types/action-dispatcher';
import { ActionHandler } from '../types/action-handler';
import { MessagingPlatform } from '../types/messaging-platform';

@Injectable()
export class DispatchService implements OnModuleInit, ActionDispatcher {
  private handlers: ActionHandler[] = [];

  constructor(private readonly discoverySvc: DiscoveryService) {}

  onModuleInit(): void {
    this.discoverHandlers();
  }

  public async dispatchAction(action: Action, messagingPlatform: MessagingPlatform): Promise<void> {
    const handler: ActionHandler = this.getHandler(action);
    await handler.handle(action, messagingPlatform);
  }

  public getHandler(action: Action): ActionHandler {
    for (const handler of this.handlers) {
      if (handler.canHandle(action)) {
        return handler;
      }
    }

    throw new ActionHandlerNotFoundError(action.name);
  }

  private discoverHandlers(): void {
    this.handlers = this.discoverySvc
      .getProviders()
      .filter((wrapper) => !!wrapper.metatype && !!Reflect.getMetadata(HANDLER_METADATA_KEY, wrapper.metatype))
      .map((wrapper: InstanceWrapper<ActionHandler>) => wrapper.instance);
  }
}
