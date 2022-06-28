import { BusinessError, BusinessErrorCode, DoerImplBsn, InjectQuizzService, QuizzImplBusiness, QuizzService } from '@business';
import { InjectMissionRepository, InjectQuizzRepository, MissionRepository, QuizzRepository } from '@database';
import { Injectable } from '@nestjs/common';

import { ActionNames } from '../constants/action-names';
import { FollowupEvents } from '../constants/followup-events';
import { Action } from '../domains/action';
import { HandlerDecorator } from '../handler.decorator';
import { ActionHandler } from '../types/action-handler';
import { MessagingPlatform } from '../types/messaging-platform';

interface ExtractedParams {
  alreadyApplied: boolean;
}

@Injectable()
@HandlerDecorator()
export class QuizzEnterHandler implements ActionHandler {
  constructor(
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
    @InjectQuizzRepository private readonly quizzRepo: QuizzRepository,
    @InjectQuizzService private readonly quizzSvc: QuizzService,
  ) {}

  public canHandle(action: Action): boolean {
    return action.name === ActionNames.QUIZZ_ENTER;
  }

  public async handle(action: Action, messagingPlatform: MessagingPlatform): Promise<void> {
    const { alreadyApplied } = await this.extractParams(action, messagingPlatform);

    if (alreadyApplied) {
      action.followupEvent = FollowupEvents.QUIZZ_OUTRO_ALREADY_APPLIED;
    } else {
      action.followupEvent = FollowupEvents.QUIZZ_ONBOARDING;
    }
  }

  private async extractParams(action: Action, messagingPlatform: MessagingPlatform): Promise<ExtractedParams> {
    const missionCode = action.getParameter('missionCode');

    if (!missionCode) {
      throw new BusinessError(BusinessErrorCode.H01000_MISSING_PARAM, { param: 'missionCode' });
    }

    const mission = await this.missionRepo.findByCode(missionCode);
    if (!mission) {
      throw new BusinessError(BusinessErrorCode.H01002_MISSION_NOT_FOUND_BY_CODE, { code: missionCode });
    }

    const doer: DoerImplBsn = await messagingPlatform.getDoer();
    const quizz: QuizzImplBusiness = await this.quizzRepo.findByMissionId(mission.id);

    const alreadyApplied = await this.quizzSvc.hasDoerFinishedQuizz(doer.id, quizz.id);

    return { alreadyApplied };
  }
}
