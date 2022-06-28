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

export class TimetableDto {
  public beginAt: number;
  public endAt: number;
  public duration: number;
  public hourlyVolume: TimeTableHourlyVolume;
  public schedule: TimeTableSchedule;

  constructor(timetable: TimetableDto) {
    this.beginAt = timetable.beginAt;
    this.endAt = timetable.endAt;
    this.duration = timetable.duration;
    this.hourlyVolume = timetable.hourlyVolume;
    this.schedule = timetable.schedule;
  }
}
