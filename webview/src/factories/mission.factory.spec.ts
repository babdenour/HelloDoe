import { ContractType } from '@constants/contract-type';
import { MissionCategory } from '@constants/mission-category';
import { MissionStatus } from '@constants/mission-status';
import { MissionTask } from '@constants/mission-task';
import { Mission } from '@domains/mission';
import { MissionLocation } from '@domains/mission-location';
import { MissionPayment, MissionPaymentUnit } from '@domains/mission-payment';
import { TimeTable } from '@domains/time-table';
import { MissionFactory } from '@factories/mission.factory';

describe('MissionFactory', () => {
  describe('create', () => {
    it('should create mission with default values', () => {
      const mission: Mission = MissionFactory.create();

      expect(mission.id).toBe(undefined);
      expect(mission.agency).toBe(undefined);
      expect(mission.client).toBe(undefined);
      expect(mission.contractType).toBe(ContractType.FREELANCE);
      expect(mission.code).toBe(undefined);
      expect(mission.description).toBe('');
      expect(mission.category).toBe(MissionCategory.ACCESS_CONTROL);
      expect(mission.tasks).toEqual([]);
      expect(mission.requirements.attributes).toEqual([]);
      expect(mission.requirements.skills).toEqual([]);
      expect(mission.requirements.tools).toEqual([]);
      expect(mission.nbWorkers).toEqual(0);
      expect(mission.status).toEqual(MissionStatus.FOR_VALIDATION);
      expect(mission.amount).toEqual(0);
      expect(mission.seenBy).toEqual([]);
      expect(mission.applicants).toEqual([]);
      expect(mission.hired).toEqual([]);
    });

    it('should create mission with specified values', () => {
      const mission: Mission = MissionFactory.create({
        createdAt: 10,
        updatedAt: 100,
        id: '1',
        agency: '3',
        client: '2',
        contractType: ContractType.CDD,
        code: 'HD001',
        description: 'description',
        category: MissionCategory.MOVING,
        tasks: [MissionTask.CATERING_SERVICE, MissionTask.CATERING_OENOLOGY],
        requirements: {
          attributes: ['attribute0', 'attribute1'],
          skills: ['skill0', 'skill1'],
          tools: ['tool0', 'tool1'],
        },
        nbWorkers: 10,
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
      expect(mission.code).toBe('HD001');
      expect(mission.description).toBe('description');
      expect(mission.category).toBe(MissionCategory.MOVING);
      expect(mission.tasks).toEqual([MissionTask.CATERING_SERVICE, MissionTask.CATERING_OENOLOGY]);
      expect(mission.requirements.attributes).toEqual(['attribute0', 'attribute1']);
      expect(mission.requirements.skills).toEqual(['skill0', 'skill1']);
      expect(mission.requirements.tools).toEqual(['tool0', 'tool1']);
      expect(mission.nbWorkers).toEqual(10);
      expect(mission.status).toEqual(MissionStatus.BEING_PREPARED);
      expect(mission.amount).toEqual(1000);
      expect(mission.seenBy).toEqual(['seen0']);
      expect(mission.applicants).toEqual(['applicant0']);
      expect(mission.hired).toEqual(['hired0']);
    });

    it('should instantiate time table impl', () => {
      const mission: Mission = MissionFactory.create();
      expect(mission.timeTable instanceof TimeTable).toBe(true);
    });

    it('should instantiate location impl', () => {
      const mission: Mission = MissionFactory.create();
      expect(mission.location instanceof MissionLocation).toBe(true);
    });

    it('should instantiate payment impl', () => {
      const mission: Mission = MissionFactory.create();
      expect(mission.payment instanceof MissionPayment).toBe(true);
    });
  });

  describe('create location', () => {
    it('should create location with default values', () => {
      const location: MissionLocation = MissionFactory.createLocation();

      expect(location.addressLine1).toBe('');
      expect(location.zipCode).toBe('');
    });

    it('should create location with specified values', () => {
      const location: MissionLocation = MissionFactory.createLocation({
        addressLine1: 'addressLine1',
        zipCode: 'zipCode',
      });

      expect(location.addressLine1).toBe('addressLine1');
      expect(location.zipCode).toBe('zipCode');
    });
  });

  describe('create payment', () => {
    it('should create payment with default values', () => {
      const payment: MissionPayment = MissionFactory.createPayment();

      expect(payment.amount).toBe(0);
      expect(payment.unit).toBe(MissionPaymentUnit.HOUR);
    });

    it('should create payment with specified values', () => {
      const payment: MissionPayment = MissionFactory.createPayment({
        amount: 1000,
        unit: MissionPaymentUnit.MISSION,
      });

      expect(payment.amount).toBe(1000);
      expect(payment.unit).toBe(MissionPaymentUnit.MISSION);
    });
  });
});
