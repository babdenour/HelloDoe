import { MissionBusiness, MissionBusinessImpl, MissionFactory } from '@business';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ConverterNames } from '../../constants/converter-names';
import { SchemaNames } from '../../constants/schema-names';
import { Mission } from '../../schemas/mission';
import { MissionDocument } from '../../schemas/mission.schema';
import { ClientConverter } from './client.converter';
import { ConverterUtils } from './converter-utils';
import { DoerConverter } from './doer.converter';
import { TimeTableConverter } from './time-table.converter';
import { Converter } from './types';

@Injectable()
export class MissionConverter implements Converter<MissionBusiness, MissionDocument> {
  constructor(
    @InjectModel(SchemaNames.MISSION) private readonly missionModel: Model<MissionDocument>,
    @Inject(forwardRef(() => ConverterNames.CLIENT)) private clientConverter: ClientConverter,
    @Inject(forwardRef(() => ConverterNames.DOER)) private doerConverter: DoerConverter,
  ) {}

  public toDocument = (missionBsn: MissionBusiness): MissionDocument => {
    const mission: Mission = {
      createdAt: ConverterUtils.getDate(missionBsn?.createdAt),
      updatedAt: ConverterUtils.getDate(missionBsn?.updatedAt),
      _id: ConverterUtils.getObjectId(missionBsn?.id),
      agency: ConverterUtils.getObjectId(missionBsn?.agency),
      clientId: this.clientConverter.toDocumentOrObjectId(missionBsn?.client),
      contractType: missionBsn?.contractType,
      img: missionBsn?.img,
      code: missionBsn?.code,
      description: missionBsn?.description,
      address: missionBsn?.address,
      district: missionBsn?.district,
      location: {
        addressLine1: missionBsn?.location?.addressLine1,
        zipCode: missionBsn?.location?.zipCode,
      },
      payment: {
        amount: missionBsn?.payment?.amount,
        unit: missionBsn?.payment?.unit,
      },
      category: missionBsn?.category,
      tasks: missionBsn?.tasks,
      requirements: {
        attributes: missionBsn?.requirements.attributes,
        skills: missionBsn?.requirements.skills,
        tools: missionBsn?.requirements.tools,
      },
      dates: missionBsn?.dates,
      timeTable: TimeTableConverter.toDocument(missionBsn?.timeTable),
      startDate: missionBsn?.startDate,
      endDate: missionBsn?.endDate,
      nbWorkers: missionBsn?.nbWorkers,
      type: missionBsn?.type,
      status: missionBsn?.status,
      amount: missionBsn?.amount,
      seenBy: ConverterUtils.toArray(missionBsn?.seenBy).map(this.doerConverter.toDocumentOrObjectId),
      applicants: ConverterUtils.toArray(missionBsn?.applicants).map(this.doerConverter.toDocumentOrObjectId),
      hired: ConverterUtils.toArray(missionBsn?.hired).map(this.doerConverter.toDocumentOrObjectId),
      reviews: missionBsn?.reviews,
    };

    return new this.missionModel(mission);
  };

  public toDocumentOrObjectId = (mission: string | MissionBusiness): Types.ObjectId | MissionDocument => {
    if (mission instanceof MissionBusinessImpl) {
      return this.toDocument(mission);
    } else if (typeof mission === 'string') {
      return Types.ObjectId(mission);
    }

    return null;
  };

  public toDomain = (document: Mission): MissionBusinessImpl => {
    return MissionFactory.create({
      createdAt: ConverterUtils.getTimestamp(document?.createdAt),
      updatedAt: ConverterUtils.getTimestamp(document?.updatedAt),
      id: ConverterUtils.getStringId(document?._id),
      agency: ConverterUtils.getStringId(document?.agency),
      client: this.clientConverter.toDomainOrString(document?.clientId),
      contractType: document?.contractType,
      img: document?.img,
      code: document?.code,
      description: document?.description,
      address: document?.address,
      district: document?.district,
      location: MissionFactory.createLocation({
        addressLine1: document?.location?.addressLine1,
        zipCode: document?.location?.zipCode,
      }),
      payment: MissionFactory.createPayment({
        amount: document?.payment?.amount,
        unit: document?.payment?.unit,
      }),
      category: document?.category,
      tasks: document?.tasks,
      requirements: {
        attributes: document?.requirements?.attributes,
        skills: document?.requirements?.skills,
        tools: document?.requirements?.tools,
      },
      dates: document?.dates,
      timeTable: TimeTableConverter.toDomain(document?.timeTable),
      startDate: document?.startDate,
      endDate: document?.endDate,
      nbWorkers: document?.nbWorkers,
      type: document?.type,
      status: document?.status,
      amount: document?.amount,
      seenBy: ConverterUtils.toArray(document?.seenBy).map(this.doerConverter.toDomainOrString),
      applicants: ConverterUtils.toArray(document?.applicants).map(this.doerConverter.toDomainOrString),
      hired: ConverterUtils.toArray(document?.hired).map(this.doerConverter.toDomainOrString),
      reviews: document?.reviews,
    });
  };

  public toDomainOrString = (document: Types.ObjectId | Mission): string | MissionBusinessImpl => {
    if (document instanceof Model) {
      return this.toDomain(document as MissionDocument);
    } else if (document instanceof Types.ObjectId) {
      return String(document);
    }

    return null;
  };
}
