import { InjectQuizzRepository, InjectQuizzSheetRepository, QuizzRepository } from '@database';
import { Injectable } from '@nestjs/common';

import { QuizzSheetRepository } from '../repositories/quizz-sheet.repository';

@Injectable()
export class CheckoutFulfillUnlockDoersUseCase {
  constructor(
    @InjectQuizzRepository private readonly quizzRepo: QuizzRepository,
    @InjectQuizzSheetRepository private readonly quizzShtRepo: QuizzSheetRepository,
  ) {}

  public async run(missionId: string, doerIds: string[]): Promise<void> {
    const quizz = await this.quizzRepo.findByMissionId(missionId);

    await this.quizzShtRepo.updateAllIsUnlockedByQuizzIdAndDoerIdIn(quizz.id, doerIds, true);
    await this.quizzShtRepo.updateAllIsFavoriteByQuizzIdAndDoerIdIn(quizz.id, doerIds, false);
  }
}
