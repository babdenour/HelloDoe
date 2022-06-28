import { ClientInterface } from '@/types/client.interface';
import { DoerInterface } from '@/types/doer.interface';
import { ContractType } from '@constants/contract-type';

export enum PaymentUnit {
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
  unit: PaymentUnit;
}

export enum JobCategory {
  ACCESS_CONTROL = 'ACCESS_CONTROL',
  ADMIN_HELP = 'ADMIN_HELP',
  ANIMATION_DEMONSTRATION = 'ANIMATION_DEMONSTRATION',
  AGRICULTURAL_EMPLOYEE = 'AGRICULTURAL_EMPLOYEE',
  BABY_SITTING = 'BABY_SITTING',
  CASH_AND_CARRY = 'CASH_AND_CARRY',
  COMMERCIAL_PROSPECTING = 'COMMERCIAL_PROSPECTING',
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
  DATA_ENTRY = 'DATA_ENTRY',
  DELIVERY = 'DELIVERY',
  DISH_WASHING = 'DISH_WASHING',
  DONOR_RECRUITER = 'DONOR_RECRUITER',
  FAST_FOOD = 'FAST_FOOD',
  HANDLING = 'HANDLING',
  HOST_VISITORS = 'HOST_VISITORS',
  HOST = 'HOST',
  INVENTORY = 'INVENTORY',
  LABELING_STOCK = 'LABELING_STOCK',
  LITTLE_HANDS = 'LITTLE_HANDS',
  LUXURY_SALE = 'LUXURY_SALE',
  MOVING = 'MOVING',
  ONLINE_SEARCH = 'ONLINE_SEARCH',
  PACKING = 'PACKING',
  SALES_ASSISTANT = 'SALES_ASSISTANT',
  SELF_SERVICE_MERCHANDISING = 'SELF_SERVICE_MERCHANDISING',
  SERVICE = 'SERVICE',
  STREET_MARKETING = 'STREET_MARKETING',
  TICKETING = 'TICKETING',
  VALET = 'VALET',
  WARDROBE = 'WARDROBE',
  DEFAULT = 'DEFAULT',
}

export interface MissionDate {
  date: string;
  timeBegin: string;
  timeEnd: string;
}

export interface MissionRequirements {
  attributes: string[];
  skills: string[];
  tools: string[];
}

export interface MissionReview {
  worker: string;
  workingHours: MissionDate[];
  rating: number;
}

export interface MissionInterface {
  createdAt: number;
  updatedAt: number;
  id: string;
  address: string;
  amount: number;
  applicants: (string | DoerInterface)[];
  category: JobCategory;
  clientId: string | ClientInterface;
  code: string;
  contractType: ContractType;
  dates: MissionDate[];
  timeTable: TimeTable;
  description: string;
  district: number;
  endDate: number;
  hired: (string | DoerInterface)[];
  img: string;
  payment: MissionPayment;
  nbWorkers: number;
  requirements: MissionRequirements;
  reviews: MissionReview[];
  seenBy: (string | DoerInterface)[];
  startDate: number;
  status: string;
  tasks: string[];
  type: number;
}

export enum TimeTableHourlyVolumeUnit {
  DAY = 'DAY',
  WEEK = 'WEEK',
}

export interface TimeTableHourlyVolume {
  /**
   * Unit of time.
   *
   * @see TimeTableHourlyVolumeUnit
   */
  unit: TimeTableHourlyVolumeUnit;

  /**
   * Amount of working hours per unit of time.
   */
  volume: number;

  /**
   * Whether the hourly volume is flexible.
   * If true, the volume and unit properties are irrelevant.
   */
  flexible: boolean;
}

export interface TimeTableScheduleSlot {
  /**
   * Id of the slot.
   */
  id: string;

  /**
   * Timestamp of the begin time of the slot.
   */
  beginTime: number;

  /**
   * Timestamp of the end time of the slot.
   */
  endTime: number;

  /**
   * Whether the working hours of the slot are flexible.
   * If true, the beginTime and endTime properties are irrelevant.
   */
  flexible: boolean;
}

export interface TimeTableScheduleShift {
  /**
   * Id of the shift.
   */
  id: string;

  /**
   * Timestamp of the date of the shift.
   */
  date: number;

  /**
   * Array of slot ids.
   */
  slots: string[];
}

export interface TimeTableSchedule {
  /**
   * Array of slots.
   */
  slots: TimeTableScheduleSlot[];

  /**
   * Array of shifts.
   */
  shifts: TimeTableScheduleShift[];

  /**
   * Whether the schedule is flexible.
   * if true, the slots and shifts properties are irrelevant.
   */
  flexible: boolean;
}

/**
 * Represents the work schedule of a mission.
 */
export interface TimeTable {
  /**
   * Timestamp of the date when the mission begins.
   */
  beginAt: number;

  /**
   * Timestamp of the date when the mission ends.
   */
  endAt: number;

  /**
   * Duration of the mission.
   */
  duration: number;

  /**
   * Hourly volume.
   *
   * @see TimeTableHourlyVolume
   */
  hourlyVolume: TimeTableHourlyVolume;

  /**
   * Hourly volume.
   *
   * @see TimeTableSchedule
   */
  schedule: TimeTableSchedule;
}
