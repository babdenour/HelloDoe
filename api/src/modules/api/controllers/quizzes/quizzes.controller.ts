import { AuthGuard, AuthRole, AuthRoleDecorator } from '@api/auth';
import {
  CreateQuizzUseCase,
  InjectCreateQuizzUseCase,
  InjectQuizzUpdateUseCase,
  QuizzFactory,
  QuizzImplBusiness,
  QuizzUpdateUseCase,
} from '@business';
import { BadRequestException, Body, Param, Post, Put, UseFilters, UseGuards, UsePipes } from '@nestjs/common';

import { QuestionAdapter } from '../../adapters/question.adapter';
import { QuizzAdapter } from '../../adapters/quizz.adapter';
import { QuizzDto } from '../../dtos/quizz.dto';
import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiResponse } from '../api-response';
import { ApiController } from '../decorators/api-controller.decorator';
import { ApiSuccessResponse } from '../responses/api-success.response';
import { UpdateQuizzParams } from './params/update-quizz.params';
import { CreateQuizzParamsPipe, CreateQuizzParamsPiped } from './pipes/create-quizz-params-pipe';
import { UpdateQuizzResponse } from './quizzes-controller-utils';

@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@UseGuards(AuthGuard)
@ApiController('quizzes', 2)
export class QuizzesController {
  constructor(
    @InjectCreateQuizzUseCase private readonly createQuizzUseCase: CreateQuizzUseCase,
    @InjectQuizzUpdateUseCase private readonly quizzUpdateUseCase: QuizzUpdateUseCase,
  ) {}

  @Post()
  @AuthRoleDecorator(AuthRole.ADMIN)
  async createQuizz(@Body(CreateQuizzParamsPipe) quizz: CreateQuizzParamsPiped): Promise<ApiResponse<QuizzDto>> {
    const createdQuizz: QuizzImplBusiness = await this.createQuizzUseCase.run(quizz);
    return new ApiSuccessResponse(createdQuizz);
  }

  @Put(':id')
  @AuthRoleDecorator(AuthRole.ADMIN)
  async updateQuizz(
    @Param('id') quizzId: string,
    @Body() updateQuizzParams: UpdateQuizzParams,
  ): Promise<UpdateQuizzResponse> {
    const quizzToUpdate = QuizzFactory.create({
      id: updateQuizzParams.id,
      mission: updateQuizzParams.mission,
      questions: updateQuizzParams.questions,
    });

    if (quizzId !== quizzToUpdate.id) {
      throw new BadRequestException(`quizz ids don't match`);
    }

    const { quizz, questions } = await this.quizzUpdateUseCase.run(quizzToUpdate);
    return new ApiSuccessResponse({
      quizz: QuizzAdapter.toApi(quizz),
      questions: questions.map(QuestionAdapter.toApi),
    });
  }
}
