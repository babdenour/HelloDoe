import { addHours, addMonths } from 'date-fns';

import { TimeTableFactory } from '../factories/time-table.factory';

describe('TimeTableImpl', () => {
  describe('when get duration', () => {
    describe('should get duration', () => {
      it('when duration defined', () => {
        const DURATION = 1000;

        const flexibleTimetable = TimeTableFactory.create({
          duration: DURATION,
        });

        expect(flexibleTimetable.duration).toBe(DURATION);
      });

      it('when begin at and end at defined', () => {
        const DURATION = 1000;
        const BEGIN_AT = 1000;
        const END_AT = BEGIN_AT + DURATION;

        const flexibleTimetable = TimeTableFactory.create({
          beginAt: BEGIN_AT,
          endAt: END_AT,
        });

        expect(flexibleTimetable.duration).toBe(DURATION);
      });
    });

    describe('should return 0', () => {
      it('when duration not defined and begin at not defined', () => {
        const DEFINED = 1000;

        const flexibleTimetable = TimeTableFactory.create({
          duration: undefined,
          beginAt: undefined,
          endAt: DEFINED,
        });

        expect(flexibleTimetable.duration).toBe(0);
      });

      it('when duration not defined and end at not defined', () => {
        const DEFINED = 1000;

        const flexibleTimetable = TimeTableFactory.create({
          duration: undefined,
          beginAt: DEFINED,
          endAt: undefined,
        });

        expect(flexibleTimetable.duration).toBe(0);
      });
    });
  });

  describe('when indicate if flexible', () => {
    describe('should indicate flexible', () => {
      it('when schedule flexible', () => {
        const flexibleTimetable = TimeTableFactory.create({
          schedule: TimeTableFactory.createSchedule({
            slots: [],
            flexible: true,
          }),
        });

        expect(flexibleTimetable.isFlexible()).toBe(true);
      });

      it('when one slot flexible', () => {
        const flexibleTimetable = TimeTableFactory.create({
          schedule: TimeTableFactory.createSchedule({
            slots: [
              TimeTableFactory.createSlot({ flexible: false }),
              TimeTableFactory.createSlot({ flexible: true }),
              TimeTableFactory.createSlot({ flexible: false }),
            ],
            flexible: false,
          }),
        });

        expect(flexibleTimetable.isFlexible()).toBe(true);
      });
    });

    describe('should indicate not flexible', () => {
      it('when schedule not flexible and no slots', () => {
        const flexibleTimetable = TimeTableFactory.create({
          schedule: TimeTableFactory.createSchedule({
            slots: [],
            flexible: false,
          }),
        });

        expect(flexibleTimetable.isFlexible()).toBe(false);
      });

      it('when schedule not flexible and all slots not flexible', () => {
        const flexibleTimetable = TimeTableFactory.create({
          schedule: TimeTableFactory.createSchedule({
            slots: [
              TimeTableFactory.createSlot({ flexible: false }),
              TimeTableFactory.createSlot({ flexible: false }),
              TimeTableFactory.createSlot({ flexible: false }),
            ],
            flexible: false,
          }),
        });

        expect(flexibleTimetable.isFlexible()).toBe(false);
      });
    });
  });

  describe('when indicate is longer than', () => {
    describe('should indicate longer than', () => {
      it('when longer than', () => {
        const timetable = TimeTableFactory.create({
          duration: addMonths(0, 3).getTime(),
        });

        expect(timetable.isLongerThan(2, 'month')).toBe(true);
      });

      it('when equal to', () => {
        const timetable = TimeTableFactory.create({
          duration: addMonths(0, 2).getTime(),
        });

        expect(timetable.isLongerThan(2, 'month')).toBe(true);
      });
    });
  });

  describe('when count total slots worked', () => {
    it('should count correctly', () => {
      const timetable = TimeTableFactory.create({
        schedule: TimeTableFactory.createSchedule({
          shifts: [
            TimeTableFactory.createShift({ slots: ['1', '2'] }),
            TimeTableFactory.createShift({ slots: ['1'] }),
            TimeTableFactory.createShift({ slots: ['1', '2'] }),
          ],
        }),
      });

      expect(timetable.countTotalSlotsWorked()).toBe(5);
    });
  });

  describe('when count total number of hours worked', () => {
    it('should count correctly', () => {
      const timetable = TimeTableFactory.create({
        schedule: TimeTableFactory.createSchedule({
          slots: [
            TimeTableFactory.createSlot({ id: '1', beginTime: 0, endTime: addHours(0, 1).getTime(), flexible: false }),
            TimeTableFactory.createSlot({ id: '2', beginTime: 0, endTime: addHours(0, 2).getTime(), flexible: false }),
          ],
          shifts: [
            TimeTableFactory.createShift({ slots: ['1', '2'] }),
            TimeTableFactory.createShift({ slots: ['1'] }),
            TimeTableFactory.createShift({ slots: ['1', '2'] }),
          ],
        }),
      });

      expect(timetable.countTotalNumberOfHoursWorked()).toBe(7);
    });

    it('should throw if can not count', () => {
      const timetable = TimeTableFactory.create({
        schedule: TimeTableFactory.createSchedule({
          slots: [
            TimeTableFactory.createSlot({ id: '1', beginTime: 0, endTime: addHours(0, 1).getTime(), flexible: true }),
            TimeTableFactory.createSlot({ id: '2', beginTime: 0, endTime: addHours(0, 2).getTime(), flexible: false }),
          ],
        }),
      });

      expect(() => timetable.countTotalNumberOfHoursWorked()).toThrowError();
    });
  });

  describe('when count total slots worked', () => {
    it('should count correctly', () => {
      const timetable = TimeTableFactory.create({
        schedule: TimeTableFactory.createSchedule({
          shifts: [
            TimeTableFactory.createShift({ slots: ['1', '2'] }),
            TimeTableFactory.createShift({ slots: ['1'] }),
            TimeTableFactory.createShift({ slots: ['1', '2'] }),
          ],
        }),
      });

      expect(timetable.countTotalSlotsWorked()).toBe(5);
    });
  });
});
