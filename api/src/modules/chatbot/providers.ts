import { ProviderFactory } from '@modules/provider.factory';

import { ChatbotConnector } from './chatbot.connector';
import { ConnectorNames } from './constants/connector-names';
import { ServiceNames } from './constants/service-names';
import { DispatchService } from './services/dispatch.service';
import { RequestParser } from './services/request.parser';

export const ChatbotConnectorProviderFactory = ProviderFactory.createFactory(ConnectorNames.CHATBOT, {
  useClass: ChatbotConnector,
});
export const DispatchServiceProviderFactory = ProviderFactory.createFactory(ServiceNames.DISPATCH, {
  useClass: DispatchService,
});
export const RequestParserProviderFactory = ProviderFactory.createFactory(ServiceNames.REQUEST_PARSER, {
  useClass: RequestParser,
});

export const ChatbotConnectorProvider = ChatbotConnectorProviderFactory();
export const DispatchServiceProvider = DispatchServiceProviderFactory();
export const RequestParserProvider = RequestParserProviderFactory();
