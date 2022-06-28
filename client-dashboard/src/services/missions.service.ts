import { BaseClient } from '@/clients/base.client';
import Config from '@/config';
import { Mission } from '@domains/mission';
import { TokenService } from '@services/token.service';
import { missionStore } from '@store/modules/mission.store';

export class MissionsService extends BaseClient {
  endpoint: string;
  endpointv2: string;
  endpointwebview: string;

  constructor(tokenSvc: TokenService) {
    super(tokenSvc);
    this.endpoint = Config.API_ENDPOINT_MISSIONS;
    this.endpointv2 = Config.API_ENDPOINT_MISSIONS_V2;
    this.endpointwebview = Config.API_ENDPOINT_WEBVIEW_V2;
  }

  public getCurrent(): Mission {
    return missionStore.currentMission;
  }

  public async setCurrentById(id: string): Promise<void> {
    await missionStore.setCurrentById(id);
  }

  public async setCurrentByCode(code: string): Promise<void> {
    await missionStore.setCurrentByCode(code);
  }
}
