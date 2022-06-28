import { QuestionMessageApi } from '@api/messages.api';

export enum QuestionTypeApi {
  DATE = 'DATE',
  EMAIL = 'EMAIL',
  MCQ = 'MCQ',
  OPEN_TYPING = 'OPEN_TYPING',
}

export interface QuestionApi {
  createdAt: number;
  updatedAt: number;
  id: string;
  messages: QuestionMessageApi[];
  tags: string[];
  type: QuestionTypeApi;
}
