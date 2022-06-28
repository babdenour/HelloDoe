import { getContainer } from '@/di-container';
import { MissionInterface } from '@/types/mission.interface';
import { store } from '@store';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

const MODULE_NAME = 'missions';

@Module({
  dynamic: true,
  namespaced: true,
  name: MODULE_NAME,
  store,
})
class MissionsVuexModule extends VuexModule {
  private missions: Map<string, MissionInterface> = new Map();
  private currentMissionId: string = '';

  get currentMission(): MissionInterface {
    return this.missions.get(this.currentMissionId) || null;
  }

  @Action
  async setCurrentByCode(code: string): Promise<void> {
    for (let mission of this.missions.values()) {
      if (mission.code === code) {
        this.setCurrentMissionId(mission.id);
        return;
      }
    }

    const mission = await getContainer().missionClt.getByCode(code);
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

export const MissionsModule = getModule(MissionsVuexModule);
