import { TimeTableHourlyVolumeUnit } from '@business';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsInt, IsMongoId, IsNumber, IsOptional, ValidateNested } from 'class-validator';

/**
 * Represents a time table object at the entry of the REST API.
 */
export class TimeTableHourlyVolumeParam {
  /**
   * Unit of time.
   */
  @IsEnum(TimeTableHourlyVolumeUnit)
  unit: TimeTableHourlyVolumeUnit;

  /**
   * Amount of working hours per unit of time.
   */
  @IsNumber()
  volume: number;

  /**
   * Whether the hourly volume is flexible.
   * If true, the volume and unit properties are irrelevant.
   */
  @IsBoolean()
  flexible: boolean;
}

export class TimeTableScheduleSlotParam {
  /**
   * Id of the slot.
   */
  @IsMongoId()
  id: string;

  /**
   * Timestamp of the begin time of the slot.
   */
  @IsInt()
  beginTime: number;

  /**
   * Timestamp of the end time of the slot.
   */
  @IsInt()
  endTime: number;

  /**
   * Whether the working hours of the slot are flexible.
   * If true, the beginTime and endTime properties are irrelevant.
   */
  @IsBoolean()
  flexible: boolean;
}

export class TimeTableScheduleShiftParam {
  /**
   * Timestamp of the date of the shift.
   */
  @IsInt()
  date: number;

  /**
   * Array of slot ids.
   */
  @IsArray()
  @IsMongoId({ each: true })
  slots: string[];
}

export class TimeTableScheduleParam {
  /**
   * Array of slots.
   */
  @IsArray()
  @ValidateNested()
  @Type(() => TimeTableScheduleSlotParam)
  slots: TimeTableScheduleSlotParam[];

  /**
   * Array of shifts.
   */
  @IsArray()
  @ValidateNested()
  @Type(() => TimeTableScheduleShiftParam)
  shifts: TimeTableScheduleShiftParam[];

  /**
   * Whether the schedule is flexible.
   * if true, the slots and shifts properties are irrelevant.
   */
  @IsBoolean()
  flexible: boolean;
}

export class TimeTableParam {
  /**
   * Timestamp of the date when the mission begins.
   */
  @IsInt()
  @IsOptional()
  beginAt: number;

  /**
   * Timestamp of the date when the mission ends.
   */
  @IsInt()
  @IsOptional()
  endAt: number;

  /**
   * Duration of the mission.
   */
  @IsInt()
  @IsOptional()
  duration: number;

  /**
   * Hourly volume.
   *
   * @see TimeTableHourlyVolumeParam
   */
  @ValidateNested()
  @Type(() => TimeTableHourlyVolumeParam)
  hourlyVolume: TimeTableHourlyVolumeParam;

  /**
   * Hourly volume.
   *
   * @see TimeTableScheduleParam
   */
  @ValidateNested()
  @Type(() => TimeTableScheduleParam)
  schedule: TimeTableScheduleParam;
}
