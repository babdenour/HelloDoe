import {
  BusinessError,
  BusinessErrorCode,
  CardMessageImplBusiness,
  CarouselMessageImplBusiness,
  DoerImplBsn,
  InjectMissionService,
  JobBoardRepositoryBusiness,
  MessageButtonBusiness,
  MessagesFactory,
  MissionBusinessImpl,
  MissionService,
} from '@business';
import { InjectJobBoardRepository, InjectMissionRepository, MissionRepository } from '@database';
import { I18nService, InjectI18nService } from '@i18n';
import { Inject, Injectable } from '@nestjs/common';
import { capitalize } from 'lodash';

import { ActionNames } from '../constants/action-names';
import { ServiceNames } from '../constants/service-names';
import { Action } from '../domains/action';
import { HandlerDecorator } from '../handler.decorator';
import { ButtonPostbackService } from '../services/button-postback.service';
import { ActionHandler } from '../types/action-handler';
import { MessagingPlatform } from '../types/messaging-platform';

interface ExtractedParams {
  doer: DoerImplBsn;
  missionSources: string[];
}

@Injectable()
@HandlerDecorator()
export class MissionGetListHandler implements ActionHandler {
  private readonly CARD_MAX_COUNT: number = 4;

  constructor(
    @InjectI18nService private readonly i18n: I18nService,
    @InjectJobBoardRepository private readonly jobBoardRepo: JobBoardRepositoryBusiness,
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
    @InjectMissionService private readonly missionSvc: MissionService,
    @Inject(ServiceNames.BUTTON_POSTBACK_SERVICE) private readonly postbkSvc: ButtonPostbackService,
  ) {}

  public canHandle(action: Action): boolean {
    return action.name === ActionNames.MISSION_GET_LIST;
  }

  public async handle(action: Action, messagingPlatform: MessagingPlatform): Promise<void> {
    const { doer, missionSources } = await this.extractParams(messagingPlatform);

    const missionNotSeenList: MissionBusinessImpl[] = await this.getMissionNotSeenList(doer, missionSources);
    const carousel: CarouselMessageImplBusiness = await this.buildMissionCarousel(missionNotSeenList);
    const missionIds: string[] = missionNotSeenList.map((mission: MissionBusinessImpl) => mission.id);
    await this.missionRepo.addDoerInSeenByForMissions(doer.id, missionIds);

    action.messages = [carousel];
  }

  private async getMissionNotSeenList(doer: DoerImplBsn, missionSources: string[]): Promise<MissionBusinessImpl[]> {
    let list: MissionBusinessImpl[] = await this.missionRepo.findByStatusBeingPreparedAndNotSeenByDoerAndAgencyIn(doer.id, missionSources);

    if (list.length === 0) {
      await this.missionRepo.removeDoerFromSeenByByStatusBeingPreparedAndAgencyIn(doer.id, missionSources);
      list = await this.missionRepo.findByStatusBeingPreparedAndNotSeenByDoerAndAgencyIn(doer.id, missionSources);
    }

    return list.slice(0, this.CARD_MAX_COUNT);
  }

  private async buildMissionCarousel(missions: MissionBusinessImpl[]): Promise<CarouselMessageImplBusiness> {
    const cards: CardMessageImplBusiness[] = [];

    for (const mission of missions) {
      const [titleI18n, subtitleI18n, buttons] = await Promise.all([this.buildCardTitle(mission), this.buildCardSubtitle(mission), this.buildCardButtons(mission)]);
      const card = MessagesFactory.createCard({
        title: titleI18n,
        subtitle: subtitleI18n,
        imageUrl: await this.missionSvc.getImageUrl(mission),
        buttons,
      });
      cards.push(card);
    }

    return MessagesFactory.createCarousel({ cards });
  }

