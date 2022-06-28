import { InjectQuizzRepository, QuizzRepository } from '@database';
import { Injectable } from '@nestjs/common';

import { InjectMissionService, InjectQuizzService } from '../decorators';
import { QuizzImpl } from '../domains/quizz/quizz.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { MissionService } from '../services/mission.service';
import { QuizzService } from '../services/quizz.service';

@Injectable()
export class CreateQuizzUseCase {
  constructor(
    @InjectMissionService private readonly missionService: MissionService,
    @InjectQuizzService private readonly quizzService: QuizzService,
    @InjectQuizzRepository private readonly quizzRepo: QuizzRepository,
  ) {}

  public async run(quizz: QuizzImpl): Promise<QuizzImpl> {
    const [missionExists, quizzExists] = await Promise.all([
      await this.missionService.doesMissionExist(quizz.mission),
      await this.quizzService.doesQuizzExistByMissionId(quizz.mission),
    ]);

    if (!missionExists) {
      throw new BusinessError(BusinessErrorCode.H00001_QUIZZ_MISSION_NOT_FOUND);
    } else if (quizzExists) {
      throw new BusinessError(BusinessErrorCode.H00002_QUIZZ_ALREADY_CREATED);
    }

    const savedQuizz: QuizzImpl = await this.quizzRepo.save(quizz);
    return savedQuizz;
  }
}
