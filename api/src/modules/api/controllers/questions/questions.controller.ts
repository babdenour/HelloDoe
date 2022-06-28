import { AuthGuard, AuthRole, AuthRoleDecorator } from '@api/auth';
import { InjectQuestionService, QuestionFactory, QuestionImplBusiness, QuestionService } from '@business';
import { InjectQuestionRepository, QuestionRepository } from '@database';
import { Body, Get, NotFoundException, Param, Post, Put, UseFilters, UseGuards, UsePipes } from '@nestjs/common';

import { QuestionAdapter } from '../../adapters/question.adapter';
import { QuestionDto } from '../../dtos/question.dto';
import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiResponse } from '../api-response';
import { ApiController } from '../decorators/api-controller.decorator';
import { ApiSuccessResponse } from '../responses/api-success.response';
import { CreateQuestionParams } from './params/create-question.params';
import { UpdateQuestionParams } from './params/update-question.params';
import { GetAllTagsResponse, GetByTagResponse, UpdateQuestionResponse } from './questions-controller-utils';

@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@UseGuards(AuthGuard)
@ApiController('questions', 2)
export class QuestionsController {
  constructor(
    @InjectQuestionRepository private readonly questionRepo: QuestionRepository,
    @InjectQuestionService private readonly questionService: QuestionService,
  ) {}

  @Post()
  @AuthRoleDecorator(AuthRole.ADMIN)
  async createQuestion(@Body() createQuestionParams: CreateQuestionParams): Promise<ApiResponse<QuestionDto>> {
    const question = QuestionFactory.create({
      messages: createQuestionParams.messages,
      tags: createQuestionParams.tags,
    });

    const createdQuestion: QuestionImplBusiness = await this.questionRepo.save(question);
    return new ApiSuccessResponse(QuestionAdapter.toApi(createdQuestion));
  }

  @Put()
  @AuthRoleDecorator(AuthRole.ADMIN)
  async updateQuestion(@Body() updateQuestionParams: UpdateQuestionParams): Promise<UpdateQuestionResponse> {
    const doesQuestionExist = await this.questionService.doesQuestionExistById(updateQuestionParams.id);

    if (!doesQuestionExist) {
      throw new NotFoundException();
    }

    const question = QuestionFactory.create({
      id: updateQuestionParams.id,
      messages: updateQuestionParams.messages,
      tags: updateQuestionParams.tags,
    });
    const updatedQuestion: QuestionImplBusiness = await this.questionRepo.save(question);

    return new ApiSuccessResponse(QuestionAdapter.toApi(updatedQuestion));
  }

  @Get('tags/:tag')
  @AuthRoleDecorator(AuthRole.ADMIN)
  async getQuestionsByTag(@Param('tag') tag: string): Promise<GetByTagResponse> {
    const questions: QuestionImplBusiness[] = await this.questionRepo.findByTag(tag);

    const questionApiList = questions.map(QuestionAdapter.toApi);
    return new ApiSuccessResponse({ questions: questionApiList, page: 1, pageCount: 1 });
  }

  @Get('tags')
  @AuthRoleDecorator(AuthRole.ADMIN)
  async getAllQuestionTags(): Promise<GetAllTagsResponse> {
    const tags = await this.questionRepo.findAllTags();

    return new ApiSuccessResponse({ tags });
  }
}
