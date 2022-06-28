import { QuestionMessage } from '@/types/question-message';

export class Question {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  readonly messages: QuestionMessage[];
  readonly tags: string[];

  constructor(question: Question) {
    this.createdAt = question.createdAt;
    this.updatedAt = question.updatedAt;
    this.id = question.id;
    this.messages = question.messages;
    this.tags = question.tags;
  }
}
