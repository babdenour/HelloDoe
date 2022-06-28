import { ContractType, MissionBusinessImpl, MissionFactory, MissionTask } from '@business';

import { MissionDto, MissionPaymentUnit } from '../dtos/mission.dto';
import { TimetableDto } from '../dtos/timetable.dto';
import { MissionAdapter } from './mission.adapter';

describe('MissionAdapter', () => {
  describe('when convert to api', () => {
    const MISSION: MissionBusinessImpl = MissionFactory.create({
      id: '1',
      agency: '3',
      client: '2',
      img: 'https://url.com',
      contractType: ContractType.FREELANCE,
      code: 'code',
      description: 'description',
      address: 'address',
      district: 0,
      category: 'category',
      tasks: [MissionTask.CATERING_SERVICE, MissionTask.CATERING_OENOLOGY],
      requirements: {
        attributes: ['attribute1', 'attribute2'],
        skills: ['skill1', 'skill2'],
        tools: ['tool1', 'tool2'],
      },
      dates: [
        {
          date: '1970-01-01',
          timeBegin: '08:00',
          timeEnd: '18:00',
        },
      ],
      nbWorkers: 10,
      payment: MissionFactory.createPayment({
        amount: 1000,
        unit: MissionPaymentUnit.HOUR,
      }),
      type: 0,
      status: 'status',
      amount: 200,
      seenBy: [],
      applicants: [],
      hired: [],
      reviews: [],
    });

    it('should convert to api', () => {
      const mission: MissionDto = MissionAdapter.toApi(MISSION);

      expect(mission.id).toBe('1');
      expect(mission.agency).toBe('3');
      expect(mission.clientId).toBe('2');
      expect(mission.contractType).toBe(ContractType.FREELANCE);
      expect(mission.img).toBe('https://url.com');
      expect(mission.code).toBe('code');
      expect(mission.description).toBe('description');
      expect(mission.address).toBe('address');
      expect(mission.district).toBe(0);
      expect(mission.category).toBe('category');
      expect(mission.tasks).toEqual([MissionTask.CATERING_SERVICE, MissionTask.CATERING_OENOLOGY]);
      expect(mission.requirements.attributes).toEqual(['attribute1', 'attribute2']);
      expect(mission.requirements.skills).toEqual(['skill1', 'skill2']);
      expect(mission.requirements.tools).toEqual(['tool1', 'tool2']);
      expect(mission.dates).toEqual([
        {
          date: '1970-01-01',
          timeBegin: '08:00',
          timeEnd: '18:00',
        },
      ]);
      expect(mission.startDate).toBe(28800000);
      expect(mission.endDate).toBe(64800000);
      expect(mission.nbWorkers).toBe(10);
      expect(mission.payment.amount).toBe(1000);
      expect(mission.payment.unit).toBe(MissionPaymentUnit.HOUR);
      expect(mission.type).toBe(0);
      expect(mission.status).toBe('status');
      expect(mission.amount).toBe(200);
      expect(mission.seenBy).toEqual([]);
      expect(mission.applicants).toEqual([]);
      expect(mission.hired).toEqual([]);
      expect(mission.reviews).toEqual([]);
    });

    it('should convert timetable to api', () => {
      const mission: MissionDto = MissionAdapter.toApi(MISSION);

      expect(mission.timeTable instanceof TimetableDto).toBe(true);
    });
  });
});
