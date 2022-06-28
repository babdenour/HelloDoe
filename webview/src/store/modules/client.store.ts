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

  @Mutation
  public addClient(client: Client): void {
    this.clients.set(client.id, client);
  }
}

export const clientStore = getModule(ClientVuexModule);
