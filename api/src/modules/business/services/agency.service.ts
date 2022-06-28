import { InjectAgencyRepository } from '@database';
import { Injectable } from '@nestjs/common';

import { AgencyImpl } from '../domains/agency.impl';
import { AgencyRepository } from '../repositories/agency-repository';

@Injectable()
export class AgencyService {
  constructor(@InjectAgencyRepository private readonly agencyRepo: AgencyRepository) {}

  public async doesAgencyExistById(id: string): Promise<boolean> {
    const agency: AgencyImpl = await this.agencyRepo.findById(id);
    return agency != null;
  }
}
