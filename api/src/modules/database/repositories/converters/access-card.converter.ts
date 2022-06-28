import { AccessCardFactory, AccessCardTypeBusiness, FacebookAccessCardImplBusiness } from '@business';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AccessCardKind } from '../../constants/access-card-kind';
import { SchemaNames } from '../../constants/schema-names';
import { AccessCard } from '../../schemas/access-card';
import { AccessCardDoc } from '../../schemas/access-card.schema';
import { ConverterUtils } from './converter-utils';
import { Converter } from './types';

@Injectable()
export class AccessCardConverter implements Converter<AccessCardTypeBusiness, AccessCardDoc> {
  constructor(@InjectModel(SchemaNames.ACCESS_CARD) private readonly accessCardModel: Model<AccessCardDoc>) {}

  public toDocument = (accessCardImpl: AccessCardTypeBusiness): AccessCardDoc => {
    const className = accessCardImpl.constructor.name;

    const commonData: Partial<AccessCard> = {
      createdAt: ConverterUtils.getDate(accessCardImpl?.createdAt),
      updatedAt: ConverterUtils.getDate(accessCardImpl?.updatedAt),
      _id: ConverterUtils.getObjectId(accessCardImpl?.id),
      entryPoint: ConverterUtils.getObjectId(accessCardImpl?.entryPoint),
      doer: ConverterUtils.getObjectId(accessCardImpl?.doer),
    };

    if (accessCardImpl instanceof FacebookAccessCardImplBusiness) {
      commonData.kind = AccessCardKind.FACEBOOK;
      const facebookData: AccessCard['facebook'] = {
        pageScopeId: accessCardImpl.pageScopeId,
      };
      return new this.accessCardModel({ ...commonData, facebook: facebookData });
    }

    throw new Error(`Could not convert access card of type ${className}`);
  };

  public toDomain = (accessCardDoc: AccessCardDoc): AccessCardTypeBusiness => {
    const kind = accessCardDoc.kind;

    if (kind === AccessCardKind.FACEBOOK) {
      return AccessCardFactory.createFacebookAccessCard({
        createdAt: ConverterUtils.getTimestamp(accessCardDoc?.createdAt),
        updatedAt: ConverterUtils.getTimestamp(accessCardDoc?.updatedAt),
        id: ConverterUtils.getStringId(accessCardDoc._id),
        entryPoint: ConverterUtils.getStringId(accessCardDoc.entryPoint),
        doer: ConverterUtils.getStringId(accessCardDoc.doer),
        pageScopeId: accessCardDoc.facebook.pageScopeId,
      });
    }

    throw new Error(`Could not convert access card of kind ${accessCardDoc.kind}`);
  };
}
