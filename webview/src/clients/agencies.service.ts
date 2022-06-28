import { GetAllAgenciesRes } from '@/clients/agencies.service-utils';
import { RestMethods } from '@/clients/rest-methods';
import Config from '@/config';
import { AgencyApi } from '@api/agency.api';
import { AgencyConverter } from '@converters/agency.converter';
import { Agency } from '@domains/agency';
import { TokenService } from '@services/token.service';
import axios from 'axios';

export class AgenciesService {
  private endpointv2: string;

  constructor(
    private readonly agencyCvtr: AgencyConverter,
    private readonly tokenService: TokenService
  ) {
    this.endpointv2 = Config.API_ENDPOINT_AGENCIES_V2;
  }

  public async getAllAgencies(): Promise<Agency[]> {
    try {
      const res: GetAllAgenciesRes = await axios({
        url: `${this.endpointv2}`,
        method: RestMethods.GET,
        headers: this.buildHeaders(),
      });

      if (res.data.success) {
        const agencies: AgencyApi[] = res.data.data;
        return this.agencyCvtr.maptoDomain(agencies);
      }
    } catch (ex) {
      console.log(ex);
    }

    return [];
  }

  private buildHeaders = (): { [k: string]: string } => {
    const token: string = this.tokenService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return headers;
  };
}
