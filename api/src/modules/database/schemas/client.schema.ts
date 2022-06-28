import { Document, Schema } from 'mongoose';

import { SchemaType } from '../types/schema.type';
import { Client } from './client';

type ClientType = Omit<Client, '_id'>;

export type ClientDocument = Document & ClientType;

// TODO: remove schema export when bridge done.
export const schema: SchemaType<ClientType> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  companyName: { type: String, default: '' },
  siren: { type: String, default: '' },
  address: { type: String, default: '' },
  contact: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '', unique: true },
    phone: { type: String, default: '' },
  },
};

export const ClientSchema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
