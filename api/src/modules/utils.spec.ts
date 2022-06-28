import { Utils } from './utils';

describe('Utils', () => {
  describe('areAllTrue', () => {
    describe('when all true', () => {
      const BOOLS = [true, true, true];

      it('should return true', () => {
        expect(Utils.areAllTrue(BOOLS)).toBe(true);
      });
    });

    describe('when one false', () => {
      const BOOLS = [true, false, true];

      it('should return false', () => {
        expect(Utils.areAllTrue(BOOLS)).toBe(false);
      });
    });

    describe('when empty', () => {
      const BOOLS = [];

      it('should return true', () => {
        expect(Utils.areAllTrue(BOOLS)).toBe(true);
      });
    });
  });
});
