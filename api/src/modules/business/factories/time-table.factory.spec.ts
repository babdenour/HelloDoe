import { TimeTableHourlyVolumeUnit } from '../domains/time-table';
import { TimeTableFactory } from './time-table.factory';

describe('TimeTableFactory', () => {
  describe('create', () => {
    it('should create time table with default values', () => {
      const timeTable = TimeTableFactory.create();

      expect(timeTable.beginAt).toBe(0);
      expect(timeTable.endAt).toBe(0);
      expect(timeTable.duration).toBe(0);
      expect(timeTable.hourlyVolume.unit).toBe(TimeTableHourlyVolumeUnit.DAY);
      expect(timeTable.hourlyVolume.volume).toBe(0);
      expect(timeTable.hourlyVolume.flexible).toBe(true);
      expect(timeTable.schedule.slots).toEqual([]);
      expect(timeTable.schedule.shifts).toEqual([]);
      expect(timeTable.schedule.flexible).toBe(true);
    });

    it('should create time table with specified values', () => {
      const timeTable = TimeTableFactory.create({
        beginAt: 10,
        endAt: 100,
        duration: 90,
        hourlyVolume: {
          unit: TimeTableHourlyVolumeUnit.WEEK,
          volume: 4,
          flexible: false,
        },
        schedule: {
          slots: [
            {
              id: '1',
              beginTime: 10,
              endTime: 100,
              flexible: false,
            },
          ],
          shifts: [
            {
              id: '1',
              date: 1000,
              slots: ['1'],
            },
          ],
          flexible: false,
        },
      });

      expect(timeTable.beginAt).toBe(10);
      expect(timeTable.endAt).toBe(100);
      expect(timeTable.duration).toBe(90);
      expect(timeTable.hourlyVolume.unit).toBe(TimeTableHourlyVolumeUnit.WEEK);
      expect(timeTable.hourlyVolume.volume).toBe(4);
      expect(timeTable.hourlyVolume.flexible).toBe(false);
      expect(timeTable.schedule.slots.length).toBe(1);
      expect(timeTable.schedule.slots[0].id).toBe('1');
      expect(timeTable.schedule.slots[0].beginTime).toBe(10);
      expect(timeTable.schedule.slots[0].endTime).toBe(100);
      expect(timeTable.schedule.slots[0].flexible).toBe(false);
      expect(timeTable.schedule.shifts.length).toBe(1);
      expect(timeTable.schedule.shifts[0].id).toBe('1');
      expect(timeTable.schedule.shifts[0].date).toBe(1000);
      expect(timeTable.schedule.shifts[0].slots).toEqual(['1']);
      expect(timeTable.schedule.flexible).toBe(false);
    });
  });
});
