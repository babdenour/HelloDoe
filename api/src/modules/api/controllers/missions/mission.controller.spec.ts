import { AccessControlService, AccessControlServiceProviderFactory } from '@api/access-control';
import { AUTH_ROLES_METADATA, AuthRole } from '@api/auth';
import {
  CandidateFactory,
  CandidateService,
  CandidateServiceProviderFactory,
  CreateQuizzUseCaseProviderFactory,
  MissionBusinessImpl,
  MissionFactory,
  MissionService,
  MissionServiceProviderFactory,
  MissionSetFavoriteDoerUseCaseProviderFactory,
  MissionTimeTableUpdateUseCaseProviderFactory,
  MissionUpdateUseCaseProviderFactory,
  MissionValidateUseCaseProviderFactory,
} from '@business';
import { MissionRepository, MissionRepositoryProviderFactory, QuizzRepositoryProviderFactory } from '@database';
import { mockCandidateSvc, mockMissionRepo, mockMissionSvc } from '@mocks';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule } from '@token';

import { CandidateDto } from '../../dtos/candidate.dto';
import { MissionDto } from '../../dtos/mission.dto';
import { MissionParams } from '../../params/mission.params';
import { ApiResponseSuccess } from '../api-response';
import { ApiSuccessResponse } from '../responses/api-success.response';
import { PaginationResponse } from '../responses/pagination.response';
import { AddCandidatesDto } from './dtos/add-candidates.dto';
import { MissionsController } from './missions.controller';
import { SetDoerFavoriteParams } from './params/set-doer-favorite.params';

let missionCtrl: MissionsController;

let mockedCandidateSvc: Partial<CandidateService>;
let mockedMissionSvc: Partial<MissionService>;
let mockedMissionRepo: Partial<MissionRepository>;
let mockedAccessCtrlSvc: Partial<AccessControlService>;

const createApp = async (
  params: {
    mockMissionUpdateRun?: jest.Mock;
    mockMissionValidateRun?: jest.Mock;
  } = {},
): Promise<void> => {
  params.mockMissionUpdateRun = params.mockMissionUpdateRun ? params.mockMissionUpdateRun : jest.fn().mockImplementation((mission: MissionBusinessImpl) => mission);
  params.mockMissionValidateRun = params.mockMissionValidateRun ? params.mockMissionValidateRun : jest.fn().mockImplementation(() => MissionFactory.create());

  const module: TestingModule = await Test.createTestingModule({
    imports: [TokenModule],
    providers: [
      AccessControlServiceProviderFactory({
        useValue: mockedAccessCtrlSvc,
      }),
      CandidateServiceProviderFactory({
        useValue: mockedCandidateSvc,
      }),
      MissionRepositoryProviderFactory({
        useValue: mockedMissionRepo,
      }),
      QuizzRepositoryProviderFactory({ useValue: {} }),
      MissionServiceProviderFactory({
        useValue: mockedMissionSvc,
      }),
      CreateQuizzUseCaseProviderFactory({ useValue: {} }),
      MissionSetFavoriteDoerUseCaseProviderFactory({
        useValue: {
          run: jest.fn(),
        },
      }),
      MissionTimeTableUpdateUseCaseProviderFactory({ useValue: {} }),
      MissionUpdateUseCaseProviderFactory({
        useValue: {
          run: params.mockMissionUpdateRun,
          pickUpdateData: jest.fn(),
        },
      }),
      MissionValidateUseCaseProviderFactory({
        useValue: {
          run: params.mockMissionValidateRun,
        },
      }),
      MissionsController,
    ],
  }).compile();

  missionCtrl = module.get<MissionsController>(MissionsController);
};

