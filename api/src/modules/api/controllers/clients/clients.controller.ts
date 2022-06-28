import { AuthGuard, AuthRole, AuthRoleDecorator } from '@api/auth';
import { ClientRepository, InjectClientRepository } from '@database';
import { Controller, Get, UseFilters, UseGuards, UsePipes } from '@nestjs/common';

import { ClientAdapter } from '../../adapters/client.adapter';
import { ClientDto } from '../../dtos/client.dto';
import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';

// TODO: Move annotations to global app instances
@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@UseGuards(AuthGuard)
@Controller({ path: 'api/clients' })
export class ClientsController {
  constructor(@InjectClientRepository private clientRepository: ClientRepository) {}

  @Get()
  @AuthRoleDecorator(AuthRole.ADMIN)
  async getAllClients(): Promise<ClientDto[]> {
    const clients = await this.clientRepository.findAll();
    return clients.map(ClientAdapter.toApi);
  }
}
