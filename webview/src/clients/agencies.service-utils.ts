import { ApiResponse } from '@/types/api-response';
import { AgencyApi } from '@api/agency.api';
import { AxiosResponse } from 'axios';

export type GetAllAgenciesRes = AxiosResponse<ApiResponse<AgencyApi[]>>;