describe('MissionController', () => {
  beforeEach(async () => {
    mockedCandidateSvc = mockCandidateSvc();
    mockedMissionSvc = mockMissionSvc();
    mockedMissionRepo = mockMissionRepo();
    mockedAccessCtrlSvc = {};
    mockedAccessCtrlSvc.can = jest.fn().mockResolvedValue(true);
    await createApp();
  });

  describe('addCandidates', () => {
    describe('when add candidate to existing mission', () => {
      let mission: MissionBusinessImpl;

      beforeEach(async () => {
        mission = MissionFactory.create();
        mockedMissionRepo.findById = jest.fn().mockImplementation(() => mission);
        await createApp();
      });

      it('should add candidate', async () => {
        const missionId = '1';
        const doerId = '111';
        const addCandidatesDto: AddCandidatesDto = {
          candidates: [doerId],
        };

        await missionCtrl.addCandidates(missionId, addCandidatesDto);

        expect(mission.applicants).toEqual([doerId]);
      });
    });
  });

  describe('updateOne', () => {
    describe('when update mission', () => {
      beforeEach(async () => {
        mockedMissionRepo.findById = jest.fn().mockImplementation(() => MissionFactory.create());
        await createApp();
      });

      it('should return mission dto', async () => {
        const missionId = '1';
        const missionParam = {} as MissionParams;

        const response: ApiResponseSuccess<MissionDto> = (await missionCtrl.updateOne(missionId, missionParam)) as ApiResponseSuccess<MissionDto>;

        expect(response.success).toBe(true);
        expect(response.data instanceof MissionDto).toBe(true);
      });
    });

    describe('when mission not found', () => {
      beforeEach(async () => {
        mockedMissionRepo.findById = jest.fn().mockImplementation(() => null);
        await createApp();
      });

      it('should raise not found exception', async () => {
        const missionId = '1';
        const missionParam = {} as MissionParams;

        await expect(missionCtrl.updateOne(missionId, missionParam)).rejects.toThrow(NotFoundException);
      });
    });
  });

  describe('getOneByCode', () => {
    const CODE = 'code';

    describe('when get mission by code', () => {
      beforeEach(async () => {
        mockedMissionRepo.findByCode = jest.fn().mockImplementation(() => MissionFactory.create());
        await createApp();
      });

      it('should return mission dto', async () => {
        const response: ApiResponseSuccess<MissionDto> = (await missionCtrl.getOneByCode(CODE)) as ApiResponseSuccess<MissionDto>;

        expect(response.success).toBe(true);
        expect(response.data instanceof MissionDto).toBe(true);
      });
    });

    describe('when mission not found', () => {
      beforeEach(async () => {
        mockedMissionRepo.findByCode = jest.fn().mockImplementation(() => null);
        await createApp();
      });

      it('should raise not found exception', async () => {
        await expect(missionCtrl.getOneByCode(CODE)).rejects.toThrow(NotFoundException);
      });
    });
  });

  describe('validate', () => {
    describe('when validate mission', () => {
      const MISSION_ID = '1';

      it('should return mission dto', async () => {
        const response: ApiResponseSuccess<MissionDto> = await missionCtrl.validate(MISSION_ID);

        expect(response.success).toBe(true);
        expect(response.data instanceof MissionDto).toBe(true);
      });
    });
  });

  describe('getPreselectedDoers', () => {
    describe('when get preselected doers', () => {
      const USER_INFO: any = {};
      const MISSION_ID = '1';
      const PAGE = 1;

      beforeEach(async () => {
        mockedCandidateSvc.findPaginatedForMission = jest.fn().mockImplementation(() => [CandidateFactory.create()]);
        await createApp();
      });

      it('should return pagination response', async () => {
        const response: PaginationResponse<CandidateDto> = await missionCtrl.getPreselectedDoers(USER_INFO, MISSION_ID, PAGE);

        expect(response instanceof PaginationResponse).toBe(true);
      });

      it('should return candidate dto', async () => {
        const response: PaginationResponse<CandidateDto> = await missionCtrl.getPreselectedDoers(USER_INFO, MISSION_ID, PAGE);

        expect(response.data.results[0] instanceof CandidateDto).toBe(true);
      });
    });
  });

  describe('when get favorite doers count', () => {
    const USER_INFO: any = {};
    const MISSION_ID = '1';
    const DOERS_COUNT = 5;

    beforeEach(async () => {
      mockedCandidateSvc.getFavoriteCountForMission = jest.fn().mockImplementation(() => DOERS_COUNT);
      await createApp();
    });

    it('should return count', async () => {
      const response: ApiSuccessResponse<{ count: number }> = (await missionCtrl.getFavoriteDoersCount(USER_INFO, MISSION_ID)) as ApiSuccessResponse<{ count: number }>;

      expect(response.data.count).toBe(DOERS_COUNT);
    });
  });

  describe('when set doer favorite status', () => {
    const USER_INFO: any = {};
    const MISSION_ID = '1';
    const DOER_ID = '1';
    const BODY: SetDoerFavoriteParams = {
      isFavorite: true,
    };

    it('should return candidate dto', async () => {
      const response: ApiSuccessResponse<CandidateDto> = (await missionCtrl.setDoerFavorite(USER_INFO, MISSION_ID, DOER_ID, BODY)) as ApiSuccessResponse<CandidateDto>;

      expect(response.data instanceof CandidateDto).toBe(true);
    });
  });

  describe('given security', () => {
    describe('to get quizz', () => {
      it('should be admin', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, missionCtrl.getQuizz);

        expect(metadata).toEqual([AuthRole.ADMIN]);
      });
    });

    describe('to create quizz', () => {
      it('should be admin', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, missionCtrl.createQuizz);

        expect(metadata).toEqual([AuthRole.ADMIN]);
      });
    });

    describe('to update mission', () => {
      it('should be admin', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, missionCtrl.updateOne);

        expect(metadata).toEqual([AuthRole.ADMIN]);
      });
    });

    describe('to validate mission', () => {
      it('should be admin', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, missionCtrl.validate);

        expect(metadata).toEqual([AuthRole.ADMIN]);
      });
    });

    describe('to update mission time table', () => {
      it('should be admin', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, missionCtrl.updateTimeTable);

        expect(metadata).toEqual([AuthRole.ADMIN]);
      });
    });

    describe('to get mission by code', () => {
      it('should be admin or client', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, missionCtrl.getOneByCode);

        expect(metadata).toEqual([AuthRole.ADMIN, AuthRole.CLIENT]);
      });
    });

    describe('to get preselected doers', () => {
      it('should be admin or client', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, missionCtrl.getPreselectedDoers);

        expect(metadata).toEqual([AuthRole.ADMIN, AuthRole.CLIENT]);
      });
    });

    describe('to get favorite doers count', () => {
      it('should be admin or client', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, missionCtrl.getFavoriteDoersCount);

        expect(metadata).toEqual([AuthRole.ADMIN, AuthRole.CLIENT]);
      });
    });

    describe('to set doer favorite', () => {
      it('should be admin or client', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, missionCtrl.setDoerFavorite);

        expect(metadata).toEqual([AuthRole.ADMIN, AuthRole.CLIENT]);
      });
    });
  });
});
