import { QuizzService } from '@business';

export const mockQuizzSvc = (mock?: Partial<QuizzService>): Partial<QuizzService> => {
  return {
    hasDoerFinishedQuizz: mock?.hasDoerFinishedQuizz || jest.fn(),
  };
};
