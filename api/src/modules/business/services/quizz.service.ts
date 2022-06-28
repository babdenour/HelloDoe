import { InjectQuizzRepository, QuizzRepository } from '@database';
import { Injectable } from '@nestjs/common';

import { InjectQuestionService } from '../decorators';
import { QuestionImpl } from '../domains/quizz/question.impl';
import { QuestionService } from './question.service';

@Injectable()
export class QuizzService {
  constructor(
    @InjectQuestionService private readonly questionSvc: QuestionService,
    @InjectQuizzRepository private readonly quizzRepo: QuizzRepository,
  ) {}

  public async doesQuizzExistById(id: string): Promise<boolean> {
    const quizz = await this.quizzRepo.findById(id);
    return quizz != null;
  }

  public async doesQuizzExistByMissionId(missionId: string): Promise<boolean> {
    const quizz = await this.quizzRepo.findByMissionId(missionId);
    return quizz != null;
  }

  public async hasDoerFinishedQuizz(doerId: string, quizzId: string): Promise<boolean> {
    const questionleftList: QuestionImpl[] = await this.questionSvc.getUnansweredQuestions(doerId, quizzId);

    return questionleftList.length === 0;
  }
}
