import { MissionDto } from '../../dtos/mission.dto';
import { QuestionDto } from '../../dtos/question.dto';
import { QuizzDto } from '../../dtos/quizz.dto';
import { ApiResponse } from '../api-response';

export type GetQuizzResponse = ApiResponse<{
  quizz: QuizzDto;
  questions: QuestionDto[];
}>;

export type UpdateTimeTableResponse = ApiResponse<MissionDto>;
