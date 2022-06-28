import { PartialDeep } from '@modules/types/partial-deep';

import {
  TimeTable,
  TimeTableHourlyVolume,
  TimeTableHourlyVolumeUnit,
  TimeTableSchedule,
  TimeTableScheduleShift,
  TimeTableScheduleSlot,
} from '../domains/time-table';
import { TimeTableImpl } from '../domains/time-table.impl';

export class TimeTableFactory {
  static create(args?: PartialDeep<TimeTable>): TimeTableImpl {
    const timeTable: TimeTable = {
      beginAt: args?.beginAt || 0,
      endAt: args?.endAt || 0,
      duration: args?.duration || 0,
      hourlyVolume: this.createHourlyVolume(args?.hourlyVolume),
      schedule: this.createSchedule(args?.schedule),
    };

    return new TimeTableImpl(timeTable);
  }

  static createHourlyVolume(args?: Partial<TimeTableHourlyVolume>): TimeTableHourlyVolume {
    const hourlyVolume: TimeTableHourlyVolume = {
      unit: args?.unit || TimeTableHourlyVolumeUnit.DAY,
      volume: args?.volume || 0,
      flexible: args?.flexible ?? true,
    };

    return hourlyVolume;
  }

  static createSchedule(args?: PartialDeep<TimeTableSchedule>): TimeTableSchedule {
    const schedule: TimeTableSchedule = {
      slots: (args?.slots || []).map((slot) => this.createSlot(slot)),
      shifts: (args?.shifts || []).map((shift) => this.createShift(shift)),
      flexible: args?.flexible ?? true,
    };

    return schedule;
  }

  static createSlot(args?: Partial<TimeTableScheduleSlot>): TimeTableScheduleSlot {
    const slot: TimeTableScheduleSlot = {
      id: args?.id,
      beginTime: args?.beginTime || 0,
      endTime: args?.endTime || 0,
      flexible: args?.flexible ?? true,
    };

    return slot;
  }

  static createShift(args?: Partial<TimeTableScheduleShift>): TimeTableScheduleShift {
    const shift: TimeTableScheduleShift = {
      id: args?.id,
      date: args?.date || 0,
      slots: args?.slots || [],
    };

    return shift;
  }
}
