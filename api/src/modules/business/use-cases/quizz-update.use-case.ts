import { InjectQuizzRepository, QuizzRepository } from '@database';
import { Utils } from '@modules/utils';
import { Injectable } from '@nestjs/common';

import { InjectMissionService, InjectQuestionService, InjectQuizzService } from '../decorators';
import { QuestionImpl } from '../domains/quizz/question.impl';
import { QuizzImpl } from '../domains/quizz/quizz.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { MissionService } from '../services/mission.service';
import { QuestionService } from '../services/question.service';
import { QuizzService } from '../services/quizz.service';

@Injectable()
export class QuizzUpdateUseCase {
  constructor(
    @InjectMissionService private readonly missionService: MissionService,
    @InjectQuestionService private readonly questionService: QuestionService,
    @InjectQuizzService private readonly quizzService: QuizzService,
    @InjectQuizzRepository private readonly quizzRepo: QuizzRepository,
  ) {}

  public async run(
    quizz: QuizzImpl,
  ): Promise<{
    quizz: QuizzImpl;
    questions: QuestionImpl[];
  }> {
    const [quizzExists, missionExists, ...questionsExist] = await Promise.all([
      await this.quizzService.doesQuizzExistById(quizz.id),
      await this.missionService.doesMissionExist(quizz.mission),
      ...quizz.questions.map((question: string) => this.questionService.doesQuestionExistById(question)),
    ]);

    if (!quizzExists) {
      throw new BusinessError(BusinessErrorCode.H00003_QUIZZ_NOT_FOUND);
    } else if (!missionExists) {
      throw new BusinessError(BusinessErrorCode.H00001_QUIZZ_MISSION_NOT_FOUND);
    } else if (!Utils.areAllTrue(questionsExist)) {
      throw new BusinessError(BusinessErrorCode.H00004_QUIZZ_QUESTION_NOT_FOUND);
    }

    await this.quizzRepo.save(quizz);
    const quizzAndQuestions = await this.quizzRepo.findByMissionIdWithQuestions(quizz.mission);

    return quizzAndQuestions;
  }
}
