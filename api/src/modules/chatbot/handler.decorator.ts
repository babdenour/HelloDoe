import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const HANDLER_METADATA_KEY = 'CHATBOT_HANDLER';

export const HandlerDecorator = (): CustomDecorator => SetMetadata(HANDLER_METADATA_KEY, true);
