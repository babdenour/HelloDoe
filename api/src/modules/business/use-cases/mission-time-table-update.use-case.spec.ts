import { MissionRepositoryProviderFactory } from '@database';
import { TestUtils } from '@mocks/test-utils';
import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UseCaseNames } from '../constants/use-case-names';
import { MissionImpl } from '../domains/mission.impl';
import { TimeTableHourlyVolumeUnit } from '../domains/time-table';
import { TimeTableImpl } from '../domains/time-table.impl';
import { MissionFactory } from '../factories/mission.factory';
import { TimeTableFactory } from '../factories/time-table.factory';
import { MissionTimeTableUpdateUseCaseProviderFactory, TimeTableServiceProviderFactory } from '../providers';
import { MissionTimeTableUpdateUseCase } from './mission-time-table-update.use-case';

let useCase: MissionTimeTableUpdateUseCase;
const MissionTimeTableUpdateUseCaseProvider: Provider = MissionTimeTableUpdateUseCaseProviderFactory();

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      MissionRepositoryProviderFactory({
        useValue: {
          save: jest.fn().mockImplementation((mission: MissionImpl) => mission),
        },
      }),
      TimeTableServiceProviderFactory({
        useValue: {
          validateShifts: jest.fn(),
        },
      }),
      MissionTimeTableUpdateUseCaseProvider,
    ],
    exports: [MissionTimeTableUpdateUseCaseProvider],
  }).compile();

  useCase = module.get<MissionTimeTableUpdateUseCase>(UseCaseNames.MISSION_TIME_TABLE_UPDATE);
};

describe('MissionTimeTableUpdateUseCase', () => {
  beforeEach(async () => {
    await createApp();
  });

  describe('when happy path', () => {
    const MISSION_ID: string = TestUtils.genMongoId();
    const SLOT_ID: string = TestUtils.genMongoId();
    const SHIFT_ID: string = TestUtils.genMongoId();

    let MISSION: MissionImpl;
    let timeTable: TimeTableImpl;

    beforeEach(() => {
      MISSION = MissionFactory.create({
        id: MISSION_ID,
      });

      timeTable = TimeTableFactory.create({
        beginAt: 10,
        endAt: 100,
        duration: 90,
        hourlyVolume: {
          unit: TimeTableHourlyVolumeUnit.WEEK,
          volume: 4,
          flexible: false,
        },
        schedule: {
          slots: [
            {
              id: SLOT_ID,
              beginTime: 10,
              endTime: 100,
              flexible: false,
            },
          ],
          shifts: [
            {
              id: SHIFT_ID,
              date: 1000,
              slots: [SLOT_ID],
            },
          ],
          flexible: false,
        },
      });
    });

    it('should update timetable', async () => {
      const savedMission: MissionImpl = await useCase.run(MISSION, timeTable);

      expect(savedMission.timeTable.beginAt).toBe(10);
      expect(savedMission.timeTable.endAt).toBe(100);
      expect(savedMission.timeTable.duration).toBe(90);
      expect(savedMission.timeTable.hourlyVolume.unit).toBe(TimeTableHourlyVolumeUnit.WEEK);
      expect(savedMission.timeTable.hourlyVolume.volume).toBe(4);
      expect(savedMission.timeTable.hourlyVolume.flexible).toBe(false);
      expect(savedMission.timeTable.schedule.slots.length).toBe(1);
      expect(savedMission.timeTable.schedule.slots[0].id).toBe(SLOT_ID);
      expect(savedMission.timeTable.schedule.slots[0].beginTime).toBe(10);
      expect(savedMission.timeTable.schedule.slots[0].endTime).toBe(100);
      expect(savedMission.timeTable.schedule.slots[0].flexible).toBe(false);
      expect(savedMission.timeTable.schedule.shifts.length).toBe(1);
      expect(savedMission.timeTable.schedule.shifts[0].id).toBe(SHIFT_ID);
      expect(savedMission.timeTable.schedule.shifts[0].date).toBe(1000);
      expect(savedMission.timeTable.schedule.shifts[0].slots).toEqual([SLOT_ID]);
      expect(savedMission.timeTable.schedule.flexible).toBe(false);
    });
  });
});
