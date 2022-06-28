import { ClientBusiness, ClientBusinessImpl } from '@business';

import { ClientDto } from '../dtos/client.dto';

export class ClientAdapter {
  public static toApi = (client: ClientBusiness): ClientDto => {
    return new ClientDto({
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      id: client.id,
      companyName: client.companyName,
      siren: client.siren,
      address: client.address,
      contact: client.contact,
    });
  };

  public static toApiOrString = (client: string | ClientBusiness): string | ClientDto => {
    if (typeof client === 'string') {
      return client;
    } else if (client instanceof ClientBusinessImpl) {
      return ClientAdapter.toApi(client);
    }

    return null;
  };
}
