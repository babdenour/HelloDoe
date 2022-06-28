import { ClientClient } from '@/clients/client.client';
import { Client } from '@domains/client';
import { clientStore } from '@store/modules/client.store';

export class ClientService {
  constructor(private readonly clientClt: ClientClient) {}

  public getCurrent(): Client {
    return clientStore.currentClient;
  }

  public async setCurrentById(id: string): Promise<void> {
    for (const client of clientStore.clients.values()) {
      if (client.id === id) {
        clientStore.setCurrentClientId(client.id);

        return;
      }
    }

    const client = await this.clientClt.fetchById(id);

    if (client) {
      clientStore.saveClient(client);
      clientStore.setCurrentClientId(client.id);
    }
  }
}
