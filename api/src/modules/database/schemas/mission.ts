import { MissionPaymentUnit, MissionTask } from '@business';
import { Types } from 'mongoose';

import { ContractType } from '../constants/contract-type';
import { Client } from './client';
import { Doer } from './doer';
import { TimeTable } from './time-table';

export interface MissionDate {
  date: string;
  timeBegin: string;
  timeEnd: string;
}

export interface MissionLocation {
  addressLine1: string;
  zipCode: string;
}

export interface MissionPayment {
  amount: number;
  unit: MissionPaymentUnit;
}

export interface MissionRequirements {
  attributes: string[];
  skills: string[];
  tools: string[];
}

export interface MissionReview {
  worker: string;
  workingHours: [
    {
      date: string;
      timeBegin: string;
      timeEnd: string;
    },
  ];
  rating: number;
}

export interface Mission {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  agency: Types.ObjectId;
  clientId: Types.ObjectId | Client;
  contractType: ContractType;
  img: string;
  code: string;
  description: string;
  address: string;
  district: number;
  location: MissionLocation;
  category: string;
  tasks: MissionTask[];
  requirements: MissionRequirements;
  dates: MissionDate[];
  payment: MissionPayment;
  timeTable: TimeTable;
  startDate: number;
  endDate: number;
  nbWorkers: number;
  type: number;
  status: string;
  amount: number;
  seenBy: (Types.ObjectId | Doer)[];
  applicants: (Types.ObjectId | Doer)[];
  hired: (Types.ObjectId | Doer)[];
  reviews: MissionReview[];
}
