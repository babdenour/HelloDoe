import { BusinessError, BusinessErrorCode } from '@business';
import { Injectable } from '@nestjs/common';

import { ActionNames } from '../constants/action-names';
import { FollowupEvents } from '../constants/followup-events';
import { Action } from '../domains/action';
import { HandlerDecorator } from '../handler.decorator';
import { ActionHandler } from '../types/action-handler';

interface ExtractedParams {
  eventName: string;
}

@Injectable()
@HandlerDecorator()
export class IntentRedirectHandler implements ActionHandler {
  public canHandle(action: Action): boolean {
    return action.name === ActionNames.INTENT_REDIRECT;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async handle(action: Action): Promise<void> {
    const { eventName } = this.extractParams(action);

    action.setFollowupEvent(eventName as FollowupEvents);
  }

  private extractParams(action: Action): ExtractedParams {
    const eventName = action.getParameter('eventName');

    if (!eventName) {
      throw new BusinessError(BusinessErrorCode.H01000_MISSING_PARAM, { param: 'eventName' });
    }

    return { eventName };
  }
}
