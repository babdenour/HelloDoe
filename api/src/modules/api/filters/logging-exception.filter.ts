import { AccessControlError } from '@api/access-control';
import { BusinessError } from '@business';
import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';

import log from '../../../log';

@Catch()
export class LoggingExceptionFilter implements ExceptionFilter {
  catch(ex: { message?: string; stack?: string }, host: ArgumentsHost): Response {
    const response = host.switchToHttp().getResponse<Response>();

    log.error({
      error: JSON.stringify(ex.message),
      stack: ex.stack,
    });

    if (ex instanceof HttpException) {
      return response.status(ex.getStatus()).json(ex.getResponse());
    } else if (ex instanceof BusinessError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        code: ex.code,
        message: ex.message,
      });
    } else if (ex instanceof AccessControlError) {
      const err = new ForbiddenException();

      return response.status(err.getStatus()).send(err.message);
    } else {
      const err = new InternalServerErrorException();

      return response.status(err.getStatus()).send(err.message);
    }
  }
}
