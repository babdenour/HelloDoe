import * as Worker from './Worker';

import {
  cleanDatabase,
  connectDatabase,
  disconnectDatabase,
} from '../mocks/database-mock';

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await disconnectDatabase();
});

afterEach(async () => {
  await cleanDatabase();
});

describe('WorkerModel', () => {
  describe('doesNeedToCompleteFreelanceProcess', () => {
    it('should detect if Doer needs to complete freelance process', async () => {
      expect.assertions(3);
      const worker: any = await Worker.create({ workProfile: {} });

      let needsTo = worker.doesNeedToCompleteFreelanceProcess();
      expect(needsTo).toBe(true);

      worker.workProfile.hasCompletedFreelanceProcess = true;
      needsTo = worker.doesNeedToCompleteFreelanceProcess();
      expect(needsTo).toBe(false);

      worker.workProfile.hasCompletedFreelanceProcess = false;
      worker.workProfile.siret = '1234567890';
      needsTo = worker.doesNeedToCompleteFreelanceProcess();
      expect(needsTo).toBe(false);
    });
  });
});
