import { ApiResponse } from '@/types/api-response';
import { QuestionApi } from '@api/question.api';
import { QuizzApi } from '@api/quizz.api';

export type GetMissionQuizzResponse = ApiResponse<{
  quizz: QuizzApi;
  questions: QuestionApi[];
}>;

export type PostMissionQuizzResponse = ApiResponse<QuizzApi>;

export interface UpdateQuizzParams {
  id: string;
  mission: string;
  questions: string[];
}

export type UpdateQuizzResponse = ApiResponse<{
  quizz: QuizzApi;
  questions: QuestionApi[];
}>;
