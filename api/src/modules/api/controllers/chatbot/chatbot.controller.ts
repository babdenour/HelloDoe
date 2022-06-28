import { AuthGuard, AuthRole, AuthRoleDecorator } from '@api/auth';
import { InjectChatbotConnector } from '@chatbot';
import { Connector } from '@chatbot';
import { Body, Controller, Post, Res, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';

// TODO: Move annotations to global app instances
@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@UseGuards(AuthGuard)
@Controller({ path: 'webhook/chatbot' })
export class ChatbotController {
  constructor(@InjectChatbotConnector private readonly chatbotConnector: Connector) {}

  @Post()
  @AuthRoleDecorator(AuthRole.CHATBOT)
  async handleAction(@Body() body: Request, @Res() response: Response): Promise<Response> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const res = await this.chatbotConnector.handleRequest(body);
    return response.status(200).send(res);
  }
}
