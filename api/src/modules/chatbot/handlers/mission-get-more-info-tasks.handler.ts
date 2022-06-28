import {
  BusinessError,
  BusinessErrorCode,
  ClientBusinessImpl,
  MessagesFactory,
  MissionBusinessImpl,
  QuestionMessageBusiness,
  QuickRepliesMessageBusiness,
  QuickReplyChoiceBusiness,
} from '@business';
import { InjectMissionRepository, MissionRepository } from '@database';
import { I18nService, InjectI18nService } from '@i18n';
import { Inject, Injectable } from '@nestjs/common';

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
export class MissionGetMoreInfoTasksHandler implements ActionHandler {
  constructor(
    @InjectI18nService private readonly i18n: I18nService,
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
    @Inject(ServiceNames.BUTTON_POSTBACK_SERVICE) private readonly postbkSvc: ButtonPostbackService,
  ) {}

  public canHandle(action: Action): boolean {
    return action.name === ActionNames.MISSION_GET_MORE_INFO_TASKS;
  }

  public async handle(action: Action): Promise<void> {
    const { mission } = await this.extractParams(action);
    const client = mission.client as ClientBusinessImpl;

    action.messages = await this.createMessageFlow(mission, client);
  }

  public async createMessageFlow(
    mission: MissionBusinessImpl,
    client: ClientBusinessImpl,
  ): Promise<QuestionMessageBusiness[]> {
    const tasksMessage = await this.createTasksMessage(mission, client);

    return [tasksMessage];
  }

  public async createTasksMessage(
    mission: MissionBusinessImpl,
    client: ClientBusinessImpl,
  ): Promise<QuickRepliesMessageBusiness> {
    const creatingTexts = Promise.all([
      await this.i18n.t('chatbot.mission.tasks.intro', {
        args: { companyName: client.companyName },
      }),
      ...mission.tasks.map((task) => this.i18n.t(`mission.task.text.${task}`)),
    ]);
    const creatingChoices = this.createQuickRepliesChoices(mission);

    const [introI18n, ...tasksI18n] = await creatingTexts;
    const choices = await creatingChoices;

    const textI18n = `${introI18n}\n${tasksI18n.join('\n')}`;

    return MessagesFactory.createQuickReplies({ text: textI18n, choices });
  }

  public async createQuickRepliesChoices(mission: MissionBusinessImpl): Promise<QuickReplyChoiceBusiness[]> {
    const [applyI18n, otherMissionsI18n] = await Promise.all([
      this.i18n.t('chatbot.actions.apply'),
      this.i18n.t('chatbot.actions.other-missions'),
    ]);

    const applyChoice = MessagesFactory.createQuickRepliesChoice({
      text: applyI18n,
      postback: this.postbkSvc.buildQuizzEnterPostback(mission.code),
    });
    const otherMissionsChoice = MessagesFactory.createQuickRepliesChoice({
      text: otherMissionsI18n,
      postback: this.postbkSvc.buildGetNextMissionsPostback(),
    });

    return [applyChoice, otherMissionsChoice];
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
