import { Client, ClientContact } from '../domains/client';
import { ClientImpl } from '../domains/client.impl';

export class ClientFactory {
  public static create(args?: Partial<Client>): ClientImpl {
    const now = Date.now();
    const client: Client = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id ?? null,
      companyName: args?.companyName ?? '',
      address: args?.address ?? '',
      siren: args?.siren ?? '',
      contact: this.createClientContact(args?.contact),
    };

    return new ClientImpl(client);
  }

  public static createClientContact(args?: Partial<ClientContact>): ClientContact {
    return {
      firstName: args?.firstName ?? '',
      lastName: args?.lastName ?? '',
      email: args?.email ?? '',
      phone: args?.phone ?? '',
    };
  }
}
