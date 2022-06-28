import { Document, Schema } from 'mongoose';

import { SchemaNames } from '../constants/schema-names';
import { SchemaType } from '../types/schema.type';
import { AccessCard } from './access-card';

type AccessCardType = Omit<AccessCard, '_id'>;

export type AccessCardDoc = Document & AccessCardType;

const schema: SchemaType<AccessCardType> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  entryPoint: { type: Schema.Types.ObjectId, ref: SchemaNames.ENTRY_POINT },
  doer: { type: Schema.Types.ObjectId, ref: SchemaNames.DOER },
  kind: { type: String, required: true },
  facebook: {
    pageScopeId: { type: String },
  },
};

export const AccessCardSchema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
