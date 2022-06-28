import { AgencyImplBusiness } from '@business';

import { AgencyDto } from '../dtos/agency.dto';

export class AgencyAdapter {
  public static toApi = (agency: AgencyImplBusiness): AgencyDto => {
    return new AgencyDto({
      createdAt: agency?.createdAt,
      updatedAt: agency?.updatedAt,
      id: agency?.id,
      name: agency?.name,
    });
  };
}