  private async buildCardTitle(mission: MissionBusinessImpl): Promise<string> {
    const [emojiI18n, categoryI18n, contractTypeI18n] = await Promise.all([
      this.i18n.t(`mission.category.emoji.${mission.category}`),
      this.i18n.t(`mission.category.text.${mission.category}`),
      this.i18n.t(`mission.contract-type.${mission.contractType}`),
    ]);

    const titleI18n = await this.i18n.t('chatbot.mission.card.title', {
      args: {
        categoryEmoji: emojiI18n,
        category: categoryI18n,
        contractType: capitalize(contractTypeI18n),
      },
    });

    return titleI18n;
  }

  private async buildCardSubtitle(mission: MissionBusinessImpl): Promise<string> {
    if (mission.timeTable.isAsap()) {
      const subtitleI18n = await this.buildSubtitleAsapText(mission);

      return subtitleI18n;
    } else {
      const subtitleI18n = await this.buildSubtitleDefaultText(mission);

      return subtitleI18n;
    }
  }

  private async buildSubtitleAsapText(mission: MissionBusinessImpl): Promise<string> {
    const [missionDurationI18n, hourlyVolumeUnitI18n, payUnitI18n] = await Promise.all([
      this.i18n.translateDuration(mission.timeTable.duration),
      this.i18n.t(`mission.hourly-volume.unit.${mission.timeTable.getHourlyVolume().unit}`),
      this.i18n.t(`mission.pay.unit.abbrev.${mission.payment.unit}`),
    ]);

    const subtitleI18n = await this.i18n.t('chatbot.mission.card.subtitle-asap', {
      args: {
        missionDuration: missionDurationI18n,
        hourlyVolumeAmount: mission.timeTable.getHourlyVolume().volume,
        hourlyVolumeUnit: hourlyVolumeUnitI18n,
        payAmount: mission.payment.getWholeAmount(),
        payUnit: payUnitI18n,
        zipCode: mission.location.zipCode,
      },
    });

    return subtitleI18n;
  }

  private async buildSubtitleDefaultText(mission: MissionBusinessImpl): Promise<string> {
    const [startDateI18n, endDateI18n, hourlyVolumeUnitI18n, payUnitI18n] = await Promise.all([
      this.i18n.translateDate(mission.timeTable.beginAt),
      this.i18n.translateDate(mission.timeTable.endAt),
      this.i18n.t(`mission.hourly-volume.unit.${mission.timeTable.getHourlyVolume().unit}`),
      this.i18n.t(`mission.pay.unit.abbrev.${mission.payment.unit}`),
    ]);

    const subtitleI18n = await this.i18n.t('chatbot.mission.card.subtitle', {
      args: {
        startDate: startDateI18n,
        endDate: endDateI18n,
        hourlyVolumeAmount: mission.timeTable.getHourlyVolume().volume,
        hourlyVolumeUnit: hourlyVolumeUnitI18n,
        payAmount: mission.payment.getWholeAmount(),
        payUnit: payUnitI18n,
        zipCode: mission.location.zipCode,
      },
    });

    return subtitleI18n;
  }

  private async buildCardButtons(mission: MissionBusinessImpl): Promise<MessageButtonBusiness[]> {
    const applyI18n: string = await this.i18n.t(`chatbot.actions.apply`);
    const moreInfoI18n: string = await this.i18n.t(`chatbot.actions.more-info`);

    return [
      MessagesFactory.createButtonPostback({
        title: applyI18n,
        payload: this.postbkSvc.buildEnterApplicationProcessPostback(mission.code),
      }),
      MessagesFactory.createButtonPostback({
        title: moreInfoI18n,
        payload: this.postbkSvc.buildGetMoreInfoAboutMissionPostback(mission.id),
      }),
    ];
  }

  private async extractParams(messagingPlatform: MessagingPlatform): Promise<ExtractedParams> {
    const doer = await messagingPlatform.getDoer();

    if (!doer) {
      throw new BusinessError(BusinessErrorCode.H01001_DOER_NOT_FOUND, {
        platformId: messagingPlatform.getDoerPlatformId(),
      });
    }

    const jobBoard = await this.jobBoardRepo.findById(messagingPlatform.getEntryPoint().jobBoard);
    const missionSources = jobBoard.missionSources;

    return { doer, missionSources };
  }
}
