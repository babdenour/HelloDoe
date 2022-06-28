import { AgencyRepositoryProviderFactory } from '@database';
import { Test, TestingModule } from '@nestjs/testing';

import { ServiceNames } from '../constants/service-names';
import { AgencyFactory } from '../factories/agency.factory';
import { AgencyServiceProviderFactory } from '../providers';
import { AgencyService } from './agency.service';

let agencySvc: AgencyService;

let mockFindById = jest.fn();

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AgencyRepositoryProviderFactory({
        useValue: {
          findById: mockFindById,
        },
      }),
      AgencyServiceProviderFactory(),
    ],
    exports: [AgencyServiceProviderFactory()],
  }).compile();

  agencySvc = module.get<AgencyService>(ServiceNames.AGENCY);
};

describe('AgencyService', () => {
  beforeEach(async () => {
    mockFindById = jest.fn().mockResolvedValue(AgencyFactory.create());
    await createApp();
  });

  describe('when check if agency exists', () => {
    describe('if exists', () => {
      it('should return true', async () => {
        const doesExist: boolean = await agencySvc.doesAgencyExistById('1');

        expect(doesExist).toBe(true);
      });
    });

    describe('if does not exist', () => {
      beforeEach(async () => {
        mockFindById = jest.fn().mockResolvedValue(null);
        await createApp();
      });

      it('should return false', async () => {
        const doesExist: boolean = await agencySvc.doesAgencyExistById('1');

        expect(doesExist).toBe(false);
      });
    });
  });
});
