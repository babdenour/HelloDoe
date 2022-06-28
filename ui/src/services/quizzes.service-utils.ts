import { ApiResponse } from '@/types/api-response';
import { QuestionApi } from '@api/question.api';
import { QuizzApi } from '@api/quizz.api';
import { AxiosResponse } from 'axios';

export interface UpdateQuizzParams {
  id: string;
  mission: string;
  questions: string[];
}

export type UpdateQuizzResponse = AxiosResponse<
  ApiResponse<{
    quizz: QuizzApi;
    questions: QuestionApi[];
  }>
>;
