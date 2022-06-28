import { IsString, MinLength } from 'class-validator';

export class AuthClientParams {
  @IsString()
  @MinLength(1)
  email: string;

  @IsString()
  @MinLength(1)
  missionCode: string;
}
