import { TimeTableFlexibility, TimeTableHourlyVolumeUnit } from '@domains/time-table';
import { TimeTableFactory } from '@factories/time-table.factory';

describe('TimeTableFactory', () => {
  describe('create', () => {
    it('should create time table with default values', () => {
      const timeTable = TimeTableFactory.create();

      expect(timeTable.beginAt).toBe(0);
      expect(timeTable.endAt).toBe(0);
      expect(timeTable.duration).toBe(0);
      expect(timeTable.hourlyVolume.unit).toBe(TimeTableHourlyVolumeUnit.DAY);
      expect(timeTable.hourlyVolume.volumeMax).toBe(0);
      expect(timeTable.hourlyVolume.volumeMin).toBe(0);
      expect(timeTable.slots).toEqual([]);
      expect(timeTable.shifts).toEqual([]);
      expect(timeTable.hourlyVolumeFlexibility).toBe(TimeTableFlexibility.DEFINED_BY_CLIENT);
      expect(timeTable.dayFlexibility).toBe(TimeTableFlexibility.DEFINED_BY_CLIENT);
      expect(timeTable.hourFlexibility).toBe(TimeTableFlexibility.DEFINED_BY_CLIENT);
    });

    it('should create time table with specified values', () => {
      const timeTable = TimeTableFactory.create({
        beginAt: 10,
        endAt: 100,
        duration: 90,
        hourlyVolume: TimeTableFactory.createHourlyVolume({
          unit: TimeTableHourlyVolumeUnit.WEEK,
          volumeMax: 10,
          volumeMin: 4,
        }),
        slots: [
          TimeTableFactory.createSlot({
            id: '1',
            beginTime: 10,
            endTime: 100,
          }),
        ],
        shifts: [
          TimeTableFactory.createShift({
            id: '1',
            date: 1000,
            slot: '1',
          }),
        ],
        hourlyVolumeFlexibility: TimeTableFlexibility.NONE,
        dayFlexibility: TimeTableFlexibility.NONE,
        hourFlexibility: TimeTableFlexibility.NONE,
      });

      expect(timeTable.beginAt).toBe(10);
      expect(timeTable.endAt).toBe(100);
      expect(timeTable.duration).toBe(90);
      expect(timeTable.hourlyVolume.unit).toBe(TimeTableHourlyVolumeUnit.WEEK);
      expect(timeTable.hourlyVolume.volumeMin).toBe(4);
      expect(timeTable.slots.length).toBe(1);
      expect(timeTable.slots[0].id).toBe('1');
      expect(timeTable.slots[0].beginTime).toBe(10);
      expect(timeTable.slots[0].endTime).toBe(100);
      expect(timeTable.shifts.length).toBe(1);
      expect(timeTable.shifts[0].id).toBe('1');
      expect(timeTable.shifts[0].date).toBe(1000);
      expect(timeTable.shifts[0].slot).toBe('1');
      expect(timeTable.hourlyVolumeFlexibility).toBe(TimeTableFlexibility.NONE);
      expect(timeTable.dayFlexibility).toBe(TimeTableFlexibility.NONE);
      expect(timeTable.hourFlexibility).toBe(TimeTableFlexibility.NONE);
    });
  });
});
