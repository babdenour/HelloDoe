import { QuizzSheetRepositoryBusiness } from '@business';

export const mockQuizzSheetRepo = (mock?: Partial<QuizzSheetRepositoryBusiness>): Partial<QuizzSheetRepositoryBusiness> => {
  return {
    countFavoriteByQuizzId: mock?.countFavoriteByQuizzId || jest.fn(),
    findAllByQuizzIdAndIsFavorite: mock?.findAllByQuizzIdAndIsFavorite || jest.fn(),
    findAllSortedByIsUnlockedDescAndScoreDescGreaterThanWithPagination: mock?.findAllSortedByIsUnlockedDescAndScoreDescGreaterThanWithPagination || jest.fn(),
    findByQuizzIdAndDoerId: mock?.findByQuizzIdAndDoerId || jest.fn(),
    updateAllIsUnlockedByQuizzIdAndDoerIdIn: mock?.updateAllIsUnlockedByQuizzIdAndDoerIdIn || jest.fn(),
    updateAllIsFavoriteByQuizzIdAndDoerIdIn: mock?.updateAllIsFavoriteByQuizzIdAndDoerIdIn || jest.fn(),
    updateIsFavoriteByQuizzIdAndDoerId: mock?.updateIsFavoriteByQuizzIdAndDoerId || jest.fn(),
    updateIsSeenByQuizzIdAndDoerId: mock?.updateIsSeenByQuizzIdAndDoerId || jest.fn(),
  };
};
