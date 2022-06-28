import { QuizzSheetImpl } from '../domains/quizz/quizz-sheet.impl';

export interface QuizzSheetRepository {
  countFavoriteByQuizzId(quizzId: string): Promise<number>;
  findAllByQuizzIdAndIsFavorite(quizzId: string, isFavorite: boolean): Promise<QuizzSheetImpl[]>;
  findAllSortedByIsUnlockedDescAndScoreDescGreaterThanWithPagination(quizzId: string, pageIdx: number, pageSize: number): Promise<QuizzSheetImpl[]>;
  findByQuizzIdAndDoerId(quizzId: string, doerId: string): Promise<QuizzSheetImpl | null>;
  save(quizzSht: QuizzSheetImpl): Promise<QuizzSheetImpl>;
  updateAllIsFavoriteByQuizzIdAndDoerIdIn(quizzId: string, doerIds: string[], isFavorite: boolean): Promise<void>;
  updateAllIsUnlockedByQuizzIdAndDoerIdIn(quizzId: string, doerIds: string[], isUnlocked: boolean): Promise<void>;
  updateIsFavoriteByQuizzIdAndDoerId(quizzId: string, doerId: string, isFavorite: boolean): Promise<QuizzSheetImpl>;
  updateIsSeenByQuizzIdAndDoerId(quizzId: string, doerId: string, isSeen: boolean): Promise<QuizzSheetImpl>;
}
