import { MissionDate } from '../domains/mission';
import { DateUtils } from '../utils/date-utils';

export class MissionDateService {
  public static toDatesSortedAsc = (missionDates: MissionDate[]): Date[] => {
    return missionDates
      .map(MissionDateService.toBeginDate)
      .concat(missionDates.map(MissionDateService.toEndDate))
      .sort(DateUtils.sorterAsc);
  };

  public static toBeginDate = (md: MissionDate): Date => new Date(`${md.date}T${md.timeBegin}`);

  public static toEndDate = (md: MissionDate): Date => new Date(`${md.date}T${md.timeEnd}`);
}
