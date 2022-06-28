import { ClientRepository, InjectClientRepository, InjectMissionRepository, MissionRepository } from '@database';
import { I18nService, InjectI18nService } from '@i18n';
import { Injectable } from '@nestjs/common';

import { ClientImpl } from '../domains/client.impl';
import { MissionImpl } from '../domains/mission.impl';

@Injectable()
export class MissionService {
  constructor(
    @InjectClientRepository private readonly clientRepository: ClientRepository,
    @InjectMissionRepository private readonly missionRepository: MissionRepository,
    @InjectI18nService private readonly i18nService: I18nService,
  ) {}

  public createMissionWithClient = async (mission: MissionImpl, client: ClientImpl): Promise<MissionImpl> => {
    await this.missionRepository.validate(mission);

    const savedClient = await this.clientRepository.findByEmailOrCreate(client);

    mission.client = savedClient;
    const savedMission = await this.missionRepository.save(mission);

    return savedMission;
  };

  public async doesMissionExist(missionId: string): Promise<boolean> {
    const mission = await this.missionRepository.findById(missionId);

    return mission != null;
  }

  public async doesMissionExistByCode(code: string): Promise<boolean> {
    const mission = await this.missionRepository.findByCode(code);

    return mission != null;
  }

  /**
   * Check whether a mission is owned by the client
   * @param missionId
   * @param clientId
   * @returns true if owned, false otherwise
   */
  public async isOwnedByClient(missionId: string, clientId: string): Promise<boolean> {
    const mission: MissionImpl = await this.missionRepository.findByIdAndClientId(missionId, clientId);

    return mission != null;
  }

  public async getImageUrl(mission: MissionImpl): Promise<string> {
    const key: string = `resources.mission.image.${mission.category}`;
    const defaultKey: string = `resources.mission.image.DEFAULT`;

    const imgUrl: string = await this.i18nService.t(key, defaultKey);

    return imgUrl;
  }
}
