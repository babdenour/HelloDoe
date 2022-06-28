export class QuizzSheetImpl implements QuizzSheetImpl {
  /**
   * Timestamp when the quizz sheet has been created.
   */
  readonly createdAt: number;

  /**
   * Timestamp when the quizz sheet has been updated.
   */
  readonly updatedAt: number;

  /**
   * Id of the quizz sheet.
   */
  readonly id: string;

  /**
   * Id of the associated doer.
   */
  doer: string;

  /**
   * Id of the associated quizz.
   */
  quizz: string;

  /**
   * Array of ids of the question sheets.
   */
  questionSheets: string[];

  /**
   * Timestamp when the quizz has been completed.
   */
  completedAt: number;

  /**
   * Final score.
   */
  score: number;

  /**
   * Whether the candidate has been added to favorites by the client.
   */
  isFavorite: boolean;

  /**
   * Whether the candidate has been unlocked by the client.
   */
  isUnlocked: boolean;

  /**
   * Whether the doer has been seen
   */
  readonly isSeen: boolean;

  constructor(quizzSheet: QuizzSheetImpl) {
    this.createdAt = quizzSheet.createdAt;
    this.updatedAt = quizzSheet.updatedAt;
    this.id = quizzSheet.id;
    this.doer = quizzSheet.doer;
    this.quizz = quizzSheet.quizz;
    this.questionSheets = quizzSheet.questionSheets;
    this.completedAt = quizzSheet.completedAt;
    this.score = quizzSheet.score;
    this.isFavorite = quizzSheet.isFavorite;
    this.isUnlocked = quizzSheet.isUnlocked;
    this.isSeen = quizzSheet.isSeen;
  }
}
