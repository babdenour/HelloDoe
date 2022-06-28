import { InjectMissionService, MissionService } from '@business';
import { Injectable } from '@nestjs/common';

import { RuleDecorator } from '../rule.decorator';
import { Rule } from '../types/rule';

@Injectable()
@RuleDecorator('candidates', 'update')
export class CandidatesUpdateRule implements Rule {
  constructor(@InjectMissionService private readonly missionSvc: MissionService) {}

  public async own(data: { missionId: string; clientId: string }): Promise<boolean> {
    const isOwnedByClient = await this.missionSvc.isOwnedByClient(data.missionId, data.clientId);
    return isOwnedByClient;
  }

  public any(): boolean {
    return true;
  }
}
