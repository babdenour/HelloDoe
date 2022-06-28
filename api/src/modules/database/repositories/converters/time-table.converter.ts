import {
  TimeTableBusiness,
  TimeTableFactory,
  TimeTableHourlyVolumeBusiness,
  TimeTableImplBusiness,
  TimeTableScheduleBusiness,
  TimeTableScheduleShiftBusiness,
  TimeTableScheduleSlotBusiness,
} from '@business';
import { cloneDeep } from 'lodash';
import { isValidObjectId, Types } from 'mongoose';

import { TimeTable, TimeTableHourlyVolume, TimeTableSchedule } from '../../schemas/time-table';
import { ConverterUtils } from './converter-utils';

export class TimeTableConverter {
  public static toDocument(timeTableBns: TimeTableBusiness): TimeTable {
    const timeTable: TimeTable = {
      beginAt: ConverterUtils.getDate(timeTableBns?.beginAt),
      endAt: ConverterUtils.getDate(timeTableBns?.endAt),
      duration: timeTableBns?.duration,
      hourlyVolume: this.hourlyVolumetoDocument(timeTableBns?.hourlyVolume),
      schedule: this.scheduletoDocument(timeTableBns?.schedule),
    };

    return timeTable;
  }

  private static hourlyVolumetoDocument(hourlyVolumeBns: TimeTableHourlyVolumeBusiness): TimeTableHourlyVolume {
    const hourlyVolume: TimeTableHourlyVolumeBusiness = {
      unit: hourlyVolumeBns?.unit,
      volume: hourlyVolumeBns?.volume,
      flexible: hourlyVolumeBns?.flexible,
    };

    return hourlyVolume;
  }

  private static scheduletoDocument(scheduleBns: TimeTableScheduleBusiness): TimeTableSchedule {
    const scheduleBnsWithFixedIds = this.convertSlotsIdToMongoId(scheduleBns);

    const schedule: TimeTableSchedule = {
      slots: ConverterUtils.toArray(scheduleBnsWithFixedIds?.slots).map((slot: TimeTableScheduleSlotBusiness) => ({
        _id: ConverterUtils.getObjectId(slot?.id),
        beginTime: ConverterUtils.getDate(slot?.beginTime),
        endTime: ConverterUtils.getDate(slot?.endTime),
        flexible: slot?.flexible,
      })),
      shifts: ConverterUtils.toArray(scheduleBnsWithFixedIds?.shifts).map((shift: TimeTableScheduleShiftBusiness) => ({
        _id: ConverterUtils.getObjectId(shift?.id),
        date: ConverterUtils.getDate(shift?.date),
        slots: ConverterUtils.toArray(shift?.slots).map((slot) => ConverterUtils.getObjectId(slot)),
      })),
      flexible: scheduleBnsWithFixedIds?.flexible,
    };

    return schedule;
  }

  /**
   * Convert the slots id to mongo ids.
   * @param scheduleBns Timetable schedule to process.
   * @returns Timetable schedule.
   */
  private static convertSlotsIdToMongoId(scheduleBns: TimeTableScheduleBusiness): TimeTableScheduleBusiness {
    const scheduleBnsCopy = cloneDeep(scheduleBns);

    ConverterUtils.toArray(scheduleBnsCopy?.slots).forEach((slot: TimeTableScheduleSlotBusiness) => {
      if (!isValidObjectId(slot.id)) {
        this.setSlotMongoId(slot, ConverterUtils.toArray(scheduleBnsCopy?.shifts));
      }
    });

    return scheduleBnsCopy;
  }

  /**
   * Set the slot id with a mongo id.
   * @param slot Slot to update.
   * @param shifts Array of shifts to update.
   */
  private static setSlotMongoId(slot: TimeTableScheduleSlotBusiness, shifts: TimeTableScheduleShiftBusiness[]): void {
    const oldSlotId = slot.id;
    const newSlotId = ConverterUtils.newStringId();

    slot.id = newSlotId;

    shifts.forEach((shift: TimeTableScheduleShiftBusiness) => {
      const idx = ConverterUtils.toArray(shift?.slots).findIndex((slotId: string) => slotId === oldSlotId);
      if (idx >= 0) {
        shift.slots.splice(idx, 1, newSlotId);
      }
    });
  }

  public static toDomain = (timeTable: TimeTable): TimeTableImplBusiness => {
    const hourlyVolume = timeTable?.hourlyVolume;
    const schedule = timeTable?.schedule;

    return TimeTableFactory.create({
      beginAt: ConverterUtils.getTimestamp(timeTable?.beginAt),
      endAt: ConverterUtils.getTimestamp(timeTable?.endAt),
      duration: timeTable?.duration,
      hourlyVolume: TimeTableFactory.createHourlyVolume({
        unit: hourlyVolume?.unit,
        volume: hourlyVolume?.volume,
        flexible: hourlyVolume?.flexible,
      }),
      schedule: TimeTableFactory.createSchedule({
        slots: ConverterUtils.toArray(schedule?.slots).map((slot) =>
          TimeTableFactory.createSlot({
            id: ConverterUtils.getStringId(slot?._id),
            beginTime: ConverterUtils.getTimestamp(slot?.beginTime),
            endTime: ConverterUtils.getTimestamp(slot?.endTime),
            flexible: slot?.flexible,
          }),
        ),
        shifts: ConverterUtils.toArray(schedule?.shifts).map((shift) =>
          TimeTableFactory.createShift({
            id: ConverterUtils.getStringId(shift?._id),
            date: ConverterUtils.getTimestamp(shift?.date),
            slots: ConverterUtils.toArray(shift?.slots).map((slot) => ConverterUtils.getStringId(slot)),
          }),
        ),
        flexible: schedule?.flexible,
      }),
    });
  };
}
