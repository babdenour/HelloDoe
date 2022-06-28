import { DoerImplBsn, DoerRepositoryBusiness } from '@business';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ConverterNames } from '../constants/converter-names';
import { SchemaNames } from '../constants/schema-names';
import { DoerDocument } from '../schemas/doer.schema';
import { BaseRepository } from './base.repository';
import { DoerConverter } from './converters/doer.converter';

@Injectable()
export class DoerRepositoryImpl extends BaseRepository<DoerImplBsn, DoerDocument> implements DoerRepositoryBusiness {
  constructor(@InjectModel(SchemaNames.DOER) doerMdl: Model<DoerDocument>, @Inject(ConverterNames.DOER) doerCvtr: DoerConverter) {
    super(doerMdl, doerCvtr);
  }

  public async findAllByIdIn(ids: string[]): Promise<DoerImplBsn[]> {
    const objectIds: Types.ObjectId[] = ids.map((id: string) => new Types.ObjectId(id));
    const doers: DoerDocument[] = await this.findAllByQuery({ _id: { $in: objectIds } });

    return this.convertArray(doers);
  }

  public async save(doer: DoerImplBsn): Promise<DoerImplBsn> {
    const savedDoer: DoerImplBsn = await super.save(doer);

    if (doer?.workProfile?.missions) {
      savedDoer.workProfile.missions = doer.workProfile.missions;
    }

    return savedDoer;
  }
}
