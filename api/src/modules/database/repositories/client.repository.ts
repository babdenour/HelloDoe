import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ClientBusinessImpl } from '../../business';
import { ConverterNames } from '../constants/converter-names';
import { SchemaNames } from '../constants/schema-names';
import { ClientDocument } from '../schemas/client.schema';
import { BaseRepository } from './base.repository';
import { ClientConverter } from './converters/client.converter';

@Injectable()
export class ClientRepository extends BaseRepository<ClientBusinessImpl, ClientDocument> {
  constructor(
    @InjectModel(SchemaNames.CLIENT)
    private clientModel: Model<ClientDocument>,
    @Inject(ConverterNames.CLIENT)
    private clientConverter: ClientConverter,
  ) {
    super(clientModel, clientConverter);
  }

  public findByEmail = async (email: string): Promise<ClientBusinessImpl | null> => {
    const client = await this.findByQuery('contact.email', email);
    return this.convertIfNotNull(client);
  };

  public findByEmailOrCreate = async (client: ClientBusinessImpl): Promise<ClientBusinessImpl> => {
    let savedClient = await this.findByEmail(client.contact.email);
    if (!savedClient) {
      savedClient = await this.save(client);
    }

    return savedClient;
  };
}
