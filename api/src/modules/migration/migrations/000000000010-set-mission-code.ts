import { SchemaNames } from '@database/constants/schema-names';
import { MissionDocument } from '@database/schemas/mission.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Migration } from '../types/migration';

@Injectable()
export default class implements Migration {
  constructor(@InjectModel(SchemaNames.MISSION) private readonly missionMdl: Model<MissionDocument>) {}

  public async up(): Promise<void> {
    let mission: MissionDocument;
    let idx = 1;
    for await (mission of this.missionMdl.find({}) as any) {
      if (!mission.code) {
        mission.code = `HD-00${idx}`;
        await mission.save();
        idx++;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
