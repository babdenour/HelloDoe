import { ContractType } from '@business';

import { ClientDto } from './client.dto';
import { DoerDto } from './doer.dto';
import { TimeTable } from './time-table';

export interface MissionDate {
  date: string;
  timeBegin: string;
  timeEnd: string;
}

export enum MissionPaymentUnit {
  HOUR = 'HOUR',
  MISSION = 'MISSION',
}

export interface MissionPayment {
  /**
   * Amount of remuneration in cents.
   */
  amount: number;

  /**
   * Unit of payment.
   */
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

export class MissionDto {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  readonly address: string;
  readonly agency: string;
  readonly amount: number;
  readonly applicants: (string | DoerDto)[];
  readonly category: string;
  readonly clientId: string | ClientDto;
  readonly code: string;
  readonly contractType: ContractType;
  readonly dates: MissionDate[];
  readonly timeTable: TimeTable;
  readonly description: string;
  readonly district: number;
  readonly endDate: number;
  readonly hired: (string | DoerDto)[];
  readonly img: string;
  readonly nbWorkers: number;
  readonly payment: MissionPayment;
  readonly requirements: MissionRequirements;
  readonly reviews: MissionReview[];
  readonly seenBy: (string | DoerDto)[];
  readonly startDate: number;
  readonly status: string;
  readonly tasks: string[];
  readonly type: number;

  constructor(mission: MissionDto) {
    this.createdAt = mission.createdAt;
    this.updatedAt = mission.updatedAt;
    this.id = mission.id;
    this.address = mission.address;
    this.agency = mission.agency;
    this.amount = mission.amount;
    this.applicants = mission.applicants;
    this.category = mission.category;
    this.clientId = mission.clientId;
    this.code = mission.code;
    this.contractType = mission.contractType;
    this.dates = mission.dates;
    this.timeTable = mission.timeTable;
    this.description = mission.description;
    this.district = mission.district;
    this.endDate = mission.endDate;
    this.hired = mission.hired;
    this.img = mission.img;
    this.nbWorkers = mission.nbWorkers;
    this.payment = mission.payment;
    this.requirements = mission.requirements;
    this.reviews = mission.reviews;
    this.seenBy = mission.seenBy;
    this.startDate = mission.startDate;
    this.status = mission.status;
    this.tasks = mission.tasks;
    this.type = mission.type;
  }
}
