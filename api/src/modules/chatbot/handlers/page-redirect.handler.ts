import { Injectable } from '@nestjs/common';

import { ActionNames } from '../constants/action-names';
import { FollowupEvents } from '../constants/followup-events';
import { ParameterName } from '../domains/action';
import { Action } from '../domains/action';
import { HandlerDecorator } from '../handler.decorator';
import { ActionHandler } from '../types/action-handler';
import { MessagingPlatform } from '../types/messaging-platform';

interface ExtractedParams {
  redirectIntent: string;
}

@Injectable()
@HandlerDecorator()
export class PageRedirectHandler implements ActionHandler {
  public canHandle(action: Action): boolean {
    return action.name === ActionNames.PAGE_REDIRECT;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async handle(action: Action, messagingPlatform: MessagingPlatform): Promise<void> {
    const { redirectIntent } = this.extractParams(action, messagingPlatform);

    if (redirectIntent) {
      action.followupEvent = redirectIntent as FollowupEvents;
    } else {
      action.followupEvent = FollowupEvents.FALLBACK;
    }
  }

  private extractParams(action: Action, messagingPlatform: MessagingPlatform): ExtractedParams {
    const pageId = messagingPlatform.getPageId();
    const redirectIntent = action.getParameter(this.buildPageIdParamKey(pageId) as ParameterName);

    return { redirectIntent };
  }

  private buildPageIdParamKey(pageId: string): string {
    return `pageId-${pageId}`;
  }
}
