import { ContractType } from '../constants/contract-type';
import { MissionStatus } from '../constants/mission-status';
import { MissionTask } from '../constants/mission-task';
import { MissionLocationImpl } from '../domains/mission-location.impl';
import { MissionPaymentUnit } from '../domains/mission-payment';
import { MissionPaymentImpl } from '../domains/mission-payment.impl';
import { MissionImpl } from '../domains/mission.impl';
import { TimeTableImpl } from '../domains/time-table.impl';
import { MissionFactory } from './mission.factory';

describe('MissionFactory', () => {
  describe('create', () => {
    it('should create mission with default values', () => {
      const mission: MissionImpl = MissionFactory.create();

      expect(mission.id).toBe(undefined);
      expect(mission.agency).toBe(undefined);
      expect(mission.client).toBe(undefined);
      expect(mission.contractType).toBe(ContractType.FREELANCE);
      expect(mission.img).toBe('');
      expect(mission.code).toBe(undefined);
      expect(mission.description).toBe('');
      expect(mission.address).toBe('');
      expect(mission.district).toBe(0);
      expect(mission.category).toBe('');
      expect(mission.tasks).toEqual([]);
      expect(mission.requirements.attributes).toEqual([]);
      expect(mission.requirements.skills).toEqual([]);
      expect(mission.requirements.tools).toEqual([]);
      expect(mission.dates).toEqual([]);
      expect(mission.startDate).toEqual(undefined);
      expect(mission.endDate).toEqual(undefined);
      expect(mission.nbWorkers).toEqual(0);
      expect(mission.type).toEqual(0);
      expect(mission.status).toEqual(MissionStatus.FOR_VALIDATION);
      expect(mission.amount).toEqual(0);
      expect(mission.seenBy).toEqual([]);
      expect(mission.applicants).toEqual([]);
      expect(mission.hired).toEqual([]);
      expect(mission.reviews).toEqual([]);
    });

    it('should create mission with specified values', () => {
      const mission: MissionImpl = MissionFactory.create({
        createdAt: 10,
        updatedAt: 100,
        id: '1',
        agency: '3',
        client: '2',
        contractType: ContractType.CDD,
        img: 'https://sw.ag',
        code: 'HD001',
        description: 'description',
        address: '26 Boulevard',
        district: 10,
        category: 'hefting',
        tasks: [MissionTask.CATERING_SERVICE, MissionTask.CATERING_OENOLOGY],
        requirements: {
          attributes: ['attribute0', 'attribute1'],
          skills: ['skill0', 'skill1'],
          tools: ['tool0', 'tool1'],
        },
        dates: [
          {
            date: '2020-10-28',
            timeBegin: '08:00',
            timeEnd: '18:00',
          },
        ],
        nbWorkers: 10,
        type: 1,
        status: MissionStatus.BEING_PREPARED,
        amount: 1000,
        seenBy: ['seen0'],
        applicants: ['applicant0'],
        hired: ['hired0'],
      });

      expect(mission.createdAt).toBe(10);
      expect(mission.updatedAt).toBe(100);
      expect(mission.id).toBe('1');
      expect(mission.agency).toBe('3');
      expect(mission.client).toBe('2');
      expect(mission.contractType).toBe(ContractType.CDD);
      expect(mission.img).toBe('https://sw.ag');
      expect(mission.code).toBe('HD001');
      expect(mission.description).toBe('description');
      expect(mission.address).toBe('26 Boulevard');
      expect(mission.district).toBe(10);
      expect(mission.category).toBe('hefting');
      expect(mission.tasks).toEqual([MissionTask.CATERING_SERVICE, MissionTask.CATERING_OENOLOGY]);
      expect(mission.requirements.attributes).toEqual(['attribute0', 'attribute1']);
      expect(mission.requirements.skills).toEqual(['skill0', 'skill1']);
      expect(mission.requirements.tools).toEqual(['tool0', 'tool1']);
      expect(mission.dates).toEqual([
        {
          date: '2020-10-28',
          timeBegin: '08:00',
          timeEnd: '18:00',
        },
      ]);
      expect(mission.nbWorkers).toEqual(10);
      expect(mission.type).toEqual(1);
      expect(mission.status).toEqual(MissionStatus.BEING_PREPARED);
      expect(mission.amount).toEqual(1000);
      expect(mission.seenBy).toEqual(['seen0']);
      expect(mission.applicants).toEqual(['applicant0']);
      expect(mission.hired).toEqual(['hired0']);
    });

    it('should instantiate time table impl', () => {
      const mission: MissionImpl = MissionFactory.create();
      expect(mission.timeTable instanceof TimeTableImpl).toBe(true);
    });

    it('should instantiate location impl', () => {
      const mission: MissionImpl = MissionFactory.create();
      expect(mission.location instanceof MissionLocationImpl).toBe(true);
    });

    it('should instantiate payment impl', () => {
      const mission: MissionImpl = MissionFactory.create();
      expect(mission.payment instanceof MissionPaymentImpl).toBe(true);
    });
  });

  describe('create location', () => {
    it('should create location with default values', () => {
      const location: MissionLocationImpl = MissionFactory.createLocation();

      expect(location.addressLine1).toBe('');
      expect(location.zipCode).toBe('');
    });

    it('should create location with specified values', () => {
      const location: MissionLocationImpl = MissionFactory.createLocation({
        addressLine1: 'addressLine1',
        zipCode: 'zipCode',
      });

      expect(location.addressLine1).toBe('addressLine1');
      expect(location.zipCode).toBe('zipCode');
    });
  });

  describe('create payment', () => {
    it('should create payment with default values', () => {
      const payment: MissionPaymentImpl = MissionFactory.createPayment();

      expect(payment.amount).toBe(0);
      expect(payment.unit).toBe(MissionPaymentUnit.HOUR);
    });

    it('should create payment with specified values', () => {
      const payment: MissionPaymentImpl = MissionFactory.createPayment({
        amount: 1000,
        unit: MissionPaymentUnit.MISSION,
      });

      expect(payment.amount).toBe(1000);
      expect(payment.unit).toBe(MissionPaymentUnit.MISSION);
    });
  });
});
