import { TimeTableImplBusiness } from '@business';

import { TimetableDto } from '../dtos/timetable.dto';

export class TimetableAdapter {
  public static toApi(timetable: TimeTableImplBusiness): TimetableDto {
    return new TimetableDto({
      beginAt: timetable.beginAt,
      endAt: timetable.endAt,
      duration: timetable.duration,
      hourlyVolume: {
        volume: timetable.hourlyVolume?.volume,
        unit: timetable.hourlyVolume?.unit,
        flexible: timetable.hourlyVolume?.flexible,
      },
      schedule: {
        slots: timetable.schedule?.slots.map((slot) => ({
          id: slot.id,
          beginTime: slot.beginTime,
          endTime: slot.endTime,
          flexible: slot.flexible,
        })),
        shifts: timetable.schedule?.shifts.map((shift) => ({
          id: shift.id,
          date: shift.date,
          slots: shift.slots,
        })),
        flexible: timetable.schedule?.flexible,
      },
    });
  }
}
