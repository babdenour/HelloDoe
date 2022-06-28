import { QuestionDto } from '../../dtos/question.dto';
import { ApiResponse } from '../api-response';

export type UpdateQuestionResponse = ApiResponse<QuestionDto>;

export type GetByTagResponse = ApiResponse<{
  questions: QuestionDto[];
  page: number;
  pageCount: number;
}>;

export type GetAllTagsResponse = ApiResponse<{
  tags: string[];
}>;
