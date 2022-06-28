import { differenceInMonths } from 'date-fns';

import { TimeTable, TimeTableHourlyVolume, TimeTableSchedule } from './time-table';

export class TimeTableImpl implements TimeTable {
  private _beginAt: number;
  private _endAt: number;
  private _duration: number;

  public hourlyVolume: TimeTableHourlyVolume;
  public schedule: TimeTableSchedule;

  constructor(timeTable: TimeTable) {
    this._beginAt = timeTable.beginAt;
    this._endAt = timeTable.endAt;
    this._duration = timeTable.duration;
    this.hourlyVolume = timeTable.hourlyVolume;
    this.schedule = timeTable.schedule;
  }

  public get beginAt(): number {
    return this._beginAt;
  }

  public setBeginAt(beginAt: number): void {
    this._beginAt = beginAt;
  }

  public get endAt(): number {
    if (this._endAt) {
      return this._endAt;
    } else if (this._beginAt && this._duration) {
      return this._beginAt + this._duration;
    }

    return 0;
  }

  public setEndAt(endAt: number): void {
    this._endAt = endAt;
  }

  /**
   * Get the duration in ms of a timetable.
   * @returns Duration in ms.
   */
  public get duration(): number {
    if (this._duration) {
      return this._duration;
    } else if (this._beginAt && this._endAt) {
      return this._endAt - this._beginAt;
    }

    return 0;
  }

  public setDuration(duration: number): void {
    this._duration = duration;
  }

  public getHourlyVolume(): TimeTableHourlyVolume {
    return this.hourlyVolume;
  }

  /**
   * Indicate whether a mission starts as soon as possible.
   * @returns
   */
  public isAsap(): boolean {
    return !this._beginAt;
  }

  /**
   * Indicate whether the duration is longer than or equal to a period of time.
   * @param count
   * @param unit Unit of time.
   * @returns True if longer, false otherwise.
   */
  public isLongerThan(count: number, unit: 'month' = 'month'): boolean {
    if (unit === 'month') {
      return differenceInMonths(this.duration, 0) >= count;
    }

    return false;
  }

  /**
   * Indicate whether the time table is flexible (either the schedule or one slot at least).
   * @returns True if flexible, false otherwise.
   */
  public isFlexible(): boolean {
    return this.schedule.flexible || this.isOneSlotFlexible();
  }

  /**
   * Indicate whether one slot at least is flexible.
   * @returns boolean.
   */
  private isOneSlotFlexible(): boolean {
    return this.schedule.slots.some((slot) => slot.flexible);
  }

  /**
   * Compute the total number of hours worked.
   * @returns number.
   */
  public countTotalNumberOfHoursWorked(): number {
    if (this.isOneSlotFlexible()) {
      throw new Error('Total number of hours worked can not be computed for a flexible time table.');
    }

    let totalCountMs = 0;
    const timeWorkedPerSlot: Map<string, number> = this.computeWorkTimeDurationPerSlot();

    this.schedule.shifts.forEach((shift) => {
      shift.slots.forEach((slotId) => {
        totalCountMs += timeWorkedPerSlot.get(slotId);
      });
    });

    return totalCountMs / (1000 * 3600);
  }

  private computeWorkTimeDurationPerSlot(): Map<string, number> {
    return this.schedule.slots.reduce((acc: Map<string, number>, slot) => {
      const workTimeDuration = slot.endTime - slot.beginTime;
      acc.set(slot.id, workTimeDuration);
      return acc;
    }, new Map<string, number>());
  }

  public countTotalSlotsWorked(): number {
    let totalCount = 0;

    this.schedule.shifts.forEach((shift) => {
      totalCount += shift.slots.length;
    });

    return totalCount;
  }

  public countTotalShiftsWorked(): number {
    return this.schedule.shifts.length;
  }
}
