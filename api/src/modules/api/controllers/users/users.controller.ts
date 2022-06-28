import { ClientBusinessImpl, MissionBusinessImpl } from '@business';
import { ClientRepository, InjectClientRepository, InjectMissionRepository, MissionRepository } from '@database';
import { Body, Post, UnauthorizedException, UseFilters, UsePipes } from '@nestjs/common';
import { InjectTokenService, TokenService } from '@token';

import { TokenDto } from '../../dtos/token.dto';
import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiResponse } from '../api-response';
import { ApiController } from '../decorators/api-controller.decorator';
import { ApiSuccessResponse } from '../responses/api-success.response';
import { AuthClientParams } from './params/auth-client.params';

// TODO: Move annotations to global app instances
@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@ApiController('users', 2)
export class UsersController {
  constructor(
    @InjectClientRepository private readonly clientRepo: ClientRepository,
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
    @InjectTokenService private readonly tokenSvc: TokenService,
  ) {}

  @Post('/client/auth')
  async loginClient(@Body() authClientParams: AuthClientParams): Promise<ApiResponse<TokenDto>> {
    const mission: MissionBusinessImpl = await this.missionRepo.findByCode(authClientParams.missionCode);
    const client: ClientBusinessImpl = await this.clientRepo.findByEmail(authClientParams.email);

    if (!mission || !client || mission.client !== client.id) {
      throw new UnauthorizedException();
    }

    const clientToken: string = this.tokenSvc.generateClientToken(client.id);

    const tokenDto = new TokenDto(clientToken);
    return new ApiSuccessResponse(tokenDto);
  }
}
