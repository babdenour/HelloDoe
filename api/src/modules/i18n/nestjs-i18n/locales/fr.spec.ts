import { addDays, formatRelative } from 'date-fns';

import { fr } from './fr';

describe('Locale fr', () => {
  describe('when format relative', () => {
    describe('when past week', () => {
      const REF_TIMESTAMP = 1630074737000;
      const TARGET_TIMESTAMP = addDays(REF_TIMESTAMP, -3).getTime();

      it('should display correctly', () => {
        expect(
          formatRelative(TARGET_TIMESTAMP, REF_TIMESTAMP, {
            locale: fr,
          }),
        ).toBe('mardi dernier à 14:32');
      });
    });

    describe('when yesterday', () => {
      const REF_TIMESTAMP = 1630074737000;
      const TARGET_TIMESTAMP = addDays(REF_TIMESTAMP, -1).getTime();

      it('should display correctly', () => {
        expect(
          formatRelative(TARGET_TIMESTAMP, REF_TIMESTAMP, {
            locale: fr,
          }),
        ).toBe('hier à 14:32');
      });
    });

    describe('when today', () => {
      const REF_TIMESTAMP = 1630074737000;
      const TARGET_TIMESTAMP = addDays(REF_TIMESTAMP, 0).getTime();

      it('should display correctly', () => {
        expect(
          formatRelative(TARGET_TIMESTAMP, REF_TIMESTAMP, {
            locale: fr,
          }),
        ).toBe('aujourd’hui à 14:32');
      });
    });

    describe('when tomorrow', () => {
      const REF_TIMESTAMP = 1630074737000;
      const TARGET_TIMESTAMP = addDays(REF_TIMESTAMP, 1).getTime();

      it('should display correctly', () => {
        expect(
          formatRelative(TARGET_TIMESTAMP, REF_TIMESTAMP, {
            locale: fr,
          }),
        ).toBe('demain à 14:32');
      });
    });

    describe('when next week', () => {
      const REF_TIMESTAMP = 1630074737000;
      const TARGET_TIMESTAMP = addDays(REF_TIMESTAMP, 4).getTime();

      it('should display correctly', () => {
        expect(
          formatRelative(TARGET_TIMESTAMP, REF_TIMESTAMP, {
            locale: fr,
          }),
        ).toBe('mardi prochain à 14:32');
      });
    });

    describe('when 7+ days away from date of reference', () => {
      const TARGET_TIMESTAMP = 1632753137000;
      const REF_TIMESTAMP = 1630074737000;

      it('should display correctly', () => {
        expect(
          formatRelative(TARGET_TIMESTAMP, REF_TIMESTAMP, {
            locale: fr,
          }),
        ).toBe('lundi 27 septembre 2021');
      });
    });
  });
});
