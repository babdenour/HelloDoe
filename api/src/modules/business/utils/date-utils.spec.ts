import { DateUtils } from './date-utils';

describe('DateUtils', () => {
  describe('when sort dates ascending', () => {
    it('should sort dates', () => {
      const dates: Date[] = [
        new Date(2000),
        new Date(1000),
        new Date(3000),
      ];

      const sortedDates = dates.sort(DateUtils.sorterAsc);

      expect(sortedDates[0].getTime()).toBe(1000);
      expect(sortedDates[1].getTime()).toBe(2000);
      expect(sortedDates[2].getTime()).toBe(3000);
    });
  });
});
