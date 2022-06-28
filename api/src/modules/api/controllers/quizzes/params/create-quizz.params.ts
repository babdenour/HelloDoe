import { IsString } from 'class-validator';

export class CreateQuizzParams {
  @IsString()
  missionId: string;
}
