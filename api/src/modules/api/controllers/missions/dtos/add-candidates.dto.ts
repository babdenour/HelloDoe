import { IsArray, IsString } from 'class-validator';

export class AddCandidatesDto {
  @IsArray()
  @IsString({ each: true })
  candidates: string[];
}
