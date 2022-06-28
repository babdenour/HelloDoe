import { AccessControlService, InjectAccessControlService } from '@api/access-control';
import { AuthGuard, AuthRole, AuthRoleDecorator, UserAuthInfoDecorator } from '@api/auth';
import {
  CandidateService,
  CreateQuizzUseCase,
  InjectCandidateService,
  InjectCreateQuizzUseCase,
  InjectMissionService,
  InjectMissionSetFavoriteDoerUseCase,
  InjectMissionTimeTableUpdateUseCase,
  InjectMissionUpdateUseCase,
  InjectMissionValidateUseCase,
  MissionBusinessImpl,
  MissionService,
  MissionSetFavoriteDoerUseCase,
  MissionTimeTableUpdateUseCase,
  MissionUpdatableFields,
  MissionUpdateUseCase,
  MissionValidateUseCase,
  QuizzFactory,
  QuizzImplBusiness,
  TimeTableFactory,
  TimeTableImplBusiness,
} from '@business';
import { InjectMissionRepository, InjectQuizzRepository, MissionRepository, QuizzRepository } from '@database';
import { Body, DefaultValuePipe, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { UserInfo } from '@token';

import { CandidateAdapter } from '../../adapters/candidate.adapter';
import { MissionAdapter } from '../../adapters/mission.adapter';
import { QuestionAdapter } from '../../adapters/question.adapter';
import { QuizzAdapter } from '../../adapters/quizz.adapter';
import { ApiResponse } from '../../controllers/api-response';
import { CandidateDto } from '../../dtos/candidate.dto';
import { MissionDto } from '../../dtos/mission.dto';
import { QuizzDto } from '../../dtos/quizz.dto';
import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { MissionParams } from '../../params/mission.params';
import { TimeTableParam } from '../../params/time-table.param';
import { ParseCreateWithoutPaymentDtoPipe, ParsedCreateWithoutPaymentDto } from '../../pipes/parse-create-without-payment-dto-pipe';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiController } from '../decorators/api-controller.decorator';
import { ApiErrorResponse } from '../responses/api-error.response';
import { ApiSuccessResponse } from '../responses/api-success.response';
import { GetResourceResponse } from '../responses/get-resource.response';
import { PaginationResponse } from '../responses/pagination.response';
import { AddCandidatesDto } from './dtos/add-candidates.dto';
import { GetQuizzResponse, UpdateTimeTableResponse } from './missions-controller-utils';
import { SetDoerFavoriteParams } from './params/set-doer-favorite.params';

// TODO: Move annotations to global app instances
@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@UseGuards(AuthGuard)
@ApiController('missions', 2)
export class MissionsController {
  constructor(
    @InjectAccessControlService private readonly ac: AccessControlService,
    @InjectCandidateService private readonly candidateSvc: CandidateService,
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
    @InjectQuizzRepository private readonly quizzRepo: QuizzRepository,
    @InjectMissionService private readonly missionSvc: MissionService,
    @InjectCreateQuizzUseCase private readonly createQuizzUseCase: CreateQuizzUseCase,
    @InjectMissionSetFavoriteDoerUseCase private readonly missionSetFavDoerUsc: MissionSetFavoriteDoerUseCase,
    @InjectMissionTimeTableUpdateUseCase private readonly missionTimeTableUpdateUseCase: MissionTimeTableUpdateUseCase,
    @InjectMissionUpdateUseCase private readonly missionUpdateUseCase: MissionUpdateUseCase,
    @InjectMissionValidateUseCase private readonly validateMissionUsc: MissionValidateUseCase,
  ) {}

  @Get()
  @AuthRoleDecorator(AuthRole.ADMIN)
  async getAll(): Promise<ApiResponse<MissionDto[]>> {
    const missions = await this.missionRepo.findAll();

    return {
      success: true,
      data: missions.map(MissionAdapter.toApi),
    };
  }

  @Post()
  @HttpCode(200)
  @AuthRoleDecorator(AuthRole.ADMIN)
  async createWithoutPayment(@Body(ParseCreateWithoutPaymentDtoPipe) body: ParsedCreateWithoutPaymentDto): Promise<ApiResponse<MissionDto>> {
    const { client, mission } = body;

    const createdMission = await this.missionSvc.createMissionWithClient(mission, client);

    return new GetResourceResponse(MissionAdapter.toApi(createdMission));
  }

  @Get(':id')
  @AuthRoleDecorator(AuthRole.ADMIN, AuthRole.DOER)
  async getOne(@Param('id') missionId: string): Promise<ApiResponse<MissionDto>> {
    const mission = await this.missionRepo.findByIdWithClient(missionId);

    if (!mission) {
      throw new NotFoundException();
    }

    return new GetResourceResponse(MissionAdapter.toApi(mission));
  }

  @Put(':id')
  @AuthRoleDecorator(AuthRole.ADMIN)
  async updateOne(@Param('id') missionId: string, @Body() missionParam: MissionParams): Promise<ApiResponse<MissionDto>> {
    let mission = await this.missionRepo.findById(missionId);

    if (!mission) {
      throw new NotFoundException();
    }

    const updateData: MissionUpdatableFields = this.missionUpdateUseCase.pickUpdateData(missionParam);
    mission = await this.missionUpdateUseCase.run(mission, updateData);

    return new GetResourceResponse(MissionAdapter.toApi(mission));
  }

