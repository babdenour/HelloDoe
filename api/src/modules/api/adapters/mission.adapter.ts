import { MissionBusinessImpl } from '@business';

import { MissionDto } from '../dtos/mission.dto';
import { ClientAdapter } from './client.adapter';
import { DoerAdapter } from './doer.adapter';
import { TimetableAdapter } from './timetable.adapter';

export class MissionAdapter {
  public static toApi = (mission: MissionBusinessImpl): MissionDto => {
    return new MissionDto({
      createdAt: mission.createdAt,
      updatedAt: mission.updatedAt,
      id: mission.id,
      address: mission.address,
      agency: mission.agency,
      amount: mission.amount,
      applicants: (mission?.applicants || []).map(DoerAdapter.toApiOrString),
      category: mission.category,
      clientId: ClientAdapter.toApiOrString(mission.client),
      code: mission.code,
      contractType: mission.contractType,
      dates: mission.dates,
      timeTable: TimetableAdapter.toApi(mission.timeTable),
      description: mission.description,
      district: mission.district,
      endDate: mission.endDate,
      hired: (mission?.hired || []).map(DoerAdapter.toApiOrString),
      img: mission.img,
      nbWorkers: mission.nbWorkers,
      payment: {
        amount: mission.payment.amount,
        unit: mission.payment.unit,
      },
      requirements: mission.requirements,
      reviews: mission.reviews,
      seenBy: (mission?.seenBy || []).map(DoerAdapter.toApiOrString),
      startDate: mission.startDate,
      status: mission.status,
      tasks: mission.tasks,
      type: mission.type,
    });
  };

  public static toApiOrString = (mission: string | MissionBusinessImpl): string | MissionDto => {
    if (typeof mission === 'string') {
      return mission;
    } else if (mission instanceof MissionBusinessImpl) {
      return MissionAdapter.toApi(mission);
    }

    return null;
  };
}
