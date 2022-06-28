import { QuestionSheet } from './question-sheet';

export class QuestionSheetImpl implements QuestionSheet {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  question: string;
  doer: string;
  quizz: string;
  answer: string;
  score: number;

  constructor(questionSheet: QuestionSheet) {
    this.createdAt = questionSheet.createdAt;
    this.updatedAt = questionSheet.updatedAt;
    this.id = questionSheet.id;
    this.question = questionSheet.question;
    this.doer = questionSheet.doer;
    this.quizz = questionSheet.quizz;
    this.answer = questionSheet.answer;
    this.score = questionSheet.score;
  }
}
