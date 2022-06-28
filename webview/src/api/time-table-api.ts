/**
 * Represents the unit of time for a working hours amount.
 */
export enum TimeTableHourlyVolumeUnitApi {
  DAY = 'DAY',
  WEEK = 'WEEK',
}

/**
 * Represents a flexibility.
 */
export enum TimeTableFlexibilityApi {
  NONE = 'NONE',
  DEFINED_BY_CLIENT = 'DEFINED_BY_CLIENT',
  DEFINED_BY_DOER = 'DEFINED_BY_DOER',
}

export interface TimeTableHourlyVolumeApi {
  /**
   * Unit of time.
   */
  unit: TimeTableHourlyVolumeUnitApi;

  /**
   * Minimum amount of working hours per unit of time.
   *
   * If volumeMax not specified, then volumeMin is the required amount of working hours.
   */
  volumeMin: number;

  /**
   * Maximum amount of working hours per unit of time.
   */
  volumeMax: number;
}

export interface TimeTableSlotApi {
  /**
   * Id of the slot.
   */
  id: string;

  /**
   * Timestamp in ms of the begin time of the slot.
   */
  beginTime: number;

  /**
   * Timestamp in ms of the end time of the slot.
   */
  endTime: number;
}

export interface TimeTableShiftApi {
  /**
   * Id of the shift.
   */
  id: string;

  /**
   * Timestamp in ms of the date of the shift.
   */
  date: number;

  /**
   * Slot associated to the shift.
   */
  slot: string;
}

/**
 * Represents the work schedule of a mission.
 */
export interface TimeTableApi {
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
   */
  hourlyVolume: TimeTableHourlyVolumeApi;

  /**
   * Shifts.
   */
  shifts: TimeTableShiftApi[];

  /**
   * Slots
   */
  slots: TimeTableSlotApi[];

  /**
   * Flexibility about working days.
   */
  dayFlexibility: TimeTableFlexibilityApi;

  /**
   * Flexibility about working hours.
   */
  hourFlexibility: TimeTableFlexibilityApi;

  /**
   * Flexibility about hourly volume.
   */
  hourlyVolumeFlexibility: TimeTableFlexibilityApi;
}
