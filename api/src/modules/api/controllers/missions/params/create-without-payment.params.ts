import { ContractType, MissionTask } from '@business';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsMongoId, IsString, Min, ValidateNested } from 'class-validator';

import { MissionDateParam } from '../../../params/mission/mission-date.param';
import { TimeTableParam } from '../../../params/time-table.param';

export class CreateWithoutPaymentParams {
  /**
   * Name of the client's company.
   */
  @IsString()
  companyName: string;

  /**
   * Address of the client's company.
   */
  @IsString()
  companyAddress: string;

  /**
   * Siren of the client's company.
   */
  @IsString()
  companySiren: string;

  /**
   * First name of the client's contact.
   */
  @IsString()
  contactFirstName: string;

  /**
   * Last name of the client's contact.
   */
  @IsString()
  contactLastName: string;

  /**
   * Email of the client's contact.
   */
  @IsString()
  contactEmail: string;

  /**
   * Phone of the client's contact.
   */
  @IsString()
  contactPhone: string;

  /**
   * Id of the agency posting the mission.
   */
  @IsMongoId()
  agency: string;

  /**
   * Contract type.
   */
  @IsEnum(ContractType)
  contractType: ContractType;

  /**
   * Human readable code representing the mission.
   */
  @IsString()
  code: string;

  /**
   * Description.
   */
  @IsString()
  description: string;

  /**
   * @deprecated
   *
   * Use timeTable instead.
   */
  @IsArray()
  @ValidateNested()
  @Type(() => MissionDateParam)
  dates: MissionDateParam[];

  /**
   * Work schedule.
   *
   * @see TimeTableParam
   */
  @ValidateNested()
  @Type(() => TimeTableParam)
  timeTable: TimeTableParam;

  /**
   * Address where the mission takes place.
   */
  @IsString()
  location: string;

  /**
   * District where the mission takes place.
   */
  @IsInt()
  district: number;

  /**
   * Type of work.
   */
  @IsString()
  category: string;

  /**
   * Tasks to accomplish during the mission.
   */
  @IsArray()
  @IsEnum(MissionTask, { each: true })
  tasks: MissionTask[];

  /**
   * Array of strings describing the expected attributes.
   */
  @IsArray()
  @IsString({ each: true })
  attributes: string[];

  /**
   * Array of strings describing the skills required.
   */
  @IsArray()
  @IsString({ each: true })
  skills: string[];

  /**
   * Array of strings describing the tools required.
   */
  @IsArray()
  @IsString({ each: true })
  tools: string[];

  /**
   * Amount paid by the client in cents.
   */
  @IsInt()
  @Min(1)
  price: number;

  /**
   * Amount of doers to hire.
   */
  @IsInt()
  @Min(1)
  doersCount: number;
}
