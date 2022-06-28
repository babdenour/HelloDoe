import { AgencyBusiness, AgencyRepositoryBusiness } from '@business';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConverterNames } from '../constants/converter-names';
import { SchemaNames } from '../constants/schema-names';
import { AgencyDoc } from '../schemas/agency.schema';
import { BaseRepository } from './base.repository';
import { AgencyConverter } from './converters/agency.converter';

@Injectable()
export class AgencyRepositoryImpl
  extends BaseRepository<AgencyBusiness, AgencyDoc>
  implements AgencyRepositoryBusiness {
  constructor(
    @InjectModel(SchemaNames.AGENCY) private readonly agencyModel: Model<AgencyDoc>,
    @Inject(ConverterNames.AGENCY) private agencyCvtr: AgencyConverter,
  ) {
    super(agencyModel, agencyCvtr);
  }
}
