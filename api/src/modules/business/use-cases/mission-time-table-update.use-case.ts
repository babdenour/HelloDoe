import { InjectMissionRepository, MissionRepository } from '@database';
import { Injectable } from '@nestjs/common';

import { InjectTimeTableService } from '../decorators';
import { MissionImpl } from '../domains/mission.impl';
import { TimeTableImpl } from '../domains/time-table.impl';
import { TimeTableService } from '../services/time-table.service';

@Injectable()
export class MissionTimeTableUpdateUseCase {
  constructor(
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
    @InjectTimeTableService private readonly timeTableService: TimeTableService,
  ) {}

  public async run(mission: MissionImpl, timeTable: TimeTableImpl): Promise<MissionImpl> {
    this.timeTableService.validateShifts(timeTable);

    mission.timeTable = timeTable;
    mission = await this.missionRepo.save(mission);

    return mission;
  }
}
