import { Types } from "mongoose";

import { ClientInterface } from "./client.interface";
import { WorkerInterface } from "./worker.interface";

export interface MissionDateInterface {
  date: string;
  timeBegin: string;
  timeEnd: string;
}

export interface MissionReviewInterface {
  worker: string;
  workingHours: MissionDateInterface[];
  rating: number;
}

export interface MissionInterface {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  clientId: ClientInterface;
  img: string;
  description: string;
  address: string;
  district: number;
  category: string;
  dates: MissionDateInterface[];
  startDate: number;
  endDate: number;
  nbWorkers: number;
  type: number;
  status: string;
  amount: number;
  seenBy: WorkerInterface[];
  applicants: Array<WorkerInterface | Types.ObjectId>;
  hired: WorkerInterface[];
  reviews: MissionReviewInterface[];
  save: Function;
}
