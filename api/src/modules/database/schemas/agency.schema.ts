import { Document, Schema } from 'mongoose';

import { SchemaType } from '../types/schema.type';
import { Agency } from './agency';

type AgencyType = Omit<Agency, '_id'>;

export type AgencyDoc = Document & AgencyType;

const schema: SchemaType<AgencyType> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: { type: String, required: true, unique: true },
};

export const AgencySchema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
