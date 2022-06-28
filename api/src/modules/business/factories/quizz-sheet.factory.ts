import { QuizzSheetImpl } from '../domains/quizz/quizz-sheet.impl';

export class QuizzSheetFactory {
  /**
   * Create a quizz sheet object.
   * @param args see QuizzSheet
   * @returns Quizz sheet
   */
  static create(args?: Partial<QuizzSheetImpl>): QuizzSheetImpl {
    const now: number = Date.now();
    const quizzSheet: QuizzSheetImpl = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id,
      doer: args?.doer,
      quizz: args?.quizz,
      questionSheets: args?.questionSheets || [],
      completedAt: args?.completedAt,
      score: args?.score,
      isFavorite: args?.isFavorite || false,
      isUnlocked: args?.isUnlocked || false,
      isSeen: args?.isSeen || false,
    };

    return new QuizzSheetImpl(quizzSheet);
  }
}
