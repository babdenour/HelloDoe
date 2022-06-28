import { AccessControlService, AccessControlServiceProviderFactory } from '@api/access-control';
import { AUTH_ROLES_METADATA, AuthRole } from '@api/auth';
import {
  BusinessError,
  BusinessErrorCode,
  CheckoutSessionCreateUseCase,
  CheckoutSessionCreateUseCaseProviderFactory,
  MissionService,
  MissionServiceProviderFactory,
} from '@business';
import { ClassMock, mockClass, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule } from '@token';

import { ApiSuccessResponse } from '../responses/api-success.response';
import { CheckoutController } from './checkout.controller';
import { CreateCheckoutSessionParams } from './params/create-checkout-session.params';

let checktCtrl: CheckoutController;

let mockCreateChecktSessionUc: ClassMock<CheckoutSessionCreateUseCase>;
let mockMissionSvc: ClassMock<MissionService>;
let mockedAccessCtrlSvc: Partial<AccessControlService>;

const SESSION_ID = 'session-id';

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [TokenModule],
    providers: [
      AccessControlServiceProviderFactory({
        useValue: mockedAccessCtrlSvc,
      }),
      CheckoutSessionCreateUseCaseProviderFactory({
        useValue: mockCreateChecktSessionUc,
      }),
      MissionServiceProviderFactory({
        useValue: mockMissionSvc,
      }),
      CheckoutController,
    ],
  }).compile();

  checktCtrl = module.get<CheckoutController>(CheckoutController);
};

describe('CheckoutController', () => {
  beforeEach(async () => {
    mockCreateChecktSessionUc = mockClass(CheckoutSessionCreateUseCase);
    mockCreateChecktSessionUc.run = jest.fn().mockImplementation(() => ({ sessionId: SESSION_ID }));

    mockMissionSvc = mockClass(MissionService);
    mockMissionSvc.doesMissionExist = jest.fn().mockImplementation(() => true);
    mockedAccessCtrlSvc = {};
    mockedAccessCtrlSvc.can = jest.fn().mockResolvedValue(true);
    await createApp();
  });

  describe('when create payment session', () => {
    const USER_INFO: any = {};
    const MISSION_ID = TestUtils.genMongoId();
    const CREATE_CHECKOUT_SESSION_PARAMS = new CreateCheckoutSessionParams();
    CREATE_CHECKOUT_SESSION_PARAMS.missionId = MISSION_ID;

    it('should return payment session id', async () => {
      const res = (await checktCtrl.createPaymentSession(
        USER_INFO,
        CREATE_CHECKOUT_SESSION_PARAMS,
      )) as ApiSuccessResponse<{
        sessionId: string;
      }>;

      expect(res.data.sessionId).toBe(SESSION_ID);
    });

    describe('when mission not found', () => {
      beforeEach(async () => {
        mockMissionSvc.doesMissionExist = jest.fn().mockImplementation(() => false);
        await createApp();
      });

      it('should raise BusinessError H00007', async () => {
        expect.assertions(1);

        try {
          await checktCtrl.createPaymentSession(USER_INFO, CREATE_CHECKOUT_SESSION_PARAMS);
        } catch (ex) {
          if (ex instanceof BusinessError) {
            expect(ex.code).toBe(BusinessErrorCode.H00007_MISSION_NOT_FOUND);
          }
        }
      });
    });
  });

  describe('given security', () => {
    it('only admin and client can create payment session', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, checktCtrl.createPaymentSession);
      expect(metadata).toEqual([AuthRole.ADMIN, AuthRole.CLIENT]);
    });
  });
});
