import { MissionFactory } from '../factories/mission.factory';
import { MissionPaymentUnit } from './mission-payment';

describe('MissionPaymentImpl', () => {
  describe('when get whole amount', () => {
    it('should return whole amount', () => {
      expect(MissionFactory.createPayment({ amount: 1000 }).getWholeAmount()).toBe(10.0);
    });
  });

  describe('when indicate is per hour', () => {
    it('should indicate is per hour', () => {
      expect(MissionFactory.createPayment({ unit: MissionPaymentUnit.HOUR }).isPerHour()).toBe(true);
    });

    it('should indicate is not per hour', () => {
      expect(MissionFactory.createPayment({ unit: MissionPaymentUnit.MISSION }).isPerHour()).toBe(false);
    });
  });

  describe('when indicate is per mission', () => {
    it('should indicate is per mission', () => {
      expect(MissionFactory.createPayment({ unit: MissionPaymentUnit.MISSION }).isPerMission()).toBe(true);
    });

    it('should indicate is not per mission', () => {
      expect(MissionFactory.createPayment({ unit: MissionPaymentUnit.HOUR }).isPerMission()).toBe(false);
    });
  });
});
