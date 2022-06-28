import { Document, Schema } from 'mongoose';

import { SchemaNames } from '../constants/schema-names';
import { SchemaType } from '../types/schema.type';
import { QuizzSheet } from './quizz-sheet';

type QuizzSheetType = Omit<QuizzSheet, '_id'>;

export type QuizzSheetDoc = Document & QuizzSheetType;

const schema: SchemaType<QuizzSheetType> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  doer: { type: Schema.Types.ObjectId, ref: SchemaNames.DOER },
  quizz: { type: Schema.Types.ObjectId, ref: SchemaNames.QUIZZ },
  questionSheets: [{ type: Schema.Types.ObjectId, ref: SchemaNames.QUESTION_SHEET }],
  completedAt: { type: Date },
  score: { type: Number },
  isFavorite: { type: Boolean, default: false },
  isUnlocked: { type: Boolean, default: false },
  isSeen: { type: Boolean, default: false },
};

export const QuizzSheetSchema: Schema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