  @Post(':id/candidates')
  @HttpCode(200)
  @AuthRoleDecorator(AuthRole.ADMIN)
  async addCandidates(@Param('id') missionId: string, @Body() { candidates: doersId }: AddCandidatesDto): Promise<ApiResponse> {
    const mission = await this.missionRepo.findById(missionId);

    if (mission == null) {
      return new ApiErrorResponse('Mission could not be found');
    }

    doersId.forEach(mission.addApplicant);
    await this.missionRepo.save(mission);

    return new ApiSuccessResponse();
  }

  @Get(':missionId/doers/favorite/count')
  @AuthRoleDecorator(AuthRole.ADMIN, AuthRole.CLIENT)
  async getFavoriteDoersCount(@UserAuthInfoDecorator() userInfo: UserInfo, @Param('missionId') missionId: string): Promise<ApiResponse<{ count: number }>> {
    const clientId = userInfo.name;
    await this.ac.can(userInfo.role, 'read', 'candidates', {
      own: { missionId, clientId },
    });

    const favoriteCount = await this.candidateSvc.getFavoriteCountForMission(missionId);

    return new ApiSuccessResponse({ count: favoriteCount });
  }

  @Post(':missionId/doers/:doerId/favorite')
  @AuthRoleDecorator(AuthRole.ADMIN, AuthRole.CLIENT)
  async setDoerFavorite(
    @UserAuthInfoDecorator() userInfo: UserInfo,
    @Param('missionId') missionId: string,
    @Param('doerId') doerId: string,
    @Body() setDoerFavoriteParams: SetDoerFavoriteParams,
  ): Promise<ApiResponse<CandidateDto>> {
    const clientId = userInfo.name;
    await this.ac.can(userInfo.role, 'update', 'candidates', {
      own: { missionId, clientId },
    });

    const isFavorite = setDoerFavoriteParams.isFavorite;
    await this.missionSetFavDoerUsc.run(missionId, doerId, isFavorite);

    const candidate = await this.candidateSvc.findOneForMission(missionId, doerId);

    return new ApiSuccessResponse(CandidateAdapter.toApi(candidate));
  }

  @Get(':missionId/doers/preselected')
  @AuthRoleDecorator(AuthRole.ADMIN, AuthRole.CLIENT)
  async getPreselectedDoers(
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
    const candidates = await this.candidateSvc.findPaginatedForMission(missionId, pageIdx, PAGE_SIZE);

    return new PaginationResponse(CandidateAdapter.mapToApi(candidates));
  }

  @Put(':id/time-table')
  @AuthRoleDecorator(AuthRole.ADMIN)
  async updateTimeTable(@Param('id') missionId: string, @Body() timeTableParams: TimeTableParam): Promise<UpdateTimeTableResponse> {
    let mission: MissionBusinessImpl = await this.missionRepo.findById(missionId);

    if (!mission) {
      throw new NotFoundException();
    }

    const timeTable: TimeTableImplBusiness = TimeTableFactory.create(timeTableParams);

    mission = await this.missionTimeTableUpdateUseCase.run(mission, timeTable);

    return new ApiSuccessResponse(MissionAdapter.toApi(mission));
  }

  @Get(':id/quizz')
  @AuthRoleDecorator(AuthRole.ADMIN)
  async getQuizz(@Param('id') missionId: string): Promise<GetQuizzResponse> {
    const { quizz, questions } = await this.quizzRepo.findByMissionIdWithQuestions(missionId);

    if (!quizz) {
      throw new NotFoundException();
    }

    return new GetResourceResponse({
      quizz: QuizzAdapter.toApi(quizz),
      questions: questions.map(QuestionAdapter.toApi),
    });
  }

  @Post(':id/quizz')
  @AuthRoleDecorator(AuthRole.ADMIN)
  async createQuizz(@Param('id') missionId: string): Promise<ApiResponse<QuizzDto>> {
    const quizz: QuizzImplBusiness = QuizzFactory.create({
      mission: missionId,
    });
    const createdQuizz: QuizzImplBusiness = await this.createQuizzUseCase.run(quizz);

    return new ApiSuccessResponse(createdQuizz);
  }

  @Post(':id/validate')
  @AuthRoleDecorator(AuthRole.ADMIN)
  async validate(@Param('id') missionId: string): Promise<ApiSuccessResponse<MissionDto>> {
    const mission: MissionBusinessImpl = await this.validateMissionUsc.run(missionId);

    return new ApiSuccessResponse(MissionAdapter.toApi(mission));
  }

  @Get('code/:code')
  @AuthRoleDecorator(AuthRole.ADMIN, AuthRole.CLIENT)
  async getOneByCode(@Param('code') code: string): Promise<ApiResponse<MissionDto>> {
    const mission = await this.missionRepo.findByCode(code);

    if (!mission) {
      throw new NotFoundException();
    }

    return new GetResourceResponse(MissionAdapter.toApi(mission));
  }
}
