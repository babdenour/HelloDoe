import { TimeTableFactory, TimeTableHourlyVolumeUnit } from '@business';

import { TimetableAdapter } from './timetable.adapter';

describe('TimetableAdapter', () => {
  describe('when convert to api', () => {
    const TIMETABLE = TimeTableFactory.create({
      beginAt: 1000,
      endAt: 3000,
      duration: 2000,
      hourlyVolume: TimeTableFactory.createHourlyVolume({
        volume: 10,
        unit: TimeTableHourlyVolumeUnit.DAY,
        flexible: false,
      }),
      schedule: TimeTableFactory.createSchedule({
        slots: [
          TimeTableFactory.createSlot({
            id: '1',
            beginTime: 10,
            endTime: 20,
            flexible: false,
          }),
          TimeTableFactory.createSlot({
            id: '2',
            flexible: true,
          }),
        ],
        shifts: [
          TimeTableFactory.createShift({
            id: '1',
            date: 50,
            slots: ['1'],
          }),
          TimeTableFactory.createShift({
            id: '2',
            date: 60,
            slots: ['1', '2'],
          }),
        ],
        flexible: false,
      }),
    });

    it('should convert to api', () => {
      const timetableDto = TimetableAdapter.toApi(TIMETABLE);

      expect(timetableDto.beginAt).toBe(1000);
      expect(timetableDto.endAt).toBe(3000);
      expect(timetableDto.duration).toBe(2000);
      expect(timetableDto.hourlyVolume.volume).toBe(10);
      expect(timetableDto.hourlyVolume.unit).toBe(TimeTableHourlyVolumeUnit.DAY);
      expect(timetableDto.hourlyVolume.flexible).toBe(false);
      expect(timetableDto.schedule.slots.length).toBe(2);
      expect(timetableDto.schedule.slots[0].id).toBe('1');
      expect(timetableDto.schedule.slots[0].beginTime).toBe(10);
      expect(timetableDto.schedule.slots[0].endTime).toBe(20);
      expect(timetableDto.schedule.slots[0].flexible).toBe(false);
      expect(timetableDto.schedule.slots[1].id).toBe('2');
      expect(timetableDto.schedule.slots[1].flexible).toBe(true);
      expect(timetableDto.schedule.shifts.length).toBe(2);
      expect(timetableDto.schedule.shifts[0].id).toBe('1');
      expect(timetableDto.schedule.shifts[0].date).toBe(50);
      expect(timetableDto.schedule.shifts[0].slots).toEqual(['1']);
      expect(timetableDto.schedule.shifts[1].id).toBe('2');
      expect(timetableDto.schedule.shifts[1].date).toBe(60);
      expect(timetableDto.schedule.shifts[1].slots).toEqual(['1', '2']);
    });
  });
});
