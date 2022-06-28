import { QuestionMessageBusiness } from '@business';
import { FollowupEvents } from '@chatbot/constants/followup-events';
import { Action } from '@chatbot/domains/action';

export class ActionTestImpl implements Partial<Action> {
  parameters: { [k: string]: string } = {};
  messages: QuestionMessageBusiness[];
  emittedEvent: string;

  constructor(parameters: { [k: string]: string }) {
    this.parameters = parameters;
  }

  getFollowupEvent(): FollowupEvents {
    return this.emittedEvent as FollowupEvents;
  }

  getParameter(paramName: string): string {
    return this.parameters[paramName];
  }

  setFollowupEvent(event: string): void {
    this.emittedEvent = event;
  }

  setMessages(messages: QuestionMessageBusiness[]): void {
    this.messages = messages;
  }
}
