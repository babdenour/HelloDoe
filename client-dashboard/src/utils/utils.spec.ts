import { moveDown, moveUp } from '@/utils/utils';

describe(`utils`, () => {
  describe(`moveDown`, () => {
    describe(`if item not last`, () => {
      it(`should move item down`, async () => {
        expect(moveDown(['1', '2'], (str: string) => str === '1')).toEqual(['2', '1']);
      });
    });

    describe(`if item last`, () => {
      it(`should do nothing`, async () => {
        expect(moveDown(['2', '1'], (str: string) => str === '1')).toEqual(['2', '1']);
      });
    });

    describe(`if condition false`, () => {
      const MOVED: string = '1';
      const COLLATERAL: string = '2';

      it(`should do nothing`, async () => {
        expect(
          moveDown(
            [MOVED, COLLATERAL],
            (str: string) => str === '1',
            (_: string, collateral: string) => collateral !== COLLATERAL,
          ),
        ).toEqual([MOVED, COLLATERAL]);
      });
    });
  });

  describe(`moveUp`, () => {
    describe(`if item not first`, () => {
      it(`should move item up`, async () => {
        expect(moveUp(['2', '1'], (str: string) => str === '1')).toEqual(['1', '2']);
      });
    });

    describe(`if item first`, () => {
      it(`should do nothing`, async () => {
        expect(moveUp(['1', '2'], (str: string) => str === '1')).toEqual(['1', '2']);
      });
    });
  });
});
