import { AxiosResponse } from 'axios';

export interface LoginParams {
  username: string;
  password: string;
}
export interface LoginClientParams {
  email: string;
  missionCode: string;
}

export type LoginResponse = AxiosResponse<{ success: true; token: string }>;
export type LoginClientRes = AxiosResponse<{ success: true; data: { token: string } }>;
