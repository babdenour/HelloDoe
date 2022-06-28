import { QuestionDto } from '../../dtos/question.dto';
import { QuizzDto } from '../../dtos/quizz.dto';
import { ApiResponse } from '../api-response';

export type UpdateQuizzResponse = ApiResponse<{
  quizz: QuizzDto;
  questions: QuestionDto[];
}>;
