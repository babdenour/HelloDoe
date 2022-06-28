import { MissionService, MissionServiceProviderFactory } from '@business';
import { mockMissionSvc, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule } from '@token';

import { CandidatesUpdateRule } from './candidates-update.rule';

let candidateUpdateRule: CandidatesUpdateRule;

let mockedMissionService: Partial<MissionService>;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [TokenModule],
    providers: [MissionServiceProviderFactory({ useValue: mockedMissionService }), CandidatesUpdateRule],
  }).compile();

  candidateUpdateRule = module.get<CandidatesUpdateRule>(CandidatesUpdateRule);
};

describe('CandidatesUpdateRule', () => {
  beforeEach(async () => {
    mockedMissionService = mockMissionSvc();
    await createApp();
  });

  describe('when check if has own permission', () => {
    const MISSION_ID = TestUtils.genMongoId();
    const CLIENT_ID = TestUtils.genMongoId();

    beforeEach(async () => {
      mockedMissionService.isOwnedByClient = jest.fn().mockResolvedValue(true);
      await createApp();
    });

    it('should pass', async () => {
      const isOwned = await candidateUpdateRule.own({ missionId: MISSION_ID, clientId: CLIENT_ID });

      expect(isOwned).toBe(true);
    });
  });

  describe('when check if has any permission', () => {
    it('should pass', () => {
      const isAnyChecked = candidateUpdateRule.any();

      expect(isAnyChecked).toBe(true);
    });
  });
});
