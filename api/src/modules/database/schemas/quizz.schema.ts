import { Document, Schema } from 'mongoose';

import { SchemaNames } from '../constants/schema-names';
import { SchemaType } from '../types/schema.type';
import { Quizz } from './quizz';

type QuizzType = Omit<Quizz, '_id'>;

export type QuizzDoc = Document & QuizzType;

const schema: SchemaType<QuizzType> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  mission: {
    type: Schema.Types.ObjectId,
    ref: SchemaNames.MISSION,
    unique: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: SchemaNames.QUESTION,
    },
  ],
};

export const QuizzSchema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
