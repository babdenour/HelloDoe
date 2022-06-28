import { Client, ClientContact } from '@domains/client';

export class ClientFactory {
  public static create(args?: Partial<Client>): Client {
    const client: Client = {
      createdAt: args?.createdAt || 0,
      updatedAt: args?.updatedAt || 0,
      id: args?.id,
      address: args?.address || '',
      companyName: args?.companyName || '',
      siren: args?.siren || '',
      contact: this.createContact(args?.contact),
    };

    return new Client(client);
  }

  public static createContact(args?: Partial<ClientContact>): ClientContact {
    return {
      email: args?.email || '',
      firstName: args?.firstName || '',
      lastName: args?.lastName || '',
      phone: args?.phone || '',
    };
  }
}
