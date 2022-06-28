import { TimeTableApi, TimeTableShiftApi, TimeTableSlotApi } from '@api/time-table-api';
import { TimeTable, TimeTableFlexibility, TimeTableHourlyVolumeUnit } from '@domains/time-table';
import { validateAndGetEnumValue } from '@libs/hellodash';

export class TimeTableConverter {
  public toDomain(args?: Partial<TimeTableApi>): TimeTable {
    const timeTable: TimeTable = {
      beginAt: args?.beginAt || 0,
      endAt: args?.endAt || 0,
      duration: args?.duration || 0,
      hourlyVolume: {
        unit: validateAndGetEnumValue(TimeTableHourlyVolumeUnit, args?.hourlyVolume?.unit),
        volumeMax: args?.hourlyVolume?.volumeMax || 0,
        volumeMin: args?.hourlyVolume?.volumeMin || 0,
      },
      hourlyVolumeFlexibility: validateAndGetEnumValue(TimeTableFlexibility, args?.hourlyVolumeFlexibility),
      slots: (args?.slots || []).map((slotApi: TimeTableSlotApi) => ({
        id: slotApi?.id,
        beginTime: slotApi?.beginTime,
        endTime: slotApi?.endTime,
      })),
      shifts: (args?.shifts || []).map((shiftApi: TimeTableShiftApi) => ({
        id: shiftApi?.id,
        date: shiftApi?.date,
        slot: shiftApi?.slot,
      })),
      dayFlexibility: validateAndGetEnumValue(TimeTableFlexibility, args?.dayFlexibility),
      hourFlexibility: validateAndGetEnumValue(TimeTableFlexibility, args?.hourFlexibility),
    };

    return new TimeTable(timeTable);
  }
}
