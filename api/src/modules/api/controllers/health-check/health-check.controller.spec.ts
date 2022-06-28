import { AUTH_ROLES_METADATA } from '@api/auth';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule } from '@token';

import { HealthCheckController } from './health-check.controller';

let healthCheckCtrl: HealthCheckController;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [TokenModule],
    providers: [HealthCheckController],
  }).compile();

  healthCheckCtrl = module.get<HealthCheckController>(HealthCheckController);
};

describe('HealthCheckController', () => {
  beforeEach(async () => {
    await createApp();
  });

  describe('given security', () => {
    it('everyone can check health', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, healthCheckCtrl.checkHealth);

      expect(metadata).toEqual(undefined);
    });
  });
});
