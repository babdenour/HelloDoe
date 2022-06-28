import { InjectMissionRepository, MissionRepository } from '@database';
import { Injectable } from '@nestjs/common';
import { assign, pick } from 'lodash';

import { InjectAgencyService } from '../decorators';
import { Mission } from '../domains/mission';
import { MissionImpl } from '../domains/mission.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { AgencyService } from '../services/agency.service';

export type MissionUpdatableFields = Pick<
  Mission,
  | 'address'
  | 'agency'
  | 'amount'
  | 'category'
  | 'client'
  | 'code'
  | 'contractType'
  | 'dates'
  | 'description'
  | 'district'
  | 'nbWorkers'
  | 'requirements'
  | 'status'
  | 'tasks'
>;

@Injectable()
export class MissionUpdateUseCase {
  constructor(
    @InjectAgencyService private readonly agencySvc: AgencyService,
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
  ) {}

  public async run(mission: MissionImpl, updateData: MissionUpdatableFields): Promise<MissionImpl> {
    await this.validateMission(mission);

    const missionUpdated = await this.updateMission(mission, updateData);

    return missionUpdated;
  }

  public pickUpdateData(updateData: MissionUpdatableFields): MissionUpdatableFields {
    return pick(updateData, [
      'address',
      'agency',
      'amount',
      'category',
      'client',
      'code',
      'contractType',
      'dates',
      'description',
      'district',
      'nbWorkers',
      'requirements',
      'status',
      'tasks',
    ]);
  }

  private async validateMission(mission: MissionImpl): Promise<void> {
    const [agencyExists] = await Promise.all([this.agencySvc.doesAgencyExistById(mission.agency)]);

    if (!agencyExists) {
      throw new BusinessError(BusinessErrorCode.H00006_AGENCY_NOT_FOUND, { id: mission.agency });
    }
  }

  private async updateMission(mission: MissionImpl, updateData: MissionUpdatableFields): Promise<MissionImpl> {
    const pickedData = this.pickUpdateData(updateData);
    let updatedMission = assign(mission, pickedData);
    updatedMission = await this.missionRepo.save(mission);

    return updatedMission;
  }
}
