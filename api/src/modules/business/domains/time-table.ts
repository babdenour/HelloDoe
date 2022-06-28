/**
 * Represents the unit of time for a working hours amount.
 */
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
