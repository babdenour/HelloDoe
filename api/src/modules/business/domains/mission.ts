import { ContractType } from '../constants/contract-type';
import { MissionTask } from '../constants/mission-task';
import { Client } from './client';
import { Doer } from './doer';
import { MissionLocationImpl } from './mission-location.impl';
import { MissionPaymentImpl } from './mission-payment.impl';
import { TimeTableImpl } from './time-table.impl';

/**
 * @deprecated
 */
export interface MissionDate {
  date: string;
  timeBegin: string;
  timeEnd: string;
}

/**
 * Represents the requirements expected from the doer.
 */
export interface MissionRequirements {
  /**
   * Array of strings describing the expected attributes.
   */
  attributes: string[];

  /**
   * Array of strings describing the skills required.
   */
  skills: string[];

  /**
   * Array of strings describing the tools required.
   */
  tools: string[];
}

/**
 * @deprecated
 */
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

/**
 * Represents a mission.
 */
export interface Mission<T = string | Client> {
  /**
   * Timestamp of the datetime when the mission has been created.
   */
  createdAt: number;

  /**
   * Timestamp of the datetime when the mission has been updated for the last time.
   */
  updatedAt: number;

  /**
   * Id of the mission.
   */
  id: string;

  /**
   * Id of the agency associated.
   */
  agency: string;

  /**
   * Id of the client associated.
   */
  client: T;

  /**
   * Type of contract.
   */
  contractType: ContractType;

  /**
   * Url of the image describing the mission.
   */
  img: string;

  /**
   * Human readable code representing the mission.
   */
  code: string;

  /**
   * Description.
   */
  description: string;

  /**
   * @deprecated
   *
   * Address where the mission takes place.
   */
  address: string;

  /**
   * @deprecated
   *
   * District where the mission takes place.
   */
  district: number;

  /**
   * Location of the mission.
   *
   * @see MissionLocationImpl
   */
  location: MissionLocationImpl;

  /**
   * Type of work.
   */
  category: string;

  /**
   * Tasks to accomplish during the mission.
   */
  tasks: MissionTask[];

  /**
   * Requirements expected from the doers.
   *
   * @see MissionRequirements
   */
  requirements: MissionRequirements;

  /**
   * @deprecated
   *
   * Use timeTable instead.
   */
  dates: MissionDate[];

  /**
   * Work schedule.
   *
   * @see TimeTableImpl
   */
  timeTable: TimeTableImpl;

  /**
   * Payment.
   *
   * @see MissionPaymentImpl
   */
  payment: MissionPaymentImpl;

  /**
   * Timestamp of the date when the mission starts.
   */
  startDate: number;

  /**
   * Timestamp of the date when the mission ends.
   */
  endDate: number;

  /**
   * Amount of doers to hire.
   */
  nbWorkers: number;

  /**
   * @deprecated
   */
  type: number;

  /**
   * Status of the mission in the mission lifecycle.
   *
   * @see MissionStatus
   */
  status: string;

  /**
   * Amount paid by the client in cents.
   */
  amount: number;

  /**
   * Array of doers ids that have seen the mission from the chatbot.
   */
  seenBy: (string | Doer)[];

  /**
   * Array of doers ids that have applied to the mission.
   */
  applicants: (string | Doer)[];

  /**
   * Array of doers ids that have been hired for the mission.
   */
  hired: (string | Doer)[];

  /**
   * @deprecated
   */
  reviews: MissionReview[];
}
