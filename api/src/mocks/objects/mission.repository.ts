import { MissionRepository } from '@database';

export const mockMissionRepo = (mock?: Partial<MissionRepository>): Partial<MissionRepository> => {
  return {
    findByCode: mock?.findByCode || jest.fn(),
    findById: mock?.findById || jest.fn(),
    findByIdWithClient: mock?.findByIdWithClient || jest.fn(),
    save: mock?.save || jest.fn(),
  };
};
