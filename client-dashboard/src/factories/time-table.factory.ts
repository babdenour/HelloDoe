import { PartialDeep } from '@/types/partial-deep';
import { TimeTable, TimeTableFlexibility, TimeTableHourlyVolume, TimeTableHourlyVolumeUnit, TimeTableShift, TimeTableSlot } from '@domains/time-table';

export class TimeTableFactory {
  static create(args?: PartialDeep<TimeTable>): TimeTable {
    const timeTable: TimeTable = {
      beginAt: args?.beginAt || 0,
      endAt: args?.endAt || 0,
      duration: args?.duration || 0,
      hourlyVolume: this.createHourlyVolume(args?.hourlyVolume),
      shifts: (args?.shifts || []).map((shift: TimeTableShift) => this.createShift(shift)),
      slots: (args?.slots || []).map((slot: TimeTableSlot) => this.createSlot(slot)),
      hourlyVolumeFlexibility: args?.hourlyVolumeFlexibility || TimeTableFlexibility.DEFINED_BY_CLIENT,
      dayFlexibility: args?.dayFlexibility || TimeTableFlexibility.DEFINED_BY_CLIENT,
      hourFlexibility: args?.hourFlexibility || TimeTableFlexibility.DEFINED_BY_CLIENT,
    };

    return new TimeTable(timeTable);
  }

  static createHourlyVolume(args?: Partial<TimeTableHourlyVolume>): TimeTableHourlyVolume {
    const hourlyVolume: TimeTableHourlyVolume = {
      unit: args?.unit || TimeTableHourlyVolumeUnit.DAY,
      volumeMax: args?.volumeMax || 0,
      volumeMin: args?.volumeMin || 0,
    };

    return hourlyVolume;
  }

  static createSlot(args?: Partial<TimeTableSlot>): TimeTableSlot {
    const slot: TimeTableSlot = {
      id: args?.id,
      beginTime: args?.beginTime || 0,
      endTime: args?.endTime || 0,
    };

    return slot;
  }

  static createShift(args?: Partial<TimeTableShift>): TimeTableShift {
    const shift: TimeTableShift = {
      id: args?.id,
      date: args?.date || 0,
      slot: args?.slot,
    };

    return shift;
  }
}
