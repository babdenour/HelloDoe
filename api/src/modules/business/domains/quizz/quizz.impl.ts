import { Quizz } from './quizz';

export class QuizzImpl implements Quizz {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  readonly mission: string;
  readonly questions: string[];

  constructor(quizz: Quizz) {
    this.createdAt = quizz.createdAt;
    this.updatedAt = quizz.updatedAt;
    this.id = quizz.id;
    this.mission = quizz.mission;
    this.questions = quizz.questions;
  }
}
