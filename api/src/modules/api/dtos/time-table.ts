import { TimeTableHourlyVolumeUnit } from '@business';

export interface TimeTableHourlyVolume {
  unit: TimeTableHourlyVolumeUnit;
  volume: number;
  flexible: boolean;
}

export interface TimeTableScheduleSlot {
  id: string;
  beginTime: number;
  endTime: number;
  flexible: boolean;
}

export interface TimeTableScheduleShift {
  id: string;
  date: number;
  slots: string[];
}

export interface TimeTableSchedule {
  slots: TimeTableScheduleSlot[];
  shifts: TimeTableScheduleShift[];
  flexible: boolean;
}

export interface TimeTable {
  beginAt: number;
  endAt: number;
  duration: number;
  hourlyVolume: TimeTableHourlyVolume;
  schedule: TimeTableSchedule;
}
