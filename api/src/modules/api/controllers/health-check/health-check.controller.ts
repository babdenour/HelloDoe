import { Get, UseFilters } from '@nestjs/common';

import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ApiController } from '../decorators/api-controller.decorator';

@UseFilters(new LoggingExceptionFilter())
@ApiController('health-check')
export class HealthCheckController {
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  checkHealth(): void {}
}
