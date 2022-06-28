import { IsArray, IsString } from 'class-validator';

export class MissionRequirementsParam {
  @IsArray()
  @IsString({ each: true })
  attributes: string[];

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsArray()
  @IsString({ each: true })
  tools: string[];
}
