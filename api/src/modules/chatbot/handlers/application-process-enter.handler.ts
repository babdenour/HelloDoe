import { BusinessError, BusinessErrorCode, MessagesFactory, MissionBusinessImpl } from '@business';
import { InjectMissionRepository, MissionRepository } from '@database';
import { I18nService, InjectI18nService } from '@i18n';
import { Injectable } from '@nestjs/common';

import { ActionNames } from '../constants/action-names';
import { Action } from '../domains/action';
import { HandlerDecorator } from '../handler.decorator';
import { ActionHandler } from '../types/action-handler';

interface ExtractedParams {
  mission: MissionBusinessImpl;
}

@Injectable()
@HandlerDecorator()
export class ApplicationProcessEnterHandler implements ActionHandler {
  constructor(@InjectI18nService private readonly i18nSvc: I18nService, @InjectMissionRepository private readonly missionRepo: MissionRepository) {}

  public canHandle(action: Action): boolean {
    return action.name === ActionNames.APPLICATION_PROCESS_ENTER;
  }

  public async handle(action: Action): Promise<void> {
    const { mission } = await this.extractParams(action);

    const catchPhraseI18n: string = await this.i18nSvc.t(`chatbot.flow.application-process.enter.catch-phrase.${mission.category}`);
    const catchPhraseMessage = MessagesFactory.createText({
      text: catchPhraseI18n,
    });

    const quickRepliesTextI18n = await this.i18nSvc.t('chatbot.flow.application-process.enter.quick-replies.text');
    const quickRepliesChoice1I18n = await this.i18nSvc.t('chatbot.flow.application-process.enter.quick-replies.choices.0');
    const quickRepliesChoice2I18n = await this.i18nSvc.t('chatbot.flow.application-process.enter.quick-replies.choices.1');
    const quickRepliesMessage = MessagesFactory.createQuickReplies({
      text: quickRepliesTextI18n,
      choices: [
        MessagesFactory.createQuickRepliesChoice({
          text: quickRepliesChoice1I18n,
        }),
        MessagesFactory.createQuickRepliesChoice({
          text: quickRepliesChoice2I18n,
        }),
      ],
    });

    action.setMessages([catchPhraseMessage, quickRepliesMessage]);
  }

  private async extractParams(action: Action): Promise<ExtractedParams> {
    const missionCode: string = action.getParameter('missionCode');

    if (!missionCode) {
      throw new BusinessError(BusinessErrorCode.H01000_MISSING_PARAM, { param: 'missionCode' });
    }

    const mission: MissionBusinessImpl = await this.missionRepo.findByCode(missionCode);
    if (!mission) {
      throw new BusinessError(BusinessErrorCode.H01002_MISSION_NOT_FOUND_BY_CODE, { code: missionCode });
    }

    return { mission };
  }
}
