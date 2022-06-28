import { Document, Schema } from 'mongoose';

import { SchemaNames } from '../constants/schema-names';
import { SchemaType } from '../types/schema.type';
import { JobBoard } from './job-board';

type JobBoardType = Omit<JobBoard, '_id'>;

export type JobBoardDoc = Document & JobBoardType;

const schema: SchemaType<JobBoardType> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: { type: String, required: true, unique: true },
  missionSources: [{ type: Schema.Types.ObjectId, ref: SchemaNames.AGENCY }],
};

export const JobBoardSchema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
