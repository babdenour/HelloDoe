import { TimeTableHourlyVolumeUnit } from '@business';
import { Types } from 'mongoose';

export type TimeTableHourlyVolume = {
  unit: TimeTableHourlyVolumeUnit;
  volume: number;
  flexible: boolean;
};

export type TimeTableScheduleSlot = {
  _id: Types.ObjectId;
  beginTime: Date;
  endTime: Date;
  flexible: boolean;
};

export type TimeTableScheduleShift = {
  _id: Types.ObjectId;
  date: Date;
  slots: Types.ObjectId[];
};

export type TimeTableSchedule = {
  slots: TimeTableScheduleSlot[];
  shifts: TimeTableScheduleShift[];
  flexible: boolean;
};

export type TimeTable = {
  beginAt: Date;
  endAt: Date;
  duration: number;
  hourlyVolume: TimeTableHourlyVolume;
  schedule: TimeTableSchedule;
};
