import { getContainer } from '@/di-container';
import { Mission } from '@domains/mission';
import { store } from '@store';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

const MODULE_NAME = 'missions';

@Module({
  dynamic: true,
  namespaced: true,
  name: MODULE_NAME,
  store,
})
class MissionVuexModule extends VuexModule {
  private missions: Map<string, Mission> = new Map();
  private currentMissionId: string = '';

  get currentMission(): Mission {
    return this.missions.get(this.currentMissionId) || null;
  }

  @Action
  async setCurrentById(id: string): Promise<void> {
    for (const mission of this.missions.values()) {
      if (mission.id === id) {
        this.setCurrentMissionId(mission.id);

        return;
      }
    }

    const mission = await getContainer().missionClt.fetchById(id);
    if (mission) {
      this.missions.set(mission.id, mission);
      this.setCurrentMissionId(mission.id);
    }
  }

  @Action
  async setCurrentByCode(code: string): Promise<void> {
    for (const mission of this.missions.values()) {
      if (mission.code === code) {
        this.setCurrentMissionId(mission.id);

        return;
      }
    }

    const mission = await getContainer().missionClt.fetchByCode(code);
    if (mission) {
      this.missions.set(mission.id, mission);
      this.setCurrentMissionId(mission.id);
    }
  }

  @Mutation
  private setCurrentMissionId(id: string): void {
    // Hack to force update current mission
    this.currentMissionId = '';
    this.currentMissionId = id;
  }
}

export const missionStore = getModule(MissionVuexModule);
