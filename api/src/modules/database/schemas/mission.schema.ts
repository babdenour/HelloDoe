import { Document, Schema } from 'mongoose';

import { ContractType } from '../constants/contract-type';
import { SchemaNames } from '../constants/schema-names';
import { OmitDeep } from '../types/omit-deep';
import { SchemaType } from '../types/schema.type';
import { Mission } from './mission';

type MissionType = OmitDeep<Mission, '_id'>;

export type MissionDocument = Document & Mission;

// TODO: remove schema export when bridge done.
export const schema: SchemaType<MissionType> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  agency: { type: Schema.Types.ObjectId, ref: SchemaNames.AGENCY },
  clientId: { type: Schema.Types.ObjectId, ref: SchemaNames.CLIENT },
  contractType: { type: String, default: ContractType.FREELANCE },
  img: { type: String, default: '' },
  code: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  address: { type: String, default: '' },
  district: { type: Number },
  location: {
    addressLine1: { type: String, default: '' },
    zipCode: { type: String, default: '' },
  },
  category: { type: String, default: '' },
  tasks: [{ type: String }],
  requirements: {
    attributes: [{ type: String }],
    skills: [{ type: String }],
    tools: [{ type: String }],
  },
  dates: [],
  payment: {
    amount: { type: Number },
    unit: { type: String },
  },
  timeTable: {
    beginAt: { type: Date },
    endAt: { type: Date },
    duration: { type: Number },
    hourlyVolume: {
      unit: { type: String },
      volume: { type: Number },
      flexible: { type: Boolean },
    },
    schedule: {
      slots: [
        {
          beginTime: { type: Date },
          endTime: { type: Date },
          flexible: { type: Boolean },
        },
      ],
      shifts: [
        {
          date: { type: Date },
          slots: [{ type: String }],
        },
      ],
      flexible: { type: Boolean },
    },
  },
  startDate: Number,
  endDate: Number,
  nbWorkers: Number,
  type: Number,
  status: { type: String, default: '' },
  amount: Number,
  seenBy: [{ type: Schema.Types.ObjectId, ref: SchemaNames.DOER }],
  applicants: [{ type: Schema.Types.ObjectId, ref: SchemaNames.DOER }],
  hired: [{ type: Schema.Types.ObjectId, ref: SchemaNames.DOER }],
  reviews: [],
};

export const MissionSchema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
