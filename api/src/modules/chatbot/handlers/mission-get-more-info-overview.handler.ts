import {
  BusinessError,
  BusinessErrorCode,
  ClientBusinessImpl,
  ContractType,
  MessagesFactory,
  MissionBusinessImpl,
  QuestionMessageBusiness,
  QuickReplyChoiceBusiness,
} from '@business';
import { InjectMissionRepository, MissionRepository } from '@database';
import { I18nService, InjectI18nService } from '@i18n';
import { Inject, Injectable } from '@nestjs/common';
import { floor } from 'lodash';

import { ActionNames } from '../constants/action-names';
import { ServiceNames } from '../constants/service-names';
import { Action } from '../domains/action';
import { HandlerDecorator } from '../handler.decorator';
import { ButtonPostbackService } from '../services/button-postback.service';
import { ActionHandler } from '../types/action-handler';

interface ExtractedParams {
  mission: MissionBusinessImpl;
}

@Injectable()
@HandlerDecorator()
export class MissionGetMoreInfoOverviewHandler implements ActionHandler {
  constructor(
    @InjectI18nService private readonly i18n: I18nService,
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
    @Inject(ServiceNames.BUTTON_POSTBACK_SERVICE) private readonly postbkSvc: ButtonPostbackService,
  ) {}

  public canHandle(action: Action): boolean {
    return action.name === ActionNames.MISSION_GET_MORE_INFO_OVERVIEW;
  }

  public async handle(action: Action): Promise<void> {
    const { mission } = await this.extractParams(action);
    const client = mission.client as ClientBusinessImpl;

    action.messages = await this.createMessageFlow(mission, client);
  }

  public async createMessageFlow(mission: MissionBusinessImpl, client: ClientBusinessImpl): Promise<QuestionMessageBusiness[]> {
    const overviewMessage = await this.createOverviewMessage(mission, client);
    const usefulInfoMessage = await this.createUsefulInfoMessage(mission);

    return [overviewMessage, usefulInfoMessage];
  }

  public async createOverviewMessage(mission: MissionBusinessImpl, client: ClientBusinessImpl): Promise<QuestionMessageBusiness> {
    const [jobText, contractText, hourlyVolumeText] = await Promise.all([
      this.createJobOverviewText(mission, client),
      this.createContractOverviewText(mission),
      this.createHourlyVolumeOverviewText(mission),
    ]);

    const textI18n = `${jobText}\n${contractText}\n${hourlyVolumeText}`;

    return MessagesFactory.createText({ text: textI18n });
  }

  public async createJobOverviewText(mission: MissionBusinessImpl, client: ClientBusinessImpl): Promise<string> {
    const [categoryI18n, emojiI18n] = await Promise.all([this.i18n.t(`mission.category.text.${mission.category}`), this.i18n.t(`mission.category.emoji.${mission.category}`)]);
    const titleI18n = `${categoryI18n} ${emojiI18n}`;

    const subtitleI18n = await this.i18n.t('chatbot.mission.more-info.overview.job', {
      args: { companyName: client.companyName, doerCount: mission.nbWorkers },
    });

    const textI18n = `${titleI18n}\n${subtitleI18n}`;

    return textI18n;
  }

  public async createContractOverviewText(mission: MissionBusinessImpl): Promise<string> {
    const contractTypeI18n = await this.i18n.t(`mission.contract-type.${mission.contractType}`);
    const durationI18n = this.i18n.translateDuration(mission.timeTable.duration);
    const textI18n = await this.i18n.t('chatbot.mission.more-info.overview.contract', {
      args: {
        contractType: contractTypeI18n,
        jobDuration: durationI18n,
      },
    });

    return textI18n;
  }

  public async createHourlyVolumeOverviewText(mission: MissionBusinessImpl): Promise<string> {
    if (!mission.timeTable.isFlexible()) {
      return this.createHourlyVolumeDefinedOverviewText(mission);
    }

    return this.createHourlyVolumeFlexibleOverviewText();
  }

  public async createHourlyVolumeDefinedOverviewText(mission: MissionBusinessImpl): Promise<string> {
    const timetable = mission.timeTable;

    const hourlyVolume = timetable.getHourlyVolume();
    const unitI18n = await this.i18n.t(`mission.hourly-volume.unit.${hourlyVolume.unit}`);
    const hourlyVolumeI18n = `${hourlyVolume.volume}h/${unitI18n.toLowerCase()}`;

    const textI18n = await this.i18n.t('chatbot.mission.more-info.overview.hourly-volume.defined', {
      args: {
        hourlyVolume: hourlyVolumeI18n,
        startDate: this.i18n.translateDateRelativeToNow(timetable.beginAt),
      },
    });

    return textI18n;
  }

  public async createHourlyVolumeFlexibleOverviewText(): Promise<string> {
    const textI18n = await this.i18n.t('chatbot.mission.more-info.overview.hourly-volume.flexible');

    return textI18n;
  }

