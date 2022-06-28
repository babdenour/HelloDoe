import { IsString } from 'class-validator';

export class CreateCheckoutSessionParams {
  @IsString()
  missionId: string;
}
