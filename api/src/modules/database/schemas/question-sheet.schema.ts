import { Document, Schema } from 'mongoose';

import { SchemaNames } from '../constants/schema-names';
import { SchemaType } from '../types/schema.type';
import { QuestionSheet } from './question-sheet';

type QuestionSheetType = Omit<QuestionSheet, '_id'>;

export type QuestionSheetDoc = Document & QuestionSheetType;

const schema: SchemaType<QuestionSheetType> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  question: { type: Schema.Types.ObjectId, ref: SchemaNames.QUESTION },
  doer: { type: Schema.Types.ObjectId, ref: SchemaNames.DOER },
  quizz: { type: Schema.Types.ObjectId, ref: SchemaNames.QUIZZ },
  answer: { type: String, required: true },
  score: { type: Number, required: true },
};

export const QuestionSheetSchema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
