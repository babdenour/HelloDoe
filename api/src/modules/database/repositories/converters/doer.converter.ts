import { DoerBsn, DoerFactory, DoerImplBsn, DoerVideoCvBsn, DoerVideoCvTypeBsn } from '@business';
import { isValidEnumValue } from '@libs/hellodash';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ConverterNames } from '../../constants/converter-names';
import { SchemaNames } from '../../constants/schema-names';
import { ConverterUtils } from '../../repositories/converters/converter-utils';
import { Doer, DoerVideoCv } from '../../schemas/doer';
import { DoerDocument } from '../../schemas/doer.schema';
import { MissionConverter } from './mission.converter';

@Injectable()
export class DoerConverter {
  constructor(
    @InjectModel(SchemaNames.DOER)
    private readonly doerModel: Model<DoerDocument>,
    @Inject(forwardRef(() => ConverterNames.MISSION))
    private missionConverter: MissionConverter,
  ) {}

  public toDocument = (doerDomain: DoerBsn): DoerDocument => {
    const doer: Doer = {
      createdAt: ConverterUtils.getDate(doerDomain.createdAt),
      updatedAt: ConverterUtils.getDate(doerDomain.updatedAt),
      _id: ConverterUtils.getObjectId(doerDomain.id),
      profile: {
        first_name: doerDomain?.profile?.firstName,
        last_name: doerDomain?.profile?.lastName,
        birthday: doerDomain?.profile?.birthday,
        gender: doerDomain?.profile?.gender,
        email: doerDomain?.profile?.email,
        phone: doerDomain?.profile?.phone,
        department: doerDomain?.profile?.department,
        address: doerDomain?.profile?.address,
        city: doerDomain?.profile?.city,
        country: doerDomain?.profile?.country,
        nationality: doerDomain?.profile?.nationality,
        residencePermitOk: doerDomain?.profile?.residencePermitOk,
        imgUrl: doerDomain?.profile?.imgUrl,
      },
      workProfile: {
        hasCompletedFreelanceProcess: doerDomain?.workProfile?.hasCompletedFreelanceProcess,
        siret: doerDomain?.workProfile?.siret,
        availabilities: doerDomain?.workProfile?.availabilities,
        location: doerDomain?.workProfile?.location,
        rating: doerDomain?.workProfile?.rating,
        missions: ConverterUtils.toArray(doerDomain?.workProfile?.missions).map(this.missionConverter.toDocumentOrObjectId),
        videoCvs: ConverterUtils.toArray(doerDomain?.workProfile?.videoCvs).map((videoCv: DoerVideoCvBsn) => ({
          _id: ConverterUtils.getObjectId(videoCv?.id),
          imgUrl: videoCv?.imgUrl,
          question: videoCv?.question,
          videoUrl: videoCv?.videoUrl,
          kind: videoCv?.type,
        })),
      },
    };

    return new this.doerModel(doer);
  };

  public toDocumentOrObjectId = (doer: string | DoerBsn): Types.ObjectId | DoerDocument => {
    if (doer instanceof DoerImplBsn) {
      return this.toDocument(doer);
    } else if (typeof doer === 'string') {
      return Types.ObjectId(doer);
    }

    return null;
  };

  public toDomain = (document: Doer): DoerImplBsn => {
    const doer: DoerBsn = {
      createdAt: ConverterUtils.getTimestamp(document?.createdAt),
      updatedAt: ConverterUtils.getTimestamp(document?.updatedAt),
      id: ConverterUtils.getStringId(document?._id),
      profile: {
        firstName: document?.profile?.first_name,
        lastName: document?.profile?.last_name,
        birthday: document?.profile?.birthday,
        gender: document?.profile?.gender,
        email: document?.profile?.email,
        phone: document?.profile?.phone,
        department: document?.profile?.department,
        address: document?.profile?.address,
        city: document?.profile?.city,
        country: document?.profile?.country,
        nationality: document?.profile?.nationality,
        residencePermitOk: document?.profile?.residencePermitOk,
        imgUrl: document?.profile?.imgUrl,
      },
      workProfile: {
        hasCompletedFreelanceProcess: document?.workProfile?.hasCompletedFreelanceProcess,
        siret: document?.workProfile?.siret,
        availabilities: document?.workProfile?.availabilities,
        location: document?.workProfile?.location,
        rating: document?.workProfile?.rating,
        missions: ConverterUtils.toArray(document?.workProfile?.missions).map(this.missionConverter.toDomainOrString),
        videoCvs: ConverterUtils.toArray(document?.workProfile?.videoCvs).map((videoCv: DoerVideoCv) => ({
          id: ConverterUtils.getStringId(videoCv?._id),
          imgUrl: videoCv?.imgUrl,
          question: videoCv?.question,
          videoUrl: videoCv?.videoUrl,
          type: this.videoCvTypeToDomain(videoCv?.kind),
        })),
      },
    };

    return DoerFactory.create(doer);
  };

  private videoCvTypeToDomain(kind: string): DoerVideoCvTypeBsn {
    if (isValidEnumValue(DoerVideoCvTypeBsn, kind)) {
      return kind as DoerVideoCvTypeBsn;
    }

    throw new Error(`Cannot convert video cv kind "${kind}" to video cv type`);
  }

  public toDomainOrString = (document: Types.ObjectId | Doer): string | DoerImplBsn => {
    if (document instanceof Model) {
      return this.toDomain(document as DoerDocument);
    } else if (document instanceof Types.ObjectId) {
      return String(document);
    }

    return null;
  };
}
