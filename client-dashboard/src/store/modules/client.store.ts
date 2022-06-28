import { Client } from '@domains/client';
import { store } from '@store';
import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

const MODULE_NAME = 'clients';

@Module({
  dynamic: true,
  namespaced: true,
  name: MODULE_NAME,
  store,
})
class ClientVuexModule extends VuexModule {
  public clients: Map<string, Client> = new Map();
  private currentClientId: string = '';

  get currentClient(): Client {
    return this.clients.get(this.currentClientId) || null;
  }

  @Mutation
  public saveClient(client: Client): void {
    this.clients.set(client.id, client);
  }

  @Mutation
  public setCurrentClientId(id: string): void {
    // Hack to force update current client.
    this.currentClientId = '';
    this.currentClientId = id;
  }
}

export const clientStore = getModule(ClientVuexModule);
