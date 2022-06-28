export class QuizzDto {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  readonly mission: string;
  readonly questions: string[];

  constructor(quizz: QuizzDto) {
    this.createdAt = quizz.createdAt;
    this.updatedAt = quizz.updatedAt;
    this.id = quizz.id;
    this.mission = quizz.mission;
    this.questions = quizz.questions;
  }
}
