import { ServiceNames } from '@chatbot/constants/service-names';
import { ProviderFactory } from '@modules/provider.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ButtonPostbackService {
  public buildEnterApplicationProcessPostback(missionCode: string): string {
    return `application-process-enter-${missionCode}`;
  }

  public buildGetNextMissionsPostback(): string {
    return `missions/get`;
  }

  public buildQuizzEnterPostback(missionCode: string): string {
    return `quizz-enter-${missionCode}`;
  }

  public buildGetMoreInfoAboutMissionPostback(missionId: string): string {
    return `missions/id/${missionId}/more-info/get`;
  }

  public buildGetMoreInfoAboutMissionTasksPostback(missionId: string): string {
    return `missions/id/${missionId}/more-info/tasks/get`;
  }
}

export const ButtonPostbackServiceProviderFactory = ProviderFactory.createFactory(ServiceNames.BUTTON_POSTBACK_SERVICE, {
  useClass: ButtonPostbackService,
});
