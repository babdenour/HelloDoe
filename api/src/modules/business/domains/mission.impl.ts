import { Mutable } from '@modules/types';
import { differenceInDays } from 'date-fns';
import { first, last } from 'lodash';

import { ContractType } from '../constants/contract-type';
import { Client } from '../domains/client';
import { Mission } from '../domains/mission';
import { MissionDateService } from '../services/mission-date.service';
import { TimeTableHourlyVolumeUnit } from './time-table';
import { TimeTableImpl } from './time-table.impl';

export class MissionImpl<T = string | Client> implements Mission<T> {
  public createdAt: Mission<T>['createdAt'];
  public updatedAt: Mission<T>['updatedAt'];
  public id: Mission<T>['id'];
  public agency: string;
  public client: Mission<T>['client'];
  public contractType: Mission<T>['contractType'];
  public img: Mission<T>['img'];
  public code: Mission<T>['code'];
  public description: Mission<T>['description'];
  public address: Mission<T>['address'];
  public district: Mission<T>['district'];
  public location: Mission<T>['location'];
  public category: Mission<T>['category'];
  public tasks: Mission<T>['tasks'];
  public requirements: Mission<T>['requirements'];
  public timeTable: TimeTableImpl;
  public payment: Mission<T>['payment'];
  public nbWorkers: Mission<T>['nbWorkers'];
  public type: Mission<T>['type'];
  public status: Mission<T>['status'];
  public amount: Mission<T>['amount'];
  public seenBy: Mission<T>['seenBy'];
  public applicants: Mission<T>['applicants'];
  public hired: Mission<T>['hired'];
  public reviews: Mission<T>['reviews'];
  public readonly dates: Mission<T>['dates'];
  public readonly startDate: Mission<T>['startDate'];
  public readonly endDate: Mission<T>['endDate'];

  constructor(mission: Mission<T>) {
    this.createdAt = mission.createdAt;
    this.updatedAt = mission.updatedAt;
    this.id = mission.id;
    this.agency = mission.agency;
    this.client = mission.client;
    this.contractType = mission.contractType;
    this.img = mission.img;
    this.code = mission.code;
    this.description = mission.description;
    this.address = mission.address;
    this.district = mission.district;
    this.location = mission.location;
    this.category = mission.category;
    this.tasks = mission.tasks;
    this.requirements = mission.requirements;
    this.timeTable = mission.timeTable;
    this.payment = mission.payment;
    this.nbWorkers = mission.nbWorkers;
    this.type = mission.type;
    this.status = mission.status;
    this.amount = mission.amount;
    this.seenBy = mission.seenBy;
    this.applicants = mission.applicants;
    this.hired = mission.hired;
    this.reviews = mission.reviews;
    this.setDates(mission.dates);
  }

  public setDates(dates: Mission<T>['dates']): void {
    this.asMutable.dates = dates;

    if (dates.length > 0) {
      const sortedDates = MissionDateService.toDatesSortedAsc(dates);
      this.asMutable.startDate = first(sortedDates).getTime();
      this.asMutable.endDate = last(sortedDates).getTime();
    }
  }

  public addApplicant = (doerId: string): void => {
    if (!this.isDoerHired(doerId) && !this.hasDoerApplied(doerId)) {
      this.applicants.push(doerId);
    }
  };

  public hasDoerApplied = (doerId: string): boolean => {
    return this.applicants.findIndex((id: string) => id === doerId) !== -1;
  };

  public isDoerHired = (doerId: string): boolean => {
    return this.hired.findIndex((id: string) => id === doerId) !== -1;
  };

  public computeTotalPay(): number {
    if (
      this.contractType === ContractType.CDD ||
      this.contractType === ContractType.SEASONAL ||
      this.contractType === ContractType.TEMPORARY
    ) {
      if (this.timeTable.getHourlyVolume().unit === TimeTableHourlyVolumeUnit.DAY) {
        const payPerHour = this.payment.getWholeAmount();
        const hoursPerDay = this.timeTable.getHourlyVolume().volume;
        const countOfDaysWorked = this.timeTable.countTotalShiftsWorked();
        return payPerHour * hoursPerDay * countOfDaysWorked;
      }

      if (this.timeTable.getHourlyVolume().unit === TimeTableHourlyVolumeUnit.WEEK) {
        const payPerHour = this.payment.getWholeAmount();
        const hoursPerWeek = this.timeTable.getHourlyVolume().volume;
        const countOfWeeksWorked = differenceInDays(this.timeTable.duration, 0) / 7;
        return payPerHour * hoursPerWeek * countOfWeeksWorked;
      }
    } else if (this.contractType === ContractType.EXTRA || this.contractType === ContractType.FREELANCE) {
      if (!this.timeTable.isFlexible()) {
        if (this.payment.isPerMission()) {
          const missionCount = this.timeTable.countTotalSlotsWorked();
          const payWholeAmount = this.payment.getWholeAmount();
          return missionCount * payWholeAmount;
        }

        if (this.payment.isPerHour()) {
          const payPerHour = this.payment.getWholeAmount();
          const countOfHoursWorked = this.timeTable.countTotalNumberOfHoursWorked();
          return payPerHour * countOfHoursWorked;
        }
      }
    }

    throw new Error(`Cannot compute total pay for mission ${JSON.stringify(this)}`);
  }

  public computePayPerMonth(): number {
    const totalPay = this.computeTotalPay();
    const countOfMonthsWorked = differenceInDays(this.timeTable.duration, 0) / 30;
    return totalPay / countOfMonthsWorked;
  }

  private get asMutable(): Mutable<MissionImpl<T>> {
    return this as Mutable<MissionImpl<T>>;
  }
}
