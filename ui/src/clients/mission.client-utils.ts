import { ApiResponse, PaginationResponse } from '@/types/api-response';
import { MissionInterface } from '@/types/mission.interface';
import { CandidateApi } from '@api/candidate.api';

export type GetByCodeRsp = ApiResponse<MissionInterface>;

export type GetCandidatePageRsp = PaginationResponse<CandidateApi>;

export type GetFavoriteDoersCountRsp = ApiResponse<{ count: number }>;
