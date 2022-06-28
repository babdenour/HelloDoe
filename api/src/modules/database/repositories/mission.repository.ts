import { MissionBusinessImpl, MissionStatus } from '@business';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ConverterNames } from '../constants/converter-names';
import { SchemaNames } from '../constants/schema-names';
import { UniqueViolationError } from '../errors/unique-violation.error';
import { BaseRepository } from '../repositories/base.repository';
import { MissionDocument } from '../schemas/mission.schema';
import { MissionConverter } from './converters/mission.converter';

@Injectable()
export class MissionRepository extends BaseRepository<MissionBusinessImpl, MissionDocument> {
  constructor(
    @InjectModel(SchemaNames.MISSION) private readonly missionModel: Model<MissionDocument>,
    @Inject(ConverterNames.MISSION) private readonly missionConverter: MissionConverter,
  ) {
    super(missionModel, missionConverter);
  }

  public async findByStatusBeingPreparedAndNotSeenByDoerAndAgencyIn(
    doerId: string,
    agencies: string[],
  ): Promise<MissionBusinessImpl[]> {
    const agencyIds = agencies.map((agency: string) => Types.ObjectId(agency));
    const missions = await this.findAllByQuery({
      status: MissionStatus.BEING_PREPARED,
      seenBy: { $nin: [Types.ObjectId(doerId)] },
      agency: { $in: agencyIds },
    });
    return missions.map((mission) => this.convertIfNotNull(mission));
  }

  public async findByCode(code: string): Promise<MissionBusinessImpl | null> {
    const mission = await this.findByQuery('code', code);
    return this.convertIfNotNull(mission);
  }

  public async findByIdAndClientId(missionId: string, clientId: string): Promise<MissionBusinessImpl | null> {
    const mission = await this.findByQuery({
      _id: this.toObjectId(missionId),
      clientId: this.toObjectId(clientId),
    });
    return this.convertIfNotNull(mission);
  }

  public async findByIdWithClient(id: string): Promise<MissionBusinessImpl | null> {
    const mission = await this.findByQuery('_id', id, ['clientId']);
    return this.convertIfNotNull(mission);
  }

  public async addDoerInSeenByForMissions(doerId: string, missionIds: string[]): Promise<void> {
    await this.missionModel.updateMany(
      {
        _id: { $in: missionIds.map((id) => Types.ObjectId(id)) },
      },
      { $addToSet: { seenBy: Types.ObjectId(doerId) } },
    );
  }

  public async removeDoerFromSeenByByStatusBeingPreparedAndAgencyIn(doerId: string, agencies: string[]): Promise<void> {
    const agencyIds = agencies.map((agency: string) => Types.ObjectId(agency));
    await this.missionModel.updateMany(
      {
        status: MissionStatus.BEING_PREPARED,
        agency: { $in: agencyIds },
      },
      { $pull: { seenBy: Types.ObjectId(doerId) } },
    );
  }

  public async save(mission: MissionBusinessImpl): Promise<MissionBusinessImpl> {
    const savedModel: MissionBusinessImpl = await super.save(mission);

    savedModel.client = mission.client;
    savedModel.applicants = mission.applicants;
    savedModel.hired = mission.hired;
    savedModel.seenBy = mission.seenBy;

    return savedModel;
  }

  public validate = async (mission: MissionBusinessImpl): Promise<void> => {
    const document: MissionDocument = this.missionConverter.toDocument(mission);
    await this.validateDocument(document);
  };

  private validateDocument = async (doc: MissionDocument): Promise<void> => {
    if (doc.code) {
      const foundDoc: MissionDocument = await this.findByQuery('code', doc.code);
      if (foundDoc) {
        throw new UniqueViolationError('code');
      }
    }
  };
}
