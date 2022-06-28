import { ValidationPipe as NestValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export const ValidationPipe = (options?: ValidationPipeOptions): NestValidationPipe =>
  new NestValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
    ...options,
  });
