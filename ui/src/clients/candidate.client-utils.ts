import { ApiResponse, PaginationResponse } from '@/types/api-response';
import { CandidateApi } from '@api/candidate.api';

export type FetchCandidatesPaginatedRsp = PaginationResponse<CandidateApi>;

export type SetDoerFavoriteParams = { isFavorite: boolean };
export type SetDoerFavoriteRes = ApiResponse<CandidateApi>;
