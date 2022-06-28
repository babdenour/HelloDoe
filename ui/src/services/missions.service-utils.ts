import { QuizzApi } from '@/api/quizz.api';
import { ApiResponse } from '@/types/api-response';
import { MissionDate, MissionInterface } from '@/types/mission.interface';
import { QuestionApi } from '@api/question.api';
import { ContractType } from '@constants/contract-type';
import { AxiosResponse } from 'axios';

export interface CreateMissionParams {
  companyName: string;
  companyAddress: string;
  companySiren: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  agency: string;
  contractType: ContractType;
  code: string;
  description: string;
  dates: MissionDate[];
  location: string;
  district: number;
  category: string;
  tasks: string[];
  attributes: string[];
  skills: string[];
  tools: string[];
  price: number;
  doersCount: number;
}

export type CreateMissionResponse = AxiosResponse<ApiResponse<MissionInterface>>;
export type GetAllMissionsResponse = AxiosResponse<ApiResponse<MissionInterface[]>>;
export type GetByCodeRsp = AxiosResponse<ApiResponse<MissionInterface>>;
export type GetOneMissionResponse = AxiosResponse<ApiResponse<MissionInterface>>;
export type GetMissionQuizzResponse = AxiosResponse<
  ApiResponse<{
    quizz: QuizzApi;
    questions: QuestionApi[];
  }>
>;
export type PostMissionQuizzResponse = AxiosResponse<ApiResponse<QuizzApi>>;
export type PostMissionValidateResponse = AxiosResponse<ApiResponse<MissionInterface>>;
