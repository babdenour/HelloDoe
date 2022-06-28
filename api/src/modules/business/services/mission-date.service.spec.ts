import { MissionDate } from '../domains/mission';
import { MissionDateService } from './mission-date.service';

describe('MissionDateService', () => {
  describe('toDatesSortedAsc', () => {
    it('should convert and sort dates', () => {
      const missionDates: MissionDate[] = [
        { date: '2020-01-01', timeBegin: '08:00', timeEnd: '18:00' },
        { date: '2020-01-02', timeBegin: '08:00', timeEnd: '18:00' },
      ];

      const dates = MissionDateService.toDatesSortedAsc(missionDates);

      expect(dates.length).toBe(4);
      expect(dates[0] instanceof Date).toBe(true);
      expect(dates[1] instanceof Date).toBe(true);
      expect(dates[2] instanceof Date).toBe(true);
      expect(dates[3] instanceof Date).toBe(true);
      expect(dates[0].getTime()).toBe(1577865600000);
      expect(dates[1].getTime()).toBe(1577901600000);
      expect(dates[2].getTime()).toBe(1577952000000);
      expect(dates[3].getTime()).toBe(1577988000000);
    });
  });
});