  public async createUsefulInfoMessage(mission: MissionBusinessImpl): Promise<QuestionMessageBusiness> {
    const creatingTexts = Promise.all([this.createAddressText(mission), this.createPayText(mission)]);
    const creatingChoices = this.createQuickRepliesChoices(mission);

    const [addressText, payText] = await creatingTexts;
    const choices = await creatingChoices;

    const textI18n = `${addressText}\n${payText}`;

    return MessagesFactory.createQuickReplies({ text: textI18n, choices });
  }

  public async createAddressText(mission: MissionBusinessImpl): Promise<string> {
    const textI18n = await this.i18n.t('chatbot.mission.more-info.mission-address', {
      args: { address: mission.location.addressLine1, zipCode: mission.location.zipCode },
    });

    return textI18n;
  }

  public async createPayText(mission: MissionBusinessImpl): Promise<string> {
    const isTimetableFlexible = mission.timeTable.isFlexible();

    if (isTimetableFlexible) {
      if (mission.contractType === ContractType.EXTRA || mission.contractType === ContractType.FREELANCE) {
        return this.createPayPerHourOrMissionText(mission);
      }

      return this.createPayPerHourText(mission);
    }

    if (mission.payment.isPerMission()) {
      return this.createPayPerMissionText(mission);
    }

    return this.createPayPerHourText(mission);
  }

  public async createPayPerHourText(mission: MissionBusinessImpl): Promise<string> {
    const payUnitHourI18n = await this.i18n.t(`mission.pay.unit.abbrev.hour`);
    const payPerHourI18n = await this.i18n.t('chatbot.mission.more-info.pay.per-pay-unit', {
      args: { payAmount: mission.payment.getWholeAmount(), payUnit: payUnitHourI18n.toLowerCase() },
    });

    let recapI18n: string;

    if (mission.timeTable.isLongerThan(2, 'month')) {
      const payUnitMonthI18n = await this.i18n.t(`mission.pay.unit.abbrev.month`);
      recapI18n = await this.i18n.t('chatbot.mission.more-info.pay.recap-per-pay-unit', {
        args: { payAmount: floor(mission.computePayPerMonth()), payUnit: payUnitMonthI18n.toLowerCase() },
      });
    } else {
      recapI18n = await this.i18n.t('chatbot.mission.more-info.pay.recap-total', {
        args: { payAmount: floor(mission.computeTotalPay()) },
      });
    }

    const textI18n = `${payPerHourI18n}\n${recapI18n}`;

    return textI18n;
  }

  public async createPayPerMissionText(mission: MissionBusinessImpl): Promise<string> {
    const payUnitMissionI18n = await this.i18n.t(`mission.pay.unit.abbrev.mission`);
    const payPerMissionI18n = await this.i18n.t('chatbot.mission.more-info.pay.per-pay-unit', {
      args: { payAmount: mission.payment.getWholeAmount(), payUnit: payUnitMissionI18n.toLowerCase() },
    });

    const payRecapTotalI18n = await this.i18n.t('chatbot.mission.more-info.pay.recap-total', {
      args: { payAmount: floor(mission.computeTotalPay()) },
    });

    const textI18n = `${payPerMissionI18n}\n${payRecapTotalI18n}`;

    return textI18n;
  }

  public async createPayPerHourOrMissionText(mission: MissionBusinessImpl): Promise<string> {
    const payUnitI18n = await this.i18n.t(`mission.pay.unit.abbrev.${mission.payment.unit}`);
    const payI18n = await this.i18n.t('chatbot.mission.more-info.pay.per-pay-unit', {
      args: { payAmount: mission.payment.getWholeAmount(), payUnit: payUnitI18n.toLowerCase() },
    });

    return payI18n;
  }

  public async createQuickRepliesChoices(mission: MissionBusinessImpl): Promise<QuickReplyChoiceBusiness[]> {
    const [applyI18n, moreInfoI18n, otherMissionsI18n] = await Promise.all([
      this.i18n.t('chatbot.actions.apply'),
      this.i18n.t('chatbot.actions.more-info'),
      this.i18n.t('chatbot.actions.other-missions'),
    ]);

    const applyChoice = MessagesFactory.createQuickRepliesChoice({
      text: applyI18n,
      postback: this.postbkSvc.buildQuizzEnterPostback(mission.code),
    });
    const moreInfoChoice = MessagesFactory.createQuickRepliesChoice({
      text: moreInfoI18n,
      postback: this.postbkSvc.buildGetMoreInfoAboutMissionTasksPostback(mission.id),
    });
    const otherMissionsChoice = MessagesFactory.createQuickRepliesChoice({
      text: otherMissionsI18n,
      postback: this.postbkSvc.buildGetNextMissionsPostback(),
    });

    return [applyChoice, moreInfoChoice, otherMissionsChoice];
  }

  private async extractParams(action: Action): Promise<ExtractedParams> {
    const missionId = action.getParameter('missionId');
    let mission: MissionBusinessImpl;
    try {
      mission = await this.missionRepo.findByIdWithClient(missionId);

      if (!mission) {
        throw new Error();
      }
    } catch (ex) {
      throw new BusinessError(BusinessErrorCode.H00007_MISSION_NOT_FOUND, { id: missionId });
    }

    return { mission };
  }
}
