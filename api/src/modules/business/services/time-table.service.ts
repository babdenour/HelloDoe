import { Injectable } from '@nestjs/common';

import { TimeTableScheduleShift, TimeTableScheduleSlot } from '../domains/time-table';
import { TimeTableImpl } from '../domains/time-table.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';

@Injectable()
export class TimeTableService {
  public validateShifts(timeTable: TimeTableImpl): void {
    const slotMap: Map<string, TimeTableScheduleSlot> = timeTable.schedule.slots.reduce(
      (acc: Map<string, TimeTableScheduleSlot>, current: TimeTableScheduleSlot) => {
        acc.set(current.id, current);
        return acc;
      },
      new Map<string, TimeTableScheduleSlot>(),
    );
    const areShiftsValid = timeTable.schedule.shifts.every((shift: TimeTableScheduleShift) => {
      return shift.slots.every((slotId: string) => slotMap.has(slotId));
    });

    if (!areShiftsValid) {
      throw new BusinessError(BusinessErrorCode.H00005_TIME_TABLE_SHIFTS_INVALID);
    }
  }
}
