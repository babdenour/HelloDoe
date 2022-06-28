import { addMonths } from 'date-fns';
import { floor } from 'lodash';

import { ContractType } from '../constants/contract-type';
import { MissionDate } from '../domains/mission';
import { MissionImpl } from '../domains/mission.impl';
import { MissionFactory } from '../factories/mission.factory';
import { TimeTableFactory } from '../factories/time-table.factory';
import { MissionPaymentUnit } from './mission-payment';
import { TimeTableHourlyVolumeUnit } from './time-table';

let mission: MissionImpl;

const createMissionCdd = (): MissionImpl =>
  MissionFactory.create({
    contractType: ContractType.CDD,
    payment: MissionFactory.createPayment({
      amount: 1000,
      unit: MissionPaymentUnit.HOUR,
    }),
    timeTable: TimeTableFactory.create({
      duration: addMonths(0, 1).getTime(),
      hourlyVolume: TimeTableFactory.createHourlyVolume({
        volume: 8,
        unit: TimeTableHourlyVolumeUnit.DAY,
        flexible: false,
      }),
      schedule: TimeTableFactory.createSchedule({
        shifts: [TimeTableFactory.createShift(), TimeTableFactory.createShift(), TimeTableFactory.createShift(), TimeTableFactory.createShift(), TimeTableFactory.createShift()],
        flexible: false,
      }),
    }),
  });

const createMissionFreelance = (): MissionImpl =>
  MissionFactory.create({
    contractType: ContractType.FREELANCE,
    payment: MissionFactory.createPayment({
      amount: 1000,
      unit: MissionPaymentUnit.MISSION,
    }),
    timeTable: TimeTableFactory.create({
      duration: addMonths(0, 1).getTime(),
      hourlyVolume: TimeTableFactory.createHourlyVolume({
        volume: 8,
        unit: TimeTableHourlyVolumeUnit.DAY,
        flexible: false,
      }),
      schedule: TimeTableFactory.createSchedule({
        shifts: [
          TimeTableFactory.createShift({
            slots: ['A', 'B'],
          }),
          TimeTableFactory.createShift({
            slots: ['A', 'B'],
          }),
          TimeTableFactory.createShift({
            slots: ['A', 'B'],
          }),
          TimeTableFactory.createShift({
            slots: ['A', 'B'],
          }),
          TimeTableFactory.createShift({
            slots: ['A', 'B'],
          }),
        ],
        flexible: false,
      }),
    }),
  });

describe('MissionImpl', () => {
  beforeEach(() => {
    mission = MissionFactory.create();
  });

  describe('when set dates', () => {
    it('should update start date and end date', () => {
      const dates: MissionDate[] = [
        { date: '2020-01-01', timeBegin: '08:00', timeEnd: '18:00' },
        { date: '2020-01-02', timeBegin: '08:00', timeEnd: '18:00' },
      ];

      mission.setDates(dates);

      expect(mission.startDate).toBe(1577865600000);
      expect(mission.endDate).toBe(1577988000000);
    });
  });

  describe('addApplicant', () => {
    describe('if the doer has not applied', () => {
      it('should add the doer has applicant', () => {
        const doerId: string = '1';

        mission.addApplicant(doerId);

        expect(mission.applicants.length).toBe(1);
        expect(mission.applicants).toEqual([doerId]);
      });
    });

    describe('if the doer has already applied', () => {
      const doerId: string = '1';

      beforeEach(() => {
        mission.addApplicant(doerId);
      });

      it('should not add the doer one more time', () => {
        mission.addApplicant(doerId);

        expect(mission.applicants.length).toBe(1);
        expect(mission.applicants).toEqual([doerId]);
      });
    });
  });

  describe('hasDoerApplied', () => {
    describe('if the doer has applied', () => {
      const doerId: string = '1';

      beforeEach(() => {
        mission = MissionFactory.create({
          applicants: [doerId],
        });
      });

      it('should return true', () => {
        const hasApplied: boolean = mission.hasDoerApplied(doerId);

        expect(hasApplied).toBe(true);
      });
    });

    describe('if the doer has not applied', () => {
      it('should return false', () => {
        const hasApplied: boolean = mission.hasDoerApplied('1');

        expect(hasApplied).toBe(false);
      });
    });
  });

  describe('isDoerHired', () => {
    describe('if the doer has been hired', () => {
      const doerId: string = '1';

      beforeEach(() => {
        mission = MissionFactory.create({
          hired: [doerId],
        });
      });

      it('should return true', () => {
        const isHired: boolean = mission.isDoerHired(doerId);

        expect(isHired).toBe(true);
      });
    });

    describe('if the doer has not been hired', () => {
      it('should return false', () => {
        const isHired: boolean = mission.isDoerHired('1');

        expect(isHired).toBe(false);
      });
    });
  });

  describe('when compute total pay', () => {
    describe('when CDD with hourly volume per day', () => {
      const MISSION: MissionImpl = createMissionCdd();

      it('should compute total pay', () => {
        const totalPay: number = MISSION.computeTotalPay();

        expect(totalPay).toBe(400);
      });
    });

    describe('when freelance', () => {
      const MISSION: MissionImpl = createMissionFreelance();

      it('should compute total pay', () => {
        const totalPay: number = MISSION.computeTotalPay();

        expect(totalPay).toBe(100);
      });
    });

    describe('when cant compute total pay', () => {
      const MISSION: MissionImpl = MissionFactory.create();

      it('should throw error', () => {
        expect(() => MISSION.computeTotalPay()).toThrowError();
      });
    });
  });

  describe('when compute pay per month', () => {
    describe('when CDD with hourly volume per day', () => {
      const MISSION: MissionImpl = createMissionCdd();

      it('should compute pay per month', () => {
        const payPerMonth: number = floor(MISSION.computePayPerMonth());

        expect(payPerMonth).toBe(387);
      });
    });

    describe('when freelance', () => {
      const MISSION: MissionImpl = createMissionFreelance();

      it('should compute pay per month', () => {
        const payPerMonth: number = floor(MISSION.computePayPerMonth());

        expect(payPerMonth).toBe(96);
      });
    });

    describe('when cant compute pay per month', () => {
      const MISSION: MissionImpl = MissionFactory.create();

      it('should throw error', () => {
        expect(() => MISSION.computePayPerMonth()).toThrowError();
      });
    });
  });
});
