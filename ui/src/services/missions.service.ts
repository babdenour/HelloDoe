import { BaseClient } from '@/clients/base.client';
import { RestMethods } from '@/clients/rest-methods';
import Config from '@/config';
import { MissionInterface } from '@/types/mission.interface';
import { QuizzApi } from '@api/quizz.api';
import ErrorKeys from '@constants/ErrorKeys';
import MissionCategories from '@constants/missionCategories';
import { QuestionConverter } from '@converters/question.converter';
import { QuizzConverter } from '@converters/quizz.converter';
import { Question } from '@domains/question';
import { Quizz } from '@domains/quizz';
import {
  CreateMissionParams,
  CreateMissionResponse,
  GetAllMissionsResponse,
  GetMissionQuizzResponse,
  GetOneMissionResponse,
  PostMissionQuizzResponse,
  PostMissionValidateResponse,
} from '@services/missions.service-utils';
import { ToastService } from '@services/toast.service';
import { TokenService } from '@services/token.service';
import { MissionsModule } from '@store/modules/missions';
import axios from 'axios';
import VueI18n from 'vue-i18n';

export class MissionsService extends BaseClient {
  endpoint: string;
  endpointv2: string;
  endpointwebview: string;

  constructor(
    private readonly i18n: VueI18n,
    private readonly questionConverter: QuestionConverter,
    private readonly quizzConverter: QuizzConverter,
    private readonly toastSvc: ToastService,
    tokenSvc: TokenService,
  ) {
    super(tokenSvc);
    this.endpoint = Config.API_ENDPOINT_MISSIONS;
    this.endpointv2 = Config.API_ENDPOINT_MISSIONS_V2;
    this.endpointwebview = Config.API_ENDPOINT_WEBVIEW_V2;
  }

  public async createMissionNoPayment(missionInfo: CreateMissionParams): Promise<MissionInterface> {
    const response: CreateMissionResponse = await axios({
      url: this.endpointv2,
      method: RestMethods.POST,
      headers: this.buildHeaders(),
      data: JSON.stringify(missionInfo),
    });

    if (!response.data.success) {
      throw new Error(ErrorKeys.NOT_SPECIFIED);
    }

    return response.data.data;
  }

  public async getAllMissions(): Promise<MissionInterface[]> {
    const response: GetAllMissionsResponse = await axios({
      url: this.endpointv2,
      method: RestMethods.GET,
      headers: this.buildHeaders(),
    });

    if (!response.data.success) {
      throw new Error(ErrorKeys.NOT_SPECIFIED);
    }

    return response.data.data;
  }

  public async getOneMission(missionId: string): Promise<MissionInterface> {
    const response: GetOneMissionResponse = await axios({
      url: `${this.endpointv2}${missionId}`,
      method: RestMethods.GET,
      headers: this.buildHeaders(),
    });

    if (!response.data.success) {
      throw new Error(ErrorKeys.NOT_SPECIFIED);
    }

    return response.data.data;
  }

  public async getOneByIdForWebview(missionId: string): Promise<MissionInterface> {
    const response: GetOneMissionResponse = await axios({
      url: `${this.endpointwebview}missions/${missionId}`,
      method: RestMethods.GET,
      headers: this.buildHeaders(),
    });

    if (!response.data.success) {
      throw new Error(ErrorKeys.NOT_SPECIFIED);
    }

    return response.data.data;
  }

  public async getMissionQuizz(missionId: string): Promise<{ quizz: Quizz; questions: Question[] }> {
    try {
      const response: GetMissionQuizzResponse = await axios({
        url: `${this.endpointv2}${missionId}/quizz`,
        method: RestMethods.GET,
        headers: this.buildHeaders(),
      });

      if (response.data.success) {
        const { quizz, questions } = response.data.data;

        return {
          quizz: this.quizzConverter.toDomain(quizz),
          questions: this.questionConverter.maptoDomain(questions),
        };
      }
    } catch (ex) {}

    return {
      quizz: null,
      questions: [],
    };
  }

  public async createMissionQuizz(missionId: string): Promise<Quizz> {
    try {
      const response: PostMissionQuizzResponse = await axios({
        url: `${this.endpointv2}${missionId}/quizz`,
        method: RestMethods.POST,
        headers: this.buildHeaders(),
      });

      if (response.data.success) {
        const quizzApi: QuizzApi = response.data.data;
        return this.quizzConverter.toDomain(quizzApi);
      }
    } catch (ex) {}

    return null;
  }

  public async validateMission(missionId: string): Promise<MissionInterface> {
    try {
      const response: PostMissionValidateResponse = await axios({
        url: `${this.endpointv2}${missionId}/validate`,
        method: RestMethods.POST,
        headers: this.buildHeaders(),
      });

      if (response.data.success) {
        this.toastSvc.success(this.i18n.t('api.mission-validate.success').toString());
        return response.data.data;
      }
    } catch (ex) {
      const code = ex?.response?.data?.code;
      if (code) {
        this.toastSvc.error(this.i18n.t(`api.mission-validate.${code}`).toString());
      }
    }

    return null;
  }

  public getCurrent(): MissionInterface {
    return MissionsModule.currentMission;
  }

  public async setCurrentByCode(code: string): Promise<void> {
    await MissionsModule.setCurrentByCode(code);
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
