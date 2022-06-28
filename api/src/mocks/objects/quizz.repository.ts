import { QuizzRepository } from '@database';

export const mockQuizzRepo = (mock?: Partial<QuizzRepository>): Partial<QuizzRepository> => {
  return {
    findByMissionId: mock?.findByMissionId || jest.fn(),
  };
};
