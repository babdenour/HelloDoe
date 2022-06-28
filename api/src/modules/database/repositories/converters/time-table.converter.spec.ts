import { TimeTableFactory } from '@business';

import { TimeTableConverter } from './time-table.converter';

describe('TimeTableConverter', () => {
  describe('when converts to document', () => {
    it('should convert slots id to mongo id', () => {
      const timeTable = TimeTableFactory.create({
        schedule: TimeTableFactory.createSchedule({
          slots: [
            TimeTableFactory.createSlot({ id: 'A' }),
            TimeTableFactory.createSlot({ id: 'B' }),
            TimeTableFactory.createSlot({ id: 'C' }),
          ],
          shifts: [TimeTableFactory.createShift({ slots: ['A', 'B'] }), TimeTableFactory.createShift({ slots: ['C'] })],
        }),
      });

      const timeTableDoc = TimeTableConverter.toDocument(timeTable);

      const newSlotId0 = String(timeTableDoc.schedule.slots[0]._id);
      const newSlotId1 = String(timeTableDoc.schedule.slots[1]._id);
      const newSlotId2 = String(timeTableDoc.schedule.slots[2]._id);

      expect(newSlotId0.length).toBe(24);
      expect(newSlotId1.length).toBe(24);
      expect(newSlotId2.length).toBe(24);
      expect(String(timeTableDoc.schedule.shifts[0].slots[0])).toBe(newSlotId0);
      expect(String(timeTableDoc.schedule.shifts[0].slots[1])).toBe(newSlotId1);
      expect(String(timeTableDoc.schedule.shifts[1].slots[0])).toBe(newSlotId2);
    });
  });
});
