import { SchemaType } from '@database/types/schema.type';
import { Document, Schema } from 'mongoose';

import { MigrationState } from './migration-state';

export type MigrationDoc = Document & MigrationState;

const schema: SchemaType<MigrationState> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastRun: { type: String },
  migrations: [
    {
      title: { type: String },
      timestamp: { type: Number },
    },
  ],
};

export const MigrationSchema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
