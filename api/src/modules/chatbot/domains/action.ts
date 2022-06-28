import { QuestionMessageBusiness } from '@business';

import { ChatbotPlatform } from '../constants/chatbot-platforms';
import { FollowupEvents } from '../constants/followup-events';

export type ContextName = 'quizz';
export type ParameterName = 'answer' | 'attribute' | 'eventName' | 'firstQuestion' | 'missionCode' | 'missionId' | 'questionId' | 'value';

export interface ActionContext {
  name: string;
  lifespanCount: number;
  parameters: { [key: string]: string };
}

export interface Action {
  chatbotPlatform: ChatbotPlatform;
  name: string;
  facebookId: string;
  followupEvent: FollowupEvents;
  messages: QuestionMessageBusiness[];

  getContexts: () => ActionContext[];
  getContextParameter: (contextName: ContextName, param: ParameterName) => string | undefined;
  getFollowupEvent: () => FollowupEvents;
  getParameter: (param: ParameterName) => string | undefined;

  setContextParameter: (contextName: ContextName, param: ParameterName, value: string) => void;
  setFollowupEvent: (followupEvent: FollowupEvents) => void;
  setMessages: (messages: QuestionMessageBusiness[]) => void;
}
