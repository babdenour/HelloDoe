import { ContractType } from '../constants/contract-type';
import { MissionStatus } from '../constants/mission-status';
import { Mission } from '../domains/mission';
import { MissionLocation } from '../domains/mission-location';
import { MissionLocationImpl } from '../domains/mission-location.impl';
import { MissionPayment, MissionPaymentUnit } from '../domains/mission-payment';
import { MissionPaymentImpl } from '../domains/mission-payment.impl';
import { MissionImpl } from '../domains/mission.impl';
import { TimeTableFactory } from './time-table.factory';

export class MissionFactory {
  static create(args?: Partial<Mission>): MissionImpl {
    const now: number = Date.now();
    const mission: Mission = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id,
      agency: args?.agency,
      client: args?.client,
      contractType: args?.contractType ?? ContractType.FREELANCE,
      img: args?.img ?? '',
      code: args?.code,
      description: args?.description ?? '',
      address: args?.address ?? '',
      district: args?.district ?? 0,
      location: this.createLocation(args?.location),
      category: args?.category ?? '',
      tasks: args?.tasks ?? [],
      requirements: {
        attributes: args?.requirements?.attributes ?? [],
        skills: args?.requirements?.skills ?? [],
        tools: args?.requirements?.tools ?? [],
      },
      timeTable: TimeTableFactory.create(args?.timeTable),
      payment: this.createPayment(args?.payment),
      dates: args?.dates ?? [],
      startDate: args?.startDate,
      endDate: args?.endDate,
      nbWorkers: args?.nbWorkers ?? 0,
      type: args?.type ?? 0,
      status: args?.status ?? MissionStatus.FOR_VALIDATION,
      amount: args?.amount ?? 0,
      seenBy: args?.seenBy ?? [],
      applicants: args?.applicants ?? [],
      hired: args?.hired ?? [],
      reviews: args?.reviews ?? [],
    };

    return new MissionImpl(mission);
  }

  static createLocation(args?: Partial<MissionLocation>): MissionLocationImpl {
    const location: MissionLocation = {
      addressLine1: args?.addressLine1 || '',
      zipCode: args?.zipCode || '',
    };

    return new MissionLocationImpl(location);
  }

  static createPayment(args?: Partial<MissionPayment>): MissionPaymentImpl {
    const location: MissionPayment = {
      amount: args?.amount || 0,
      unit: args?.unit || MissionPaymentUnit.HOUR,
    };

    return new MissionPaymentImpl(location);
  }
}
