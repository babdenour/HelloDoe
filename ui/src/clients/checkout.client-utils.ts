import { ApiResponse } from '@/types/api-response';

export type CreateCheckoutSessionParams = { missionId: string };
export type CreateCheckoutSessionRes = ApiResponse<{ sessionId: string }>;
