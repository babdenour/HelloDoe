import { MissionTask } from '@business/constants/mission-task';
import { MissionRepositoryProviderFactory } from '@database';
import { Test, TestingModule } from '@nestjs/testing';

import { ContractType } from '../constants/contract-type';
import { MissionStatus } from '../constants/mission-status';
import { UseCaseNames } from '../constants/use-case-names';
import { MissionImpl } from '../domains/mission.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { MissionFactory } from '../factories/mission.factory';
import { AgencyServiceProviderFactory, MissionUpdateUseCaseProviderFactory } from '../providers';
import { MissionUpdatableFields, MissionUpdateUseCase } from './mission-update.use-case';

let missionUpdateUseCase: MissionUpdateUseCase;

let mockDoesAgencyExistById = jest.fn();
let mockSaveMission = jest.fn();

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AgencyServiceProviderFactory({
        useValue: {
          doesAgencyExistById: mockDoesAgencyExistById,
        },
      }),
      MissionRepositoryProviderFactory({
        useValue: {
          save: mockSaveMission,
        },
      }),
      MissionUpdateUseCaseProviderFactory(),
    ],
    exports: [MissionUpdateUseCaseProviderFactory()],
  }).compile();

  missionUpdateUseCase = module.get<MissionUpdateUseCase>(UseCaseNames.MISSION_UPDATE);
};

describe('MissionUpdateUseCase', () => {
  beforeEach(async () => {
    mockDoesAgencyExistById = jest.fn().mockResolvedValue(true);
    mockSaveMission = jest.fn((mission: MissionImpl) => mission);
    await createApp();
  });

  describe('when can update mission', () => {
    let MISSION: MissionImpl;
    let UPDATABLE_FIELDS: MissionUpdatableFields;

    beforeEach(() => {
      MISSION = MissionFactory.create({
        address: 'address',
        agency: 'agency',
        amount: 1,
        category: 'category',
        client: 'client',
        code: 'code',
        contractType: ContractType.FREELANCE,
        dates: [
          {
            date: '30-12-2020',
            timeBegin: '10:00',
            timeEnd: '18:00',
          },
        ],
        description: 'description',
        district: 1,
        img: 'img',
        nbWorkers: 1,
        requirements: {
          attributes: ['attribute'],
          skills: ['skill'],
          tools: ['tool'],
        },
        status: MissionStatus.TO_BE_PAID_BY_CLIENT,
        tasks: [MissionTask.CATERING_SERVICE],
      });
      UPDATABLE_FIELDS = {
        address: 'new address',
        agency: 'new agency',
        amount: 2,
        category: 'new category',
        client: 'new client',
        code: 'new code',
        contractType: ContractType.CDI,
        dates: [],
        description: 'new description',
        district: 2,
        nbWorkers: 2,
        requirements: {
          attributes: ['new attribute'],
          skills: ['new skill'],
          tools: ['new tool'],
        },
        status: MissionStatus.BEING_PREPARED,
        tasks: [MissionTask.CATERING_OENOLOGY],
      };
    });

    it('should update mission', async () => {
      const missionUpdated = await missionUpdateUseCase.run(MISSION, UPDATABLE_FIELDS);

      expect(missionUpdated.address).toBe('new address');
      expect(missionUpdated.agency).toBe('new agency');
      expect(missionUpdated.amount).toBe(2);
      expect(missionUpdated.category).toBe('new category');
      expect(missionUpdated.client).toBe('new client');
      expect(missionUpdated.code).toBe('new code');
      expect(missionUpdated.contractType).toBe(ContractType.CDI);
      expect(missionUpdated.dates).toEqual([]);
      expect(missionUpdated.description).toBe('new description');
      expect(missionUpdated.district).toBe(2);
      expect(missionUpdated.nbWorkers).toBe(2);
      expect(missionUpdated.requirements.attributes).toEqual(['new attribute']);
      expect(missionUpdated.requirements.skills).toEqual(['new skill']);
      expect(missionUpdated.requirements.tools).toEqual(['new tool']);
      expect(missionUpdated.status).toBe(MissionStatus.BEING_PREPARED);
      expect(missionUpdated.tasks).toEqual([MissionTask.CATERING_OENOLOGY]);
    });

    it('should update only accepted field', async () => {
      const extendedFields = { ...UPDATABLE_FIELDS, img: 'new img' };
      const missionUpdated = await missionUpdateUseCase.run(MISSION, extendedFields);

      expect(missionUpdated.img).toBe('img');
    });
  });

  describe('if mission does not exist', () => {
    const MISSION = MissionFactory.create();
    const UPDATABLE_FIELDS: MissionUpdatableFields = {} as MissionUpdatableFields;

    beforeEach(async () => {
      mockDoesAgencyExistById = jest.fn().mockResolvedValue(false);
      await createApp();
    });

    it('should raise BusinessError H00006', async () => {
      expect.assertions(1);

      try {
        await missionUpdateUseCase.run(MISSION, UPDATABLE_FIELDS);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00006_AGENCY_NOT_FOUND);
        }
      }
    });
  });
});
