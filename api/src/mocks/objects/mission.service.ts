import { MissionService } from '@business';

export const mockMissionSvc = (mock?: Partial<MissionService>): Partial<MissionService> => {
  return {
    isOwnedByClient: mock?.isOwnedByClient || jest.fn(),
  };
};
