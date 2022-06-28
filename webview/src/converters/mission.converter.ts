import { MissionApi, MissionTaskApi } from '@api/mission-api';
import { ContractType } from '@constants/contract-type';
import { MissionCategory } from '@constants/mission-category';
import { MissionStatus } from '@constants/mission-status';
import { MissionTask } from '@constants/mission-task';
import { TimeTableConverter } from '@converters/time-table.converter';
import { Mission } from '@domains/mission';
import { MissionPaymentUnit } from '@domains/mission-payment';
import { validateAndGetEnumValue } from '@libs/hellodash';

export class MissionConverter {
  constructor(private readonly timeTableCvtr: TimeTableConverter) {}

  public toDomain(args?: Partial<MissionApi>): Mission {
    const mission: Mission = {
      createdAt: args?.createdAt || 0,
      updatedAt: args?.updatedAt || 0,
      id: args?.id,
      agency: args?.agency,
      client: args?.client,
      contractType: validateAndGetEnumValue(ContractType, args?.contractType),
      code: args?.code,
      description: args?.description || '',
      location: {
        addressLine1: args?.location?.addressLine1 || '',
        zipCode: args?.location?.zipCode || '',
      },
      category: validateAndGetEnumValue(MissionCategory, args?.category),
      tasks: (args?.tasks || []).map((taskApi: MissionTaskApi) => validateAndGetEnumValue(MissionTask, taskApi)),
      requirements: {
        attributes: args?.requirements?.attributes || [],
        skills: args?.requirements?.skills || [],
        tools: args?.requirements?.tools || [],
      },
      timeTable: this.timeTableCvtr.toDomain(args?.timeTable),
      payment: {
        amount: args?.payment?.amount || 0,
        unit: validateAndGetEnumValue(MissionPaymentUnit, args?.payment?.unit),
      },
      nbWorkers: args?.nbWorkers || 0,
      status: validateAndGetEnumValue(MissionStatus, args?.status),
      amount: args?.amount || 0,
      seenBy: args?.seenBy || [],
      applicants: args?.applicants || [],
      hired: args?.hired || [],
    };

    return new Mission(mission);
  }

  public mapToDomain(missionApis: MissionApi[]): Mission[] {
    return missionApis.map((missionApi: MissionApi) => this.toDomain(missionApi));
  }
}
