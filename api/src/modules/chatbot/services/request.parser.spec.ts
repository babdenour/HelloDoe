import { I18nModule } from '@i18n';
import { Class } from '@modules/types';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';

import { DialogflowActionConverter } from '../chatbot-platforms/dialogflow/converters/dialogflow-action.converter';
import { ChatbotModule } from '../chatbot.module';
import { ServiceNames } from '../constants/service-names';
import { ActionConverterNotFoundError } from '../errors/action-converter-not-found.error';
import { RequestParser } from './request.parser';

interface ActionConverterDatum {
  class: Class;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody: any;
}

const actionConverterData: ActionConverterDatum[] = [
  {
    class: DialogflowActionConverter,
    requestBody: {
      responseId: '1',
      queryResult: {},
      originalDetectIntentRequest: {},
    },
  },
];

describe('RequestParser', () => {
  let requestParser: RequestParser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatbotModule, I18nModule],
    }).compile();

    requestParser = module.get<RequestParser>(ServiceNames.REQUEST_PARSER);
  });

  actionConverterData.map((datum: ActionConverterDatum) => {
    return describe(`when get a action converter for ${datum.class.name}`, () => {
      beforeEach(() => {
        (requestParser as any).getMessagingPlatform = jest.fn();
      });

      it('should get the right action converter', async () => {
        const { actionConverter } = await requestParser.parseRequestBody(datum.requestBody);

        expect(actionConverter instanceof datum.class).toBe(true);
      });
    });
  });

  describe(`when cant find action converter`, () => {
    it(`should throw ActionConverterNotFoundError`, async () => {
      const unhandledRequest: Request['body'] = {};

      await expect(requestParser.parseRequestBody(unhandledRequest)).rejects.toThrow(ActionConverterNotFoundError);
    });
  });
});
