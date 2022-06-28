import { ClientApi } from '@api/client.api';
import { Client } from '@domains/client';

export class ClientConverter {
  public toDomain(args?: Partial<ClientApi>): Client {
    const client: Client = {
      createdAt: args?.createdAt,
      updatedAt: args?.updatedAt,
      id: args?.id,
      address: args?.address,
      companyName: args?.companyName,
      siren: args?.siren,
      contact: {
        email: args?.contact?.email,
        firstName: args?.contact?.firstName,
        lastName: args?.contact?.lastName,
        phone: args?.contact?.phone,
      },
    };

    return new Client(client);
  }

  public maptoDomain(clientApis: ClientApi[]): Client[] {
    return clientApis.map((clientApi: ClientApi) => this.toDomain(clientApi));
  }
}
