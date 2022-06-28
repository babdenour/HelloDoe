import { EntryPointFactory, EntryPointTypeBusiness, FacebookEntryPointImplBusiness } from '@business';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntryPointKind } from '../../constants/entry-point-kind';
import { SchemaNames } from '../../constants/schema-names';
import { EntryPoint } from '../../schemas/entry-point';
import { EntryPointDoc } from '../../schemas/entry-point.schema';
import { ConverterUtils } from './converter-utils';
import { Converter } from './types';

@Injectable()
export class EntryPointConverter implements Converter<EntryPointTypeBusiness, EntryPointDoc> {
  constructor(@InjectModel(SchemaNames.ENTRY_POINT) private readonly entryPointModel: Model<EntryPointDoc>) {}

  public toDocument = (entryPtImpl: EntryPointTypeBusiness): EntryPointDoc => {
    const className = entryPtImpl.constructor.name;

    const commonData: Partial<EntryPoint> = {
      createdAt: ConverterUtils.getDate(entryPtImpl?.createdAt),
      updatedAt: ConverterUtils.getDate(entryPtImpl?.updatedAt),
      _id: ConverterUtils.getObjectId(entryPtImpl?.id),
      jobBoard: ConverterUtils.getObjectId(entryPtImpl?.jobBoard),
    };

    if (entryPtImpl instanceof FacebookEntryPointImplBusiness) {
      commonData.kind = EntryPointKind.FACEBOOK;
      const facebookData: EntryPoint['facebook'] = {
        pageId: entryPtImpl.pageId,
      };
      return new this.entryPointModel({ ...commonData, facebook: facebookData });
    }

    throw new Error(`Could not convert entry point of type ${className}`);
  };

  public toDomain = (entryPtDoc: EntryPointDoc): EntryPointTypeBusiness => {
    const kind = entryPtDoc.kind;

    if (kind === EntryPointKind.FACEBOOK) {
      return EntryPointFactory.createFacebookEntryPoint({
        createdAt: ConverterUtils.getTimestamp(entryPtDoc?.createdAt),
        updatedAt: ConverterUtils.getTimestamp(entryPtDoc?.updatedAt),
        id: ConverterUtils.getStringId(entryPtDoc?._id),
        jobBoard: ConverterUtils.getStringId(entryPtDoc?.jobBoard),
        pageId: entryPtDoc?.facebook?.pageId,
      });
    }

    throw new Error(`Could not convert entry point of kind ${entryPtDoc.kind}`);
  };
}
