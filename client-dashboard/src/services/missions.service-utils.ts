import { ApiResponse } from '@/types/api-response';
import { MissionApi } from '@api/mission-api';
import { ContractType } from '@constants/contract-type';
import { MissionCategory } from '@constants/mission-category';
import { MissionSkill } from '@constants/mission-skill';
import { MissionTask } from '@constants/mission-task';
import { Client } from '@domains/client';
import { MissionLocation } from '@domains/mission-location';
import { MissionPayment } from '@domains/mission-payment';
import { MissionRequirements } from '@domains/mission-requirements';
import { TimeTable } from '@domains/time-table';
import { AxiosResponse } from 'axios';

export interface CreateMissionParams {
  agency: string;
  contractType: ContractType;
  client?: Client;
  code: string;
  description: string;
  location: MissionLocation;
  category: MissionCategory;
  tasks: MissionTask[];
  skills: MissionSkill[];
  requirements: MissionRequirements;
  timeTable: TimeTable;
  nbWorkers: number;
  payment: MissionPayment;
  amount: number;
}

export interface CreateMissionWithClientInfoParams {
  companyName: string;
  companyAddress: string;
  companySiren: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;

  mission: CreateMissionParams;
}

export type CreateMissionRes = ApiResponse<MissionApi>;

export type CreateMissionResponse = AxiosResponse<ApiResponse<MissionApi>>;
export type GetAllMissionsResponse = AxiosResponse<ApiResponse<MissionApi[]>>;
export type GetByCodeRsp = AxiosResponse<ApiResponse<MissionApi>>;
export type GetOneMissionResponse = AxiosResponse<ApiResponse<MissionApi>>;
export type PostMissionValidateResponse = AxiosResponse<ApiResponse<MissionApi>>;
