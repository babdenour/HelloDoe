import { EntryPointRepositoryBusiness, EntryPointTypeBusiness, FacebookEntryPointImplBusiness } from '@business';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConverterNames } from '../constants/converter-names';
import { EntryPointKind } from '../constants/entry-point-kind';
import { SchemaNames } from '../constants/schema-names';
import { EntryPointDoc } from '../schemas/entry-point.schema';
import { BaseRepository } from './base.repository';
import { EntryPointConverter } from './converters/entry-point.converter';

@Injectable()
export class EntryPointRepositoryImpl
  extends BaseRepository<EntryPointTypeBusiness, EntryPointDoc>
  implements EntryPointRepositoryBusiness {
  constructor(
    @InjectModel(SchemaNames.ENTRY_POINT) private readonly entryPointModel: Model<EntryPointDoc>,
    @Inject(ConverterNames.ENTRY_POINT) private entryPointConverter: EntryPointConverter,
  ) {
    super(entryPointModel, entryPointConverter);
  }

  public async findByFacebookPageId(pageId: string): Promise<FacebookEntryPointImplBusiness | null> {
    const entryPt = await this.findByQuery({
      kind: EntryPointKind.FACEBOOK,
      facebook: {
        pageId,
      },
    });
    return this.convertIfNotNull(entryPt);
  }
}
