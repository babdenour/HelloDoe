import { BusinessError, BusinessErrorCode } from '@business/errors/business.error';

import { TimeTableImpl } from '../domains/time-table.impl';
import { TimeTableFactory } from '../factories/time-table.factory';
import { TimeTableService } from './time-table.service';

describe('TimeTableService', () => {
  const timeTableService: TimeTableService = new TimeTableService();

  describe('when validate shifts', () => {
    describe('if valid', () => {
      let timeTable: TimeTableImpl;

      beforeEach(() => {
        timeTable = TimeTableFactory.create({
          schedule: TimeTableFactory.createSchedule({
            slots: [
              TimeTableFactory.createSlot({
                id: '1',
              }),
              TimeTableFactory.createSlot({
                id: '2',
              }),
            ],
            shifts: [
              TimeTableFactory.createShift({
                slots: ['1', '2'],
              }),
              TimeTableFactory.createShift({
                slots: ['2'],
              }),
            ],
          }),
        });
      });

      it('should pass', () => {
        expect(() => {
          timeTableService.validateShifts(timeTable);
        }).not.toThrow();
      });
    });

    describe('if invalid', () => {
      let timeTable: TimeTableImpl;

      beforeEach(() => {
        timeTable = TimeTableFactory.create({
          schedule: TimeTableFactory.createSchedule({
            slots: [
              TimeTableFactory.createSlot({
                id: '1',
              }),
              TimeTableFactory.createSlot({
                id: '2',
              }),
            ],
            shifts: [
              TimeTableFactory.createShift({
                slots: ['3'],
              }),
            ],
          }),
        });
      });

      it('should raise BusinessError H00005', () => {
        expect.assertions(1);

        try {
          timeTableService.validateShifts(timeTable);
        } catch (ex: unknown) {
          if (ex instanceof BusinessError) {
            expect(ex.code).toBe(BusinessErrorCode.H00005_TIME_TABLE_SHIFTS_INVALID);
          }
        }
      });
    });
  });
});
