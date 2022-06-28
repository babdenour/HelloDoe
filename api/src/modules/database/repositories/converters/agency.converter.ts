import { AgencyFactory, AgencyImplBusiness } from '@business';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SchemaNames } from '../../constants/schema-names';
import { Agency } from '../../schemas/agency';
import { AgencyDoc } from '../../schemas/agency.schema';
import { ConverterUtils } from './converter-utils';
import { Converter } from './types';

@Injectable()
export class AgencyConverter implements Converter<AgencyImplBusiness, AgencyDoc> {
  constructor(@InjectModel(SchemaNames.AGENCY) private readonly agencyModel: Model<AgencyDoc>) {}

  public toDocument = (agencyImpl: AgencyImplBusiness): AgencyDoc => {
    const agency: Agency = {
      createdAt: ConverterUtils.getDate(agencyImpl?.createdAt),
      updatedAt: ConverterUtils.getDate(agencyImpl?.updatedAt),
      _id: ConverterUtils.getObjectId(agencyImpl?.id),
      name: agencyImpl?.name,
    };

    return new this.agencyModel(agency);
  };

  public toDomain = (agencyDoc: AgencyDoc): AgencyImplBusiness => {
    return AgencyFactory.create({
      createdAt: ConverterUtils.getTimestamp(agencyDoc?.createdAt),
      updatedAt: ConverterUtils.getTimestamp(agencyDoc?.updatedAt),
      id: ConverterUtils.getStringId(agencyDoc?._id),
      name: agencyDoc?.name,
    });
  };
}
