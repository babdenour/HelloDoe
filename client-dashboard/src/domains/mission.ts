import { ContractType } from '@constants/contract-type';
import { MissionCategory } from '@constants/mission-category';
import { MissionStatus } from '@constants/mission-status';
import { MissionLocation } from '@domains/mission-location';
import { MissionPayment } from '@domains/mission-payment';
import { MissionRequirements } from '@domains/mission-requirements';
import { TimeTable } from '@domains/time-table';

export class Mission {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  readonly agency: string;
  readonly client: string;
  readonly contractType: ContractType;
  readonly code: string;
  readonly description: string;
  readonly location: MissionLocation;
  readonly category: MissionCategory;
  readonly tasks: string[];
  readonly requirements: MissionRequirements;
  readonly timeTable: TimeTable;
  readonly payment: MissionPayment;
  readonly nbWorkers: number;
  readonly status: MissionStatus;
  readonly amount: number;
  readonly seenBy: string[];
  readonly applicants: string[];
  readonly hired: string[];

  constructor(mission: Mission) {
    this.createdAt = mission.createdAt;
    this.updatedAt = mission.updatedAt;
    this.id = mission.id;
    this.agency = mission.agency;
    this.client = mission.client;
    this.contractType = mission.contractType;
    this.code = mission.code;
    this.description = mission.description;
    this.location = mission.location;
    this.category = mission.category;
    this.tasks = mission.tasks;
    this.requirements = mission.requirements;
    this.timeTable = mission.timeTable;
    this.payment = mission.payment;
    this.nbWorkers = mission.nbWorkers;
    this.status = mission.status;
    this.amount = mission.amount;
    this.seenBy = mission.seenBy;
    this.applicants = mission.applicants;
    this.hired = mission.hired;
  }
}
