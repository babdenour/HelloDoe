/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-function */

import { TimeTableHourlyVolumeUnit } from '@business';
import { ContractType } from '@database/constants/contract-type';
import { SchemaNames } from '@database/constants/schema-names';
import { MissionDocument } from '@database/schemas/mission.schema';
import { TestUtils } from '@mocks';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { addHours, addMonths } from 'date-fns';
import * as faker from 'faker';
import { Model, Types } from 'mongoose';
import { Command } from 'nestjs-command';

faker.setLocale('fr');

@Injectable()
export class CustomCmd {
  constructor(@InjectModel(SchemaNames.MISSION) private readonly missionMdl: Model<MissionDocument>) {}

  @Command({
    command: 'custom:run',
    describe: 'Run a custom script written by hand',
    autoExit: true,
  })
  async runCustom(): Promise<void> {}
}
