import { AuthGuard, AuthRole, AuthRoleDecorator } from '@api/auth';
import { AgencyRepositoryBusiness } from '@business';
import { InjectAgencyRepository } from '@database';
import { Get, UseFilters, UseGuards, UsePipes } from '@nestjs/common';

import { AgencyAdapter } from '../../adapters/agency.adapter';
import { AgencyDto } from '../../dtos/agency.dto';
import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiResponse } from '../api-response';
import { ApiController } from '../decorators/api-controller.decorator';
import { GetResourceResponse } from '../responses/get-resource.response';

// TODO: Move annotations to global app instances
@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@UseGuards(AuthGuard)
@ApiController('agencies', 2)
export class AgenciesController {
  constructor(@InjectAgencyRepository private agencyRepo: AgencyRepositoryBusiness) {}

  @Get()
  @AuthRoleDecorator(AuthRole.ADMIN)
  async getAllAgencies(): Promise<ApiResponse<AgencyDto[]>> {
    const agencies = await this.agencyRepo.findAll();
    return new GetResourceResponse(agencies.map(AgencyAdapter.toApi));
  }
}
