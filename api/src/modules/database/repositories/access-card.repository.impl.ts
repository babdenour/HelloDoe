import { AccessCardRepositoryBusiness, AccessCardTypeBusiness, FacebookAccessCardImplBusiness } from '@business';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AccessCardKind } from '../constants/access-card-kind';
import { ConverterNames } from '../constants/converter-names';
import { SchemaNames } from '../constants/schema-names';
import { AccessCardDoc } from '../schemas/access-card.schema';
import { BaseRepository } from './base.repository';
import { AccessCardConverter } from './converters/access-card.converter';

@Injectable()
export class AccessCardRepositoryImpl
  extends BaseRepository<AccessCardTypeBusiness, AccessCardDoc>
  implements AccessCardRepositoryBusiness {
  constructor(
    @InjectModel(SchemaNames.ACCESS_CARD) private readonly accessCardModel: Model<AccessCardDoc>,
    @Inject(ConverterNames.ACCESS_CARD) private accessCardCvtr: AccessCardConverter,
  ) {
    super(accessCardModel, accessCardCvtr);
  }

  public async findByEntryPointIdAndFacebookPageScopeId(
    entryPtId: string,
    pageScopeId: string,
  ): Promise<FacebookAccessCardImplBusiness | null> {
    const accessCard = await this.findByQuery({
      kind: AccessCardKind.FACEBOOK,
      entryPoint: entryPtId,
      facebook: {
        pageScopeId,
      },
    });

    return this.convertIfNotNull(accessCard);
  }
}
