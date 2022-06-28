import { ContractType, MissionStatus, MissionTask } from '@business';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsMongoId, IsString, Min, ValidateNested } from 'class-validator';

import { MissionDateParam } from './mission/mission-date.param';
import { MissionRequirementsParam } from './mission/mission-requirements.param';

export class MissionParams {
  @IsInt()
  createdAt: number;

  @IsInt()
  updatedAt: number;

  @IsMongoId()
  id: string;

  @IsMongoId()
  agency: string;

  @IsMongoId()
  client: string;

  @IsEnum(MissionStatus)
  status: string;

  @IsEnum(ContractType)
  contractType: ContractType;

  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsInt()
  district: number;

  @IsString()
  category: string;

  @IsArray()
  @IsEnum(MissionTask, { each: true })
  tasks: MissionTask[];

  @ValidateNested()
  @Type(() => MissionRequirementsParam)
  requirements: MissionRequirementsParam;

  @IsArray()
  @ValidateNested()
  @Type(() => MissionDateParam)
  dates: MissionDateParam[];

  @IsInt()
  @Min(1)
  nbWorkers: number;

  @IsInt()
  @Min(1)
  amount: number;
}
