import { Injectable } from '@nestjs/common';

import { InjectDoerService, InjectMissionService } from '../decorators';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { CandidateService, InjectCandidateService } from '../services/candidate.service';
import { DoerService } from '../services/doer.service';
import { MissionService } from '../services/mission.service';

@Injectable()
export class MissionSetSeenCandidateUseCase {
  constructor(
    @InjectCandidateService private readonly candidateSvc: CandidateService,
    @InjectMissionService private readonly missionSvc: MissionService,
    @InjectDoerService private readonly doerSvc: DoerService,
  ) {}

  public async run(missionId: string, doerId: string): Promise<void> {
    await this.validateCanRunUseCase(missionId, doerId);

    await this.candidateSvc.setCandidateSeenForMission(missionId, doerId);
  }

  private async validateCanRunUseCase(missionId: string, doerId: string): Promise<void> {
    const [missionExists, doerExists] = await Promise.all([await this.missionSvc.doesMissionExist(missionId), await this.doerSvc.doesDoerExistById(doerId)]);

    if (!missionExists) {
      throw new BusinessError(BusinessErrorCode.H00007_MISSION_NOT_FOUND, { id: missionId });
    }

    if (!doerExists) {
      throw new BusinessError(BusinessErrorCode.H00009_DOER_NOT_FOUND, { id: doerId });
    }
  }
}
