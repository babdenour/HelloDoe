import { Document, Schema } from 'mongoose';

import { SchemaNames } from '../constants/schema-names';
import { OmitDeep } from '../types/omit-deep';
import { SchemaType } from '../types/schema.type';
import { Doer } from './doer';

type DoerType = OmitDeep<Doer, '_id'>;

export type DoerDocument = Document & Doer;

// TODO: remove schema export when bridge done.
export const schema: SchemaType<DoerType> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profile: {
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    birthday: { type: String, default: '' },
    gender: { type: Number, min: 0, max: 1 },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    department: { type: Number },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: '' },
    nationality: { type: String, default: '' },
    residencePermitOk: { type: Boolean },
    imgUrl: { type: String, default: '' },
  },
  workProfile: {
    hasCompletedFreelanceProcess: { type: Boolean, default: false },
    siret: { type: String, default: '' },
    availabilities: {
      type: { type: Number, min: 0, max: 1 }, // contain AvailabilitiyTypeEnum type
      timeSlots: [],
      deadline: { type: Number, min: 0, max: 3 }, // contain DeadlinesEnum type
    },
    location: [{ type: Number, min: 0, max: 19 }],
    rating: { type: Number, min: 0, max: 5 },
    missions: [{ type: Schema.Types.ObjectId, ref: SchemaNames.MISSION }],
    videoCvs: [
      {
        imgUrl: { type: String },
        question: { type: String },
        videoUrl: { type: String },
        kind: { type: String, required: true },
      },
    ],
  },
};

export const DoerSchema: Schema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
