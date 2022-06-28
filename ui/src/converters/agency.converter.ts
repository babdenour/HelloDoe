import { AgencyApi } from '@api/agency.api';
import { Agency } from '@domains/agency';

export class AgencyConverter {
  public toDomain(args?: Partial<AgencyApi>): Agency {
    const agency: Agency = {
      createdAt: args?.createdAt || 0,
      updatedAt: args?.updatedAt || 0,
      id: args?.id,
      name: args?.name || '',
    };

    return new Agency(agency);
  }

  public maptoDomain(agencyApis: AgencyApi[]): Agency[] {
    return agencyApis.map((agencyApi: AgencyApi) => this.toDomain(agencyApi));
  }
}
