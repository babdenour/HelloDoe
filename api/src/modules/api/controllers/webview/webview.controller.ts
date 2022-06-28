import { MissionBusinessImpl } from '@business';
import { InjectMissionRepository, MissionRepository } from '@database';
import { BadRequestException, Get, NotFoundException, Param, UseFilters, UsePipes } from '@nestjs/common';

import { MissionAdapter } from '../../adapters/mission.adapter';
import { MissionDto } from '../../dtos/mission.dto';
import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiResponse } from '../api-response';
import { ApiController } from '../decorators/api-controller.decorator';
import { GetResourceResponse } from '../responses/get-resource.response';

@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@ApiController('webview', 2)
export class WebviewController {
  constructor(@InjectMissionRepository private readonly missionRepo: MissionRepository) {}

  @Get('missions/:id')
  async getMissionById(@Param('id') missionId: string): Promise<ApiResponse<MissionDto>> {
    let mission: MissionBusinessImpl;
    try {
      mission = await this.missionRepo.findById(missionId);
    } catch (ex) {
      throw new BadRequestException();
    }

    if (!mission) {
      throw new NotFoundException();
    }

    return new GetResourceResponse(MissionAdapter.toApi(mission));
  }
}
