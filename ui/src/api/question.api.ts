import { QuestionMessageApi } from '@api/messages.api';

export interface QuestionApi {
  createdAt: number;
  updatedAt: number;
  id: string;
  messages: QuestionMessageApi[];
  tags: string[];
}
