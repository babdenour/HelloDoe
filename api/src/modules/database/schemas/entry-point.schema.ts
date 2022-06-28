import { Document, Schema } from 'mongoose';

import { SchemaNames } from '../constants/schema-names';
import { SchemaType } from '../types/schema.type';
import { EntryPoint } from './entry-point';

type EntryPointType = Omit<EntryPoint, '_id'>;

export type EntryPointDoc = Document & EntryPointType;

const schema: SchemaType<EntryPointType> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  jobBoard: { type: Schema.Types.ObjectId, ref: SchemaNames.JOB_BOARD },
  kind: { type: String, required: true },
  facebook: {
    pageId: { type: String },
  },
};

export const EntryPointSchema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
