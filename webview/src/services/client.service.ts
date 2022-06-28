import { ClientClient } from '@/clients/client.client';
import { Client } from '@domains/client';
import { clientStore } from '@store/modules/client.store';

export class ClientService {
  constructor(private readonly clientClt: ClientClient) {}

  public async getClientById(id: string): Promise<Client | null> {
    let client = this.getClientFromStoreById(id);

    if (client) {
      return client;
    }

    client = await this.clientClt.fetchById(id);

    if (client) {
      clientStore.addClient(client);

      return client;
    }

    return null;
  }

  private getClientFromStoreById(id: string): Client {
    return clientStore.clients.get(id);
  }
}
