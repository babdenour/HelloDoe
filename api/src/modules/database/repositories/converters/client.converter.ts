import { ClientBusiness, ClientBusinessImpl, ClientFactory } from '@business';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { SchemaNames } from '../../constants/schema-names';
import { Client } from '../../schemas/client';
import { ClientDocument } from '../../schemas/client.schema';
import { ConverterUtils } from './converter-utils';
import { Converter } from './types';

@Injectable()
export class ClientConverter implements Converter<ClientBusiness, ClientDocument> {
  constructor(
    @InjectModel(SchemaNames.CLIENT)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  public toDocument = (clientDomain: ClientBusiness): ClientDocument => {
    const client: Client = {
      createdAt: ConverterUtils.getDate(clientDomain?.createdAt),
      updatedAt: ConverterUtils.getDate(clientDomain?.updatedAt),
      _id: ConverterUtils.getObjectId(clientDomain?.id),
      companyName: clientDomain?.companyName,
      address: clientDomain?.address,
      siren: clientDomain?.siren,
      contact: {
        firstName: clientDomain?.contact?.firstName,
        lastName: clientDomain?.contact?.lastName,
        email: clientDomain?.contact?.email,
        phone: clientDomain?.contact?.phone,
      },
    };

    return new this.clientModel(client);
  };

  public toDocumentOrObjectId = (client: string | ClientBusiness): Types.ObjectId | ClientDocument => {
    if (client instanceof ClientBusinessImpl) {
      return this.toDocument(client);
    } else if (typeof client === 'string') {
      return Types.ObjectId(client);
    }

    return null;
  };

  public toDomain = (document: Client): ClientBusinessImpl => {
    return ClientFactory.create({
      createdAt: ConverterUtils.getTimestamp(document?.createdAt),
      updatedAt: ConverterUtils.getTimestamp(document?.updatedAt),
      id: ConverterUtils.getStringId(document?._id),
      companyName: document?.companyName,
      address: document?.address,
      siren: document?.siren,
      contact: document?.contact,
    });
  };

  public toDomainOrString = (document: Types.ObjectId | Client): string | ClientBusinessImpl => {
    if (document instanceof Model) {
      return this.toDomain(document as ClientDocument);
    } else if (document instanceof Types.ObjectId) {
      return String(document);
    }

    return null;
  };
}
