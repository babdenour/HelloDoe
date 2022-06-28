import { AccessControlService, InjectAccessControlService } from '@api/access-control';
import { AuthGuard, AuthRole, AuthRoleDecorator, UserAuthInfoDecorator } from '@api/auth';
import {
  CandidateService,
  InjectCandidateService,
  InjectMissionSetFavoriteDoerUseCase,
  InjectMissionSetSeenCandidateUseCase,
  MissionSetFavoriteDoerUseCase,
  MissionSetSeenCandidateUseCase,
} from '@business';
import { Body, DefaultValuePipe, Get, Param, Post, Query, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { UserInfo } from '@token';

import { CandidateAdapter } from '../../adapters/candidate.adapter';
import { CandidateDto } from '../../dtos/candidate.dto';
import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiResponse } from '../api-response';
import { ApiController } from '../decorators/api-controller.decorator';
import { ApiSuccessResponse } from '../responses/api-success.response';
import { PaginationResponse } from '../responses/pagination.response';
import { SetCandidateFavoriteParams } from './params/set-candidate-favorite.params';

// TODO: Move annotations to global app instances
@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@UseGuards(AuthGuard)
@ApiController('candidates', 2)
export class CandidatesController {
  constructor(
    @InjectAccessControlService private readonly ac: AccessControlService,
    @InjectCandidateService private readonly candidateSvc: CandidateService,
    @InjectMissionSetFavoriteDoerUseCase private readonly missionSetFavDoerUsc: MissionSetFavoriteDoerUseCase,
    @InjectMissionSetSeenCandidateUseCase private readonly missionSetSeenCandidateUsc: MissionSetSeenCandidateUseCase,
  ) {}

  @Get('mission/:missionId')
  @AuthRoleDecorator(AuthRole.ADMIN, AuthRole.CLIENT)
  async getCandidatesPaginatedForMission(
    @UserAuthInfoDecorator() userInfo: UserInfo,
    @Param('missionId') missionId: string,
    @Query('page', new DefaultValuePipe(1)) page: number,
  ): Promise<PaginationResponse<CandidateDto>> {
    const clientId = userInfo.name;
    await this.ac.can(userInfo.role, 'read', 'candidates', {
      own: { missionId, clientId },
    });

    const PAGE_SIZE = 20;
    const pageIdx = page <= 0 ? 0 : page - 1;
    const doers = await this.candidateSvc.findPaginatedForMission(missionId, pageIdx, PAGE_SIZE);

    return new PaginationResponse(CandidateAdapter.mapToApi(doers));
  }

  @Get('mission/:missionId/favorite/count')
  @AuthRoleDecorator(AuthRole.ADMIN, AuthRole.CLIENT)
  async getFavoriteCandidatesCountForMission(@UserAuthInfoDecorator() userInfo: UserInfo, @Param('missionId') missionId: string): Promise<ApiResponse<{ count: number }>> {
    const clientId = userInfo.name;
    await this.ac.can(userInfo.role, 'read', 'candidates', {
      own: { missionId, clientId },
    });

    const favoriteCount = await this.candidateSvc.getFavoriteCountForMission(missionId);

    return new ApiSuccessResponse({ count: favoriteCount });
  }

  @Post('mission/:missionId/favorite/candidate/:candidateId')
  @AuthRoleDecorator(AuthRole.ADMIN, AuthRole.CLIENT)
  async setCandidateFavoriteForMission(
    @UserAuthInfoDecorator() userInfo: UserInfo,
    @Param('missionId') missionId: string,
    @Param('candidateId') candidateId: string,
    @Body() setCandidateFavoriteParams: SetCandidateFavoriteParams,
  ): Promise<ApiResponse<CandidateDto>> {
    const clientId = userInfo.name;
    await this.ac.can(userInfo.role, 'update', 'candidates', {
      own: { missionId, clientId },
    });

    const isFavorite = setCandidateFavoriteParams.isFavorite;
    await this.missionSetFavDoerUsc.run(missionId, candidateId, isFavorite);

    const candidate = await this.candidateSvc.findOneForMission(missionId, candidateId);

    return new ApiSuccessResponse(CandidateAdapter.toApi(candidate));
  }

  @Post('mission/:missionId/seen/candidate/:candidateId')
  @AuthRoleDecorator(AuthRole.ADMIN, AuthRole.CLIENT)
  async setCandidateSeenForMission(
    @UserAuthInfoDecorator() userInfo: UserInfo,
    @Param('missionId') missionId: string,
    @Param('candidateId') candidateId: string,
  ): Promise<ApiResponse<CandidateDto>> {
    const clientId = userInfo.name;
    await this.ac.can(userInfo.role, 'update', 'candidates', {
      own: { missionId, clientId },
    });

    await this.missionSetSeenCandidateUsc.run(missionId, candidateId);
    const candidate = await this.candidateSvc.findOneForMission(missionId, candidateId);

    return new ApiSuccessResponse(CandidateAdapter.toApi(candidate));
  }
}
