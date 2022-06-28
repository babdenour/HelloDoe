import { MessagesFactory, QuestionMessageBusiness } from '@business';

import { DialogflowRequest } from '../types/dialogflow-request';
import { DialogflowActionImpl } from './dialogflow-action.impl';

const CONTEXT_0 = 'context0';
const CONTEXT_1 = 'context1';

describe('DialogflowActionImpl', () => {
  let dialogflowAction: DialogflowActionImpl;

  beforeEach(() => {
    const req: DialogflowRequest = {
      session: 'session',
      queryResult: {
        outputContexts: [{ name: CONTEXT_0, parameters: {} }],
        parameters: {},
      },
      originalDetectIntentRequest: {
        payload: {
          data: {
            sender: {},
          },
        },
      },
    } as DialogflowRequest;
    dialogflowAction = new DialogflowActionImpl(req);
  });

  describe('when set context parameter', () => {
    const PARAM_NAME = 'param';
    const PARAM_VALUE = 'value';

    describe('if context exists', () => {
      it('should set parameter', () => {
        dialogflowAction.setContextParameter(CONTEXT_0 as any, PARAM_NAME as any, PARAM_VALUE);

        expect(dialogflowAction.getContexts().length).toBe(1);
        expect(dialogflowAction.getContexts()[0].name).toContain(CONTEXT_0);
        expect(dialogflowAction.getContexts()[0].parameters[PARAM_NAME]).toBe(PARAM_VALUE);
      });
    });

    describe('if context does not exist', () => {
      it('should create context and set parameter', () => {
        dialogflowAction.setContextParameter(CONTEXT_1 as any, PARAM_NAME as any, PARAM_VALUE);

        expect(dialogflowAction.getContexts().length).toBe(2);
        expect(dialogflowAction.getContexts()[1].name).toContain(CONTEXT_1);
        expect(dialogflowAction.getContexts()[1].parameters[PARAM_NAME]).toBe(PARAM_VALUE);
      });
    });
  });

  describe('when set messages', () => {
    const MESSAGES: QuestionMessageBusiness[] = [MessagesFactory.createText()];

    it('should set messages', () => {
      dialogflowAction.setMessages(MESSAGES);

      expect(dialogflowAction.messages).toEqual(MESSAGES);
    });
  });
});
