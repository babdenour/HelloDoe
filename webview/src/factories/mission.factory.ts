import { ContractType } from '@constants/contract-type';
import { MissionCategory } from '@constants/mission-category';
import { MissionStatus } from '@constants/mission-status';
import { Mission } from '@domains/mission';
import { MissionLocation } from '@domains/mission-location';
import { MissionPayment, MissionPaymentUnit } from '@domains/mission-payment';
import { MissionRequirements } from '@domains/mission-requirements';
import { TimeTableFactory } from '@factories/time-table.factory';

export class MissionFactory {
  static create(args?: Partial<Mission>): Mission {
    const now: number = Date.now();
    const mission: Mission = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id,
      agency: args?.agency,
      client: args?.client,
      contractType: args?.contractType ?? ContractType.FREELANCE,
      code: args?.code,
      description: args?.description ?? '',
      location: this.createLocation(args?.location),
      category: args?.category || MissionCategory.ACCESS_CONTROL,
      tasks: args?.tasks ?? [],
      requirements: MissionFactory.createRequirements(args?.requirements),
      timeTable: TimeTableFactory.create(args?.timeTable),
      payment: this.createPayment(args?.payment),
      nbWorkers: args?.nbWorkers ?? 0,
      status: args?.status ?? MissionStatus.FOR_VALIDATION,
      amount: args?.amount ?? 0,
      seenBy: args?.seenBy ?? [],
      applicants: args?.applicants ?? [],
      hired: args?.hired ?? [],
    };

    return new Mission(mission);
  }

  static createLocation(args?: Partial<MissionLocation>): MissionLocation {
    const location: MissionLocation = {
      addressLine1: args?.addressLine1 || '',
      zipCode: args?.zipCode || '',
    };

    return new MissionLocation(location);
  }

  static createPayment(args?: Partial<MissionPayment>): MissionPayment {
    const location: MissionPayment = {
      amount: args?.amount || 0,
      unit: args?.unit || MissionPaymentUnit.HOUR,
    };

    return new MissionPayment(location);
  }

  static createRequirements(args?: Partial<MissionRequirements>): MissionRequirements {
    return {
      attributes: args?.attributes || [],
      skills: args?.skills || [],
      tools: args?.tools || [],
    };
  }
}
