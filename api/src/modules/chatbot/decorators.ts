import { Inject } from '@nestjs/common';

import { ConnectorNames } from './constants/connector-names';
import { ServiceNames } from './constants/service-names';

export const InjectChatbotConnector = Inject(ConnectorNames.CHATBOT);
export const InjectDispatchService = Inject(ServiceNames.DISPATCH);
export const InjectRequestParser = Inject(ServiceNames.REQUEST_PARSER);
