export enum TimeTableHourlyVolumeUnit {
  DAY = 'DAY',
  WEEK = 'WEEK',
}

export enum TimeTableFlexibility {
  NONE = 'NONE',
  DEFINED_BY_CLIENT = 'DEFINED_BY_CLIENT',
  DEFINED_BY_DOER = 'DEFINED_BY_DOER',
}

export interface TimeTableHourlyVolume {
  unit: TimeTableHourlyVolumeUnit;
  volumeMax: number;
  volumeMin: number;
}

export interface TimeTableSlot {
  id: string;
  beginTime: number;
  endTime: number;
}

export interface TimeTableShift {
  id: string;
  date: number;
  slot: string;
}

export class TimeTable {
  public beginAt: number;
  public endAt: number;
  public duration: number;
  public hourlyVolume: TimeTableHourlyVolume;
  public slots: TimeTableSlot[];
  public shifts: TimeTableShift[];
  public dayFlexibility: TimeTableFlexibility;
  public hourFlexibility: TimeTableFlexibility;
  public hourlyVolumeFlexibility: TimeTableFlexibility;

  constructor(timetable: TimeTable) {
    this.beginAt = timetable.beginAt;
    this.endAt = timetable.endAt;
    this.duration = timetable.duration;
    this.hourlyVolume = timetable.hourlyVolume;
    this.shifts = timetable.shifts;
    this.slots = timetable.slots;
    this.dayFlexibility = timetable.dayFlexibility;
    this.hourFlexibility = timetable.hourFlexibility;
    this.hourlyVolumeFlexibility = timetable.hourlyVolumeFlexibility;
  }
}
