import { Agency } from '../domains/agency';
import { AgencyImpl } from '../domains/agency.impl';

export class AgencyFactory {
  static create(args?: Partial<Agency>): AgencyImpl {
    const now = Date.now();
    const accessCard: Agency = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id,
      name: args?.name,
    };

    return new AgencyImpl(accessCard);
  }
}
