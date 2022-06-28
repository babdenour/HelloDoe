import { AuthGuard, AuthRole, AuthRoleDecorator } from '@api/auth';
import { DoerService, InjectDoerService } from '@business';
import { Body, Controller, Post, UseFilters, UseGuards, UsePipes } from '@nestjs/common';

import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiResponse } from '../api-response';
import { ApiSuccessResponse } from '../responses/api-success.response';
import { ConvertedVideoCvParams } from './params/converted-video-cv.params';

// TODO: Move annotations to global app instances
@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@UseGuards(AuthGuard)
@Controller('webhook/aws')
export class AwsWebhookController {
  constructor(@InjectDoerService private readonly doerSvc: DoerService) {}

  @AuthRoleDecorator(AuthRole.WEBHOOK_AWS)
  @Post('on-cv-processed')
  async onCvProcessed(@Body() convertedVideoCvParams: ConvertedVideoCvParams): Promise<ApiResponse> {
    const params: ConvertedVideoCvParams = convertedVideoCvParams;

    await this.doerSvc.updateOrCreateVideoCv(params.doerId, params.cvType, {
      imgUrl: params.fileType === 'THUMBNAIL' ? params.fileUrl : undefined,
      videoUrl: params.fileType === 'VIDEO' ? params.fileUrl : undefined,
    });

    return new ApiSuccessResponse();
  }
}
