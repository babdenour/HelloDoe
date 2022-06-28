import { BaseClient } from '@/clients/base.client';
import { RestMethods } from '@/clients/rest-methods';
import Config from '@/config';
import ErrorKeys from '@constants/ErrorKeys';
import MissionCategories from '@constants/missionCategories';
import { MissionConverter } from '@converters/mission.converter';
import { Mission } from '@domains/mission';
import { CreateMissionParams, CreateMissionResponse, GetAllMissionsResponse, GetOneMissionResponse } from '@services/missions.service-utils';
import { TokenService } from '@services/token.service';
import { missionStore } from '@store/modules/mission.store';
import axios from 'axios';
import VueI18n from 'vue-i18n';

export class MissionsService extends BaseClient {
  endpoint: string;
  endpointv2: string;
  endpointwebview: string;

  constructor(private readonly missionCvtr: MissionConverter, private readonly i18n: VueI18n, tokenSvc: TokenService) {
    super(tokenSvc);
    this.endpoint = Config.API_ENDPOINT_MISSIONS;
    this.endpointv2 = Config.API_ENDPOINT_MISSIONS_V2;
    this.endpointwebview = Config.API_ENDPOINT_WEBVIEW_V2;
  }

  public async createMissionNoPayment(missionInfo: CreateMissionParams): Promise<Mission> {
    const response: CreateMissionResponse = await axios({
      url: this.endpointv2,
      method: RestMethods.POST,
      headers: this.buildHeaders(),
      data: JSON.stringify(missionInfo),
    });

    if (!response.data.success) {
      throw new Error(ErrorKeys.NOT_SPECIFIED);
    }

    return this.missionCvtr.toDomain(response.data.data);
  }

  public async getAllMissions(): Promise<Mission[]> {
    const response: GetAllMissionsResponse = await axios({
      url: this.endpointv2,
      method: RestMethods.GET,
      headers: this.buildHeaders(),
    });

    if (!response.data.success) {
      throw new Error(ErrorKeys.NOT_SPECIFIED);
    }

    return this.missionCvtr.mapToDomain(response.data.data);
  }

  public async getOneMission(missionId: string): Promise<Mission> {
    const response: GetOneMissionResponse = await axios({
      url: `${this.endpointv2}${missionId}`,
      method: RestMethods.GET,
      headers: this.buildHeaders(),
    });

    if (!response.data.success) {
      throw new Error(ErrorKeys.NOT_SPECIFIED);
    }

    return this.missionCvtr.toDomain(response.data.data);
  }

  public async getOneByIdForWebview(missionId: string): Promise<Mission> {
    const response: GetOneMissionResponse = await axios({
      url: `${this.endpointwebview}missions/${missionId}`,
      method: RestMethods.GET,
      headers: this.buildHeaders(),
    });

    if (!response.data.success) {
      throw new Error(ErrorKeys.NOT_SPECIFIED);
    }

    return this.missionCvtr.toDomain(response.data.data);
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

  public async getMissionDetails({ token, encryptedMissionId }) {
    const url = `${this.endpoint}${encryptedMissionId}`;
    const method = 'GET';
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const { data } = await axios({ url, method, headers });

      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async updateMission({ token, missionId, missionInfo }) {
    const url = `${this.endpoint}${missionId}`;
    const method = 'PUT';
    const headers = { Authorization: `Bearer ${token}` };
    const data = { missionInfo };
    try {
      const response = await axios({ url, method, headers, data });

      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  public getCandidates({ token, encryptedMissionId }) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${this.endpoint}${encryptedMissionId}/candidates`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(
          (response) => {
            resolve(response.data);
          },
          () => {
            reject(new Error('Mission candidates not found'));
          },
        )
        .catch((e) => {
          reject(e);
        });
    });
  }

  public getCategoryName(categoryValue: string): string {
    const missionCategory = MissionCategories.find((category) => category.value === categoryValue);

    return missionCategory?.name || '';
  }

  public async enrollCandidate(token, missionId, workerId) {
    const url = `${this.endpoint}${missionId}/candidates/hire`;
    const method = 'POST';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const data = { workerId };
    try {
      const response = await axios({ url, method, headers, data });

      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
