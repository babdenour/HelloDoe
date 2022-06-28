import { InjectMissionRepository, MissionRepository } from '@database';
import { Injectable } from '@nestjs/common';

import { MissionStatus } from '../constants/mission-status';
import { InjectQuizzService } from '../decorators';
import { MissionImpl } from '../domains/mission.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { QuizzService } from '../services/quizz.service';

@Injectable()
export class MissionValidateUseCase {
  constructor(
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
    @InjectQuizzService private readonly quizzService: QuizzService,
  ) {}

  public async run(missionId: string): Promise<MissionImpl> {
    const mission: MissionImpl = await this.canRunUseCase(missionId);
    const savedMission: MissionImpl = await this.validateMission(mission);

    return savedMission;
  }

  private async canRunUseCase(missionId: string): Promise<MissionImpl> {
    const mission: MissionImpl = await this.missionRepo.findById(missionId);
    if (!mission) {
      throw new BusinessError(BusinessErrorCode.H00007_MISSION_NOT_FOUND, { id: missionId });
    }

    if (mission.status !== MissionStatus.FOR_VALIDATION) {
      throw new BusinessError(BusinessErrorCode.H00008_MISSION_NOT_VALIDATABLE, { id: missionId });
    }

    const quizzExists: boolean = await this.quizzService.doesQuizzExistByMissionId(missionId);
    if (!quizzExists) {
      throw new BusinessError(BusinessErrorCode.H00003_QUIZZ_NOT_FOUND);
    }

    return mission;
  }

  private async validateMission(mission: MissionImpl): Promise<MissionImpl> {
    mission.status = MissionStatus.BEING_PREPARED;
    const savedMission: MissionImpl = await this.missionRepo.save(mission);

    return savedMission;
  }
}
