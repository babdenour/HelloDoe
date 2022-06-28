import { AccessControlService, AccessControlServiceProviderFactory } from '@api/access-control';
import { AUTH_ROLES_METADATA, AuthRole } from '@api/auth';
import {
  CandidateFactory,
  CandidateService,
  CandidateServiceProviderFactory,
  MissionSetFavoriteDoerUseCaseProviderFactory,
  MissionSetSeenCandidateUseCaseProviderFactory,
} from '@business';
import { mockCandidateSvc } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule } from '@token';

import { CandidateDto } from '../../dtos/candidate.dto';
import { ApiSuccessResponse } from '../responses/api-success.response';
import { PaginationResponse } from '../responses/pagination.response';
import { CandidatesController } from './candidates.controller';
import { SetCandidateFavoriteParams } from './params/set-candidate-favorite.params';

let candidatesCtrl: CandidatesController;

let mockedCandidateSvc: Partial<CandidateService>;
let mockedAccessCtrlSvc: Partial<AccessControlService>;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [TokenModule],
    providers: [
      AccessControlServiceProviderFactory({
        useValue: mockedAccessCtrlSvc,
      }),
      CandidateServiceProviderFactory({
        useValue: mockedCandidateSvc,
      }),
      MissionSetFavoriteDoerUseCaseProviderFactory({
        useValue: {
          run: jest.fn(),
        },
      }),
      MissionSetSeenCandidateUseCaseProviderFactory({
        useValue: {
          run: jest.fn(),
        },
      }),
      CandidatesController,
    ],
  }).compile();

  candidatesCtrl = module.get<CandidatesController>(CandidatesController);
};

describe('CandidatesController', () => {
  beforeEach(async () => {
    mockedCandidateSvc = mockCandidateSvc();
    mockedAccessCtrlSvc = {};
    mockedAccessCtrlSvc.can = jest.fn().mockResolvedValue(true);
    await createApp();
  });

  describe('getCandidates', () => {
    describe('when get candidates paginated', () => {
      const USER_INFO: any = {};
      const MISSION_ID = '1';
      const PAGE = 1;

      beforeEach(async () => {
        mockedCandidateSvc.findPaginatedForMission = jest.fn().mockImplementation(() => [CandidateFactory.create()]);
        await createApp();
      });

      it('should return pagination response', async () => {
        const response: PaginationResponse<CandidateDto> = await candidatesCtrl.getCandidatesPaginatedForMission(USER_INFO, MISSION_ID, PAGE);

        expect(response instanceof PaginationResponse).toBe(true);
      });

      it('should return candidate dto', async () => {
        const response: PaginationResponse<CandidateDto> = await candidatesCtrl.getCandidatesPaginatedForMission(USER_INFO, MISSION_ID, PAGE);

        expect(response.data.results[0] instanceof CandidateDto).toBe(true);
      });
    });
  });

  describe('when get favorite doers count', () => {
    const USER_INFO: any = {};
    const MISSION_ID = '1';
    const CANDIDATES_COUNT = 5;

    beforeEach(async () => {
      mockedCandidateSvc.getFavoriteCountForMission = jest.fn().mockImplementation(() => CANDIDATES_COUNT);
      await createApp();
    });

    it('should return count', async () => {
      const response: ApiSuccessResponse<{ count: number }> = (await candidatesCtrl.getFavoriteCandidatesCountForMission(USER_INFO, MISSION_ID)) as ApiSuccessResponse<{
        count: number;
      }>;

      expect(response.data.count).toBe(CANDIDATES_COUNT);
    });
  });

  describe('when set doer favorite status', () => {
    const USER_INFO: any = {};
    const MISSION_ID = '1';
    const DOER_ID = '1';
    const BODY: SetCandidateFavoriteParams = {
      isFavorite: true,
    };

    it('should return candidate dto', async () => {
      const response: ApiSuccessResponse<CandidateDto> = (await candidatesCtrl.setCandidateFavoriteForMission(USER_INFO, MISSION_ID, DOER_ID, BODY)) as ApiSuccessResponse<
        CandidateDto
      >;

      expect(response.data instanceof CandidateDto).toBe(true);
    });
  });

  describe('when set candidate as seen', () => {
    const USER_INFO: any = {};
    const MISSION_ID = '1';
    const DOER_ID = '1';

    it('should return candidate dto', async () => {
      const response: ApiSuccessResponse<CandidateDto> = (await candidatesCtrl.setCandidateSeenForMission(USER_INFO, MISSION_ID, DOER_ID)) as ApiSuccessResponse<CandidateDto>;

      expect(response.data instanceof CandidateDto).toBe(true);
    });
  });

  describe('given security', () => {
    describe('to get candidates paginated', () => {
      it('should be admin or client', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, candidatesCtrl.getCandidatesPaginatedForMission);

        expect(metadata).toEqual([AuthRole.ADMIN, AuthRole.CLIENT]);
      });
    });

    describe('to get favorite candidates count', () => {
      it('should be admin or client', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, candidatesCtrl.getFavoriteCandidatesCountForMission);

        expect(metadata).toEqual([AuthRole.ADMIN, AuthRole.CLIENT]);
      });
    });

    describe('to set candidate favorite', () => {
      it('should be admin or client', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
        const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, candidatesCtrl.setCandidateFavoriteForMission);

        expect(metadata).toEqual([AuthRole.ADMIN, AuthRole.CLIENT]);
      });
    });
  });
});
