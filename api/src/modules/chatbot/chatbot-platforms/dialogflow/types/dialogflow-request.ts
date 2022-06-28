import { MessagingPlatformPayload } from '../../../messaging-platforms';

export interface AgentContext {
  name: string;
  lifespanCount: number;
  parameters: { [key: string]: string };
}

export interface DialogflowRequest {
  responseId: string;
  queryResult: {
    queryText: string;
    action: string;
    parameters: { [key: string]: string };
    outputContexts: AgentContext[];
    allRequiredParamsPresent: boolean;
    fulfillmentMessages: [{ text: { text: string[] }; platform: string }];
    intent: {
      name: string;
      displayName: string;
      isFallback: boolean;
    };
    intentDetectionConfidence: number;
    languageCode: string;
  };
  originalDetectIntentRequest: {
    source: string;
    payload: MessagingPlatformPayload;
  };
  session: string;
}
