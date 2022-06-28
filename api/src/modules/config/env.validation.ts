import { NodeEnv } from '@modules/node-env';
import { plainToClass, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  APP_WEBVIEW_URL: string;

  @IsString()
  CRYPTO_KEY: string;

  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv;

  @IsNumber()
  @Type(() => Number)
  PORT: number;

  @IsString()
  TZ: string;

  @IsString()
  UPLOAD_API_ENDPOINT: string;

  ////////////////////////
  // Facebook
  ////////////////////////

  @IsString()
  FB_PAGE_TOKEN: string;

  ////////////////////////
  // Stripe
  ////////////////////////

  @IsString()
  STRIPE_ENDPOINT_SECRET: string;

  @IsString()
  STRIPE_KEY: string;

  ////////////////////////
  // AWS
  ////////////////////////

  @IsString()
  BUCKET_URL: string;

  ////////////////////////
  // Database
  ////////////////////////

  @IsString()
  MONGODB_URI: string;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig: EnvironmentVariables = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: false });
  const errors: ValidationError[] = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
