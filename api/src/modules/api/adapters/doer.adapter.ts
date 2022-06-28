import { DoerBsn, DoerImplBsn } from '@business';

import { DoerDto } from '../dtos/doer.dto';
import { MissionAdapter } from './mission.adapter';

export class DoerAdapter {
  public static toApi = (doer: DoerBsn): DoerDto => {
    return new DoerDto({
      createdAt: doer?.createdAt,
      updatedAt: doer?.updatedAt,
      id: doer?.id,
      profile: doer?.profile,
      workProfile: {
        ...doer?.workProfile,
        missions: (doer?.workProfile?.missions || []).map(MissionAdapter.toApiOrString),
      },
    });
  };

  public static toApiOrString = (doer: string | DoerBsn): string | DoerDto => {
    if (typeof doer === 'string') {
      return doer;
    } else if (doer instanceof DoerImplBsn) {
      return DoerAdapter.toApi(doer);
    }

    return null;
  };
}
