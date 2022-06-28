import { QuestionMessageBusiness } from '@business';
import { last } from 'lodash';

import { ChatbotPlatform } from '../../../constants/chatbot-platforms';
import { FollowupEvents } from '../../../constants/followup-events';
import { Action, ActionContext, ContextName, ParameterName } from '../../../domains/action';
import { DialogflowRequest } from '../types/dialogflow-request';

export class DialogflowActionImpl implements Action {
  public readonly chatbotPlatform: ChatbotPlatform.DIALOGFLOW;
  public readonly name: string;
  public readonly facebookId: string;

  public followupEvent: FollowupEvents;
  public messages: QuestionMessageBusiness[] = [];

  private readonly session: string;
  private contexts: ActionContext[] = [];
  private parameters: { [k: string]: string } = {};

  constructor(req: DialogflowRequest) {
    this.name = req.queryResult.action;
    this.facebookId = req.originalDetectIntentRequest.payload.data.sender.id;
    this.session = req.session;
    this.parameters = req.queryResult.parameters;
    this.contexts = req.queryResult.outputContexts;
  }

  getContexts(): ActionContext[] {
    return this.contexts;
  }

  getContextParameter(contextName: ContextName, param: ParameterName): string | undefined {
    return this.findContextByName(contextName)?.parameters[param];
  }

  getFollowupEvent(): FollowupEvents {
    return this.followupEvent;
  }

  getParameter(param: ParameterName): string | undefined {
    return this.parameters[param];
  }

  setFollowupEvent(followupEvent: FollowupEvents): void {
    this.followupEvent = followupEvent;
  }

  setMessages(messages: QuestionMessageBusiness[]): void {
    this.messages = messages;
  }

  setContextParameter(contextName: ContextName, param: ParameterName, value: string): void {
    let context: ActionContext | undefined = this.findContextByName(contextName);

    if (!context) {
      context = this.createContext(contextName, 1, { [param]: value });
      this.contexts.push(context);
    }

    context.parameters[param] = value;
  }

  private createContext(name: string, lifespanCount: number = 1, parameters: { [key: string]: string } = {}): ActionContext {
    return {
      name: `${this.session}/contexts/${name}`,
      lifespanCount,
      parameters,
    };
  }

  private findContextByName(name: string): ActionContext | undefined {
    return this.contexts.find((ctx) => last(ctx.name.split('/')) === name);
  }
}
