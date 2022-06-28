import { MissionBusinessDate } from '@business';
import { IsString, Matches } from 'class-validator';

export class MissionDateParam implements MissionBusinessDate {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  date: string;

  @IsString()
  @Matches(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/)
  timeBegin: string;

  @IsString()
  @Matches(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/)
  timeEnd: string;
}
