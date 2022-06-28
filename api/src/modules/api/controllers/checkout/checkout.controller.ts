import { AccessControlService, InjectAccessControlService } from '@api/access-control';
import { AuthGuard, AuthRole, AuthRoleDecorator, UserAuthInfoDecorator } from '@api/auth';
import {
  BusinessError,
  BusinessErrorCode,
  CheckoutSessionCreateUseCase,
  InjectCheckoutSessionCreateUseCase,
  InjectMissionService,
  MissionService,
  ProductIds,
} from '@business';
import { Body, Post, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { UserInfo } from '@token';

import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiResponse } from '../api-response';
import { ApiController } from '../decorators/api-controller.decorator';
import { ApiSuccessResponse } from '../responses/api-success.response';
import { CreateCheckoutSessionParams } from './params/create-checkout-session.params';

@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@UseGuards(AuthGuard)
@ApiController('checkout', 2)
export class CheckoutController {
  constructor(
    @InjectAccessControlService private readonly ac: AccessControlService,
    @InjectCheckoutSessionCreateUseCase private readonly createChecktSessionUc: CheckoutSessionCreateUseCase,
    @InjectMissionService private readonly missionSvc: MissionService,
  ) {}

  @Post('session')
  @AuthRoleDecorator(AuthRole.ADMIN, AuthRole.CLIENT)
  async createPaymentSession(
    @UserAuthInfoDecorator() userInfo: UserInfo,
    @Body() createCheckoutSessionParams: CreateCheckoutSessionParams,
  ): Promise<ApiResponse<{ sessionId: string }>> {
    const clientId = userInfo.name;
    const missionId = createCheckoutSessionParams.missionId;
    await this.ac.can(userInfo.role, 'read', 'candidates', {
      own: { missionId, clientId },
    });

    try {
      const doesMissionExist = await this.missionSvc.doesMissionExist(missionId);
      if (!doesMissionExist) {
        throw new Error();
      }
    } catch (ex) {
      throw new BusinessError(BusinessErrorCode.H00007_MISSION_NOT_FOUND, { id: missionId });
    }

    const { sessionId } = await this.createChecktSessionUc.run(ProductIds.CONTACT_DOER, missionId);

    return new ApiSuccessResponse({ sessionId });
  }
}
