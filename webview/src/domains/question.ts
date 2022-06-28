import { QuestionMessage } from '@/types/question-message';

export enum QuestionType {
  DATE = 'DATE',
  EMAIL = 'EMAIL',
  MCQ = 'MCQ',
  OPEN_TYPING = 'OPEN_TYPING',
}

export class Question {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  readonly messages: QuestionMessage[];
  readonly tags: string[];
  readonly type: QuestionType;

  constructor(question: Question) {
    this.createdAt = question.createdAt;
    this.updatedAt = question.updatedAt;
    this.id = question.id;
    this.messages = question.messages;
    this.tags = question.tags;
    this.type = question.type;
  }
}
